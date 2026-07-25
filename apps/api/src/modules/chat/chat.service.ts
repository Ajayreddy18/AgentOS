import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";
import { conversations } from "../../db/schema/conversation";
import { messages } from "../../db/schema/message";
import {
  chatRequestsTotal,
  chatDuration,
  chatStreamRequestsTotal,
  chatStreamDuration,
  chatStreamFirstTokenDuration,
  chatStreamTokensTotal,
  chatStreamAbortedTotal,
  llmRequestsTotal,
  llmRequestDuration,
  toolExecutionTotal,
  toolExecutionDuration,
} from "../../common/metrics/metrics.registry";

import type { ChatInput } from "./chat.validation";
import type { ChatResponse } from "./chat.types";
import type { ChatStreamEvent } from "./chat.stream.types";

import { RuntimeService } from "../runtime/runtime.service";
import { ProviderService } from "../providers/provider.service";
import { RetrievalService } from "../retrieval/retrieval.service";
import { OrchestratorService } from "../orchestrator/orchestrator.service";
import { MessageService } from "../message/message.service";
import type { LLMMessage } from "../providers/provider.types";
import { ToolLoader } from "../tool/runtime/tool.loader";
import { ToolExecutor } from "../tool/runtime/tool.executor";
import { ToolAdapter } from "../providers/tool.adapter";
import { ToolSelector } from "../runtime/tool.selector";
import { MemoryManager } from "../memory/memory.manager";
import { NotFoundError } from "../../common/errors/not-found-error";
import { RequestContextService } from "../../common/context/request-context";
import { runtimeEventService } from "../runtime-events/runtime-event.instance";

import { PlanningError } from "../../common/errors/planning-error";
import { logger } from "../../common/logger/logger";
import { queue as jobQueue } from "../../common/jobs/job.bootstrap";

const runtimeService = new RuntimeService();
const retrievalService = new RetrievalService();
const providerService = new ProviderService();
const messageService = new MessageService();
const orchestrator = new OrchestratorService();
const registry = ToolLoader.load();
const toolExecutor = new ToolExecutor(registry);
const toolSelector = new ToolSelector();
const memoryManager = new MemoryManager();

export class ChatService {
  private async verifyConversationOwnership(
    ownerId: string,
    conversationId: string,
  ) {
    const conversation = (
      await db
        .select()
        .from(conversations)
        .innerJoin(agents, eq(conversations.agentId, agents.id))
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(
          and(
            eq(conversations.id, conversationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!conversation) {
      throw new NotFoundError("Conversation not found");
    }

    return conversation;
  }
  async chat(
    ownerId: string,
    conversationId: string,
    data: ChatInput,
  ): Promise<ChatResponse> {
    chatRequestsTotal.inc();

    const endChatTimer = chatDuration.startTimer();

    try {
      await this.verifyConversationOwnership(ownerId, conversationId);

      await runtimeEventService.create({
        conversationId,
        type: "conversation.started",
        metadata: {
          messageLength: data.message.length,
        },
      });

      RequestContextService.set({
        conversationId,
      });

      await db.insert(messages).values({
        conversationId,
        role: "user",
        content: data.message,
      });

      const runtime = await runtimeService.load(ownerId, conversationId);
      await runtimeEventService.create({
        conversationId,

        type: "runtime.loaded",

        metadata: {
          provider: runtime.model.modelName,
          model: runtime.model.modelName,
          agentId: runtime.agentId,
        },
      });
      logger.info(
        {
          agentId: runtime.agentId,
          conversationId,
        },
        "Runtime loaded",
      );

      const retrieval = await retrievalService.retrieve(
        ownerId,
        conversationId,
        data.message,
      );

      await runtimeEventService.create({
        conversationId,

        type: "retrieval.completed",

        metadata: {
          knowledgeChunks: retrieval.context.length,
        },
      });

      const history = await messageService.getConversationHistory(
        ownerId,
        conversationId,
      );

      const memories = await memoryManager.retrieve(
        runtime.agentId,
        data.message,
      );
      await runtimeEventService.create({
        conversationId,

        type: "memory.completed",

        metadata: {
          memories: memories.length,
        },
      });

      const recentHistory = history.slice(-10);

      const selectedTools = toolSelector.select(data.message, registry.list());

      logger.info(
        {
          conversationId,
          messageLength: data.message.length,
        },
        "User message received",
      );

      logger.info(
        {
          tools: selectedTools.map((tool) => tool.name),
          toolCount: selectedTools.length,
        },
        "Tools selected",
      );

      const llmTools = ToolAdapter.toLLMTools(selectedTools);

      logger.debug(
        {
          toolSchemaCount: llmTools.length,
          tools: selectedTools.map((tool) => tool.name),
        },
        "LLM tool schema prepared",
      );

      const systemPrompt = [
        runtime.prompt,

        "Relevant Knowledge:",
        retrieval.context,

        "Long-Term Memory:",
        memories.join("\n"),
      ].join("\n\n");

      const llmMessages: LLMMessage[] = [
        {
          role: "system",
          content: systemPrompt,
        },

        ...recentHistory.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        })),
      ];

      const conversationMessages: LLMMessage[] = [...llmMessages];

      const MAX_PLANNING_STEPS = 5 as const;

      let finalReply = "";

      for (let step = 0; step < MAX_PLANNING_STEPS; step++) {
        logger.info(
          {
            step: step + 1,
            maxSteps: MAX_PLANNING_STEPS,
            conversationId,
          },
          "Planning step started",
        );
        const endLLMTimer = llmRequestDuration.startTimer({
          provider: runtime.model.provider,
          model: runtime.model.modelName,
        });

        let result;

        try {
          result = await providerService.generateText({
            provider: runtime.model.provider,
            model: runtime.model.modelName,

            messages: conversationMessages,

            tools: llmTools,

            temperature: runtime.model.temperature,
            maxTokens: runtime.model.maxTokens,
            topP: runtime.model.topP,
            frequencyPenalty: runtime.model.frequencyPenalty,
            presencePenalty: runtime.model.presencePenalty,
          });

          llmRequestsTotal.inc({
            provider: runtime.model.provider,
            model: runtime.model.modelName,
            status: "success",
          });
        } catch (error) {
          llmRequestsTotal.inc({
            provider: runtime.model.provider,
            model: runtime.model.modelName,
            status: "failure",
          });

          throw error;
        }

        endLLMTimer();

        logger.info(
          {
            responseLength: result.reply.length,
            toolCalls: result.toolCalls?.length ?? 0,
          },
          "LLM response generated",
        );

        logger.debug(
          {
            toolCalls: result.toolCalls,
          },
          "LLM requested tool calls",
        );

        if (!result.toolCalls || result.toolCalls.length === 0) {
          logger.info(
            {
              responseLength: result.reply.length,
            },
            "Planning completed",
          );
          finalReply = result.reply;
          break;
        }

        logger.info(
          {
            tools: result.toolCalls.map((tool) => tool.name),
          },
          "Executing tools",
        );

        const endToolTimer = toolExecutionDuration.startTimer({
          tool: "multiple",
        });

        const toolResults = await orchestrator.executeToolCalls(
          result.toolCalls,
          toolExecutor,
        );

        await runtimeEventService.create({
          conversationId,
          type: "tool-execution.completed",
          metadata: {
            executed: toolResults.length,

            tools: toolResults.map((tool) => ({
              name: tool.toolCall.name,
              arguments: tool.toolCall.arguments,
              result: tool.executionResult.result,

              success: tool.executionResult.success,
            })),
          },
        });

        endToolTimer();

        for (const tool of result.toolCalls) {
          toolExecutionTotal.inc({
            tool: tool.name,
            status: "success",
          });
        }

        logger.info(
          {
            toolCount: toolResults.length,
          },
          "Tool execution completed",
        );

        const toolMessages = orchestrator.buildToolMessages(
          result.assistantToolCalls ?? [],
          toolResults,
        );

        logger.debug(
          {
            messageCount: toolMessages.length,
          },
          "Tool messages added back to conversation",
        );

        conversationMessages.push(...toolMessages);
        logger.debug(
          {
            conversationMessageCount: conversationMessages.length,
          },
          "Conversation state updated",
        );
      }

      if (!finalReply) {
        throw new PlanningError(
          `Agent exceeded the maximum planning steps (${MAX_PLANNING_STEPS}).`,
        );
      }

      logger.info(
        {
          finalReply,
          length: finalReply.length,
        },
        "About to save assistant message",
      );

      await db.insert(messages).values({
        conversationId,
        role: "assistant",
        content: finalReply,
      });
      logger.info("Assistant message saved");

      await jobQueue.enqueue("memory-extraction", {
        ownerId,
        agentId: runtime.agentId,
        userMessage: data.message,
        assistantReply: finalReply,
      });

      await runtimeEventService.create({
        conversationId,
        type: "conversation.completed",
      });

      return {
        reply: finalReply,
      };
    } finally {
      endChatTimer();
    }
  }
  async *chatStream(
    ownerId: string,
    conversationId: string,
    data: ChatInput,
    signal: AbortSignal,
  ): AsyncIterable<ChatStreamEvent> {
    chatStreamRequestsTotal.inc();

    const endStreamTimer = chatStreamDuration.startTimer();

    await this.verifyConversationOwnership(ownerId, conversationId);

    await runtimeEventService.create({
      conversationId,
      type: "conversation.started",
      metadata: {
        messageLength: data.message.length,
      },
    });

    RequestContextService.set({
      conversationId,
    });

    await db.insert(messages).values({
      conversationId,
      role: "user",
      content: data.message,
    });

    await runtimeEventService.create({
      conversationId,
      type: "planner.started",
    });

    const runtime = await runtimeService.load(ownerId, conversationId);

    await runtimeEventService.create({
      conversationId,
      type: "runtime.loaded",
      metadata: {
        provider: runtime.model.provider,
        model: runtime.model.modelName,
        agentId: runtime.agentId,
      },
    });

    logger.info(
      {
        agentId: runtime.agentId,
        conversationId,
      },
      "Streaming runtime loaded",
    );

    await runtimeEventService.create({
      conversationId,
      type: "retrieval.started",
    });

    const retrieval = await retrievalService.retrieve(
      ownerId,
      conversationId,
      data.message,
    );

    await runtimeEventService.create({
      conversationId,

      type: "retrieval.completed",

      metadata: {
        knowledgeChunks: retrieval.context.length,
      },
    });

    const history = await messageService.getConversationHistory(
      ownerId,
      conversationId,
    );

    await runtimeEventService.create({
      conversationId,
      type: "memory.started",
    });

    const memories = await memoryManager.retrieve(
      runtime.agentId,
      data.message,
    );

    await runtimeEventService.create({
      conversationId,

      type: "memory.completed",

      metadata: {
        memories: memories.length,
      },
    });

    const recentHistory = history.slice(-10);

    await runtimeEventService.create({
      conversationId,
      type: "tool-selection.started",
    });

    const selectedTools = toolSelector.select(data.message, registry.list());

    await runtimeEventService.create({
      conversationId,
      type: "tool-selection.completed",
      metadata: {
        count: selectedTools.length,
        tools: selectedTools.map((tool) => tool.name),
      },
    });

    logger.info(
      {
        conversationId,
        messageLength: data.message.length,
      },
      "Streaming user message received",
    );

    logger.debug(
      {
        tools: selectedTools.map((tool) => tool.name),
        toolCount: selectedTools.length,
      },
      "Streaming tools selected",
    );
    const llmTools = ToolAdapter.toLLMTools(selectedTools);

    const systemPrompt = [
      runtime.prompt,

      "Relevant Knowledge:",
      retrieval.context,

      "Long-Term Memory:",
      memories.join("\n"),
    ].join("\n\n");

    const llmMessages: LLMMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...recentHistory.map((message) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      })),
    ];

    const conversationMessages: LLMMessage[] = [...llmMessages];

    const MAX_PLANNING_STEPS = 5 as const;

    let finalReply = "";
    let streamedAssistantContent = "";

    for (let step = 0; step < MAX_PLANNING_STEPS; step++) {
      try {
        logger.info(
          {
            step: step + 1,
            conversationId,
          },
          "Streaming planning step started",
        );

        streamedAssistantContent = "";
        finalReply = "";

        const endFirstTokenTimer = chatStreamFirstTokenDuration.startTimer();

        let firstTokenReceived = false;

        await runtimeEventService.create({
          conversationId,

          type: "llm.started",

          metadata: {
            provider: runtime.model.provider,

            model: runtime.model.modelName,
          },
        });

        const stream = await providerService.streamText({
          provider: runtime.model.provider,
          model: runtime.model.modelName,

          messages: conversationMessages,

          tools: llmTools,

          signal,

          temperature: runtime.model.temperature,
          maxTokens: runtime.model.maxTokens,
          topP: runtime.model.topP,
          frequencyPenalty: runtime.model.frequencyPenalty,
          presencePenalty: runtime.model.presencePenalty,
        });

        const streamedToolCalls: {
          id: string;
          name: string;
          arguments: Record<string, unknown>;
        }[] = [];

        for await (const chunk of stream) {
          if (chunk.type === "text") {
            if (!firstTokenReceived) {
              endFirstTokenTimer();

              firstTokenReceived = true;
            }

            streamedAssistantContent += chunk.content;

            finalReply += chunk.content;

            chatStreamTokensTotal.inc();

            yield {
              type: "token",
              content: chunk.content,
            };
          }

          if (chunk.type === "tool_call") {
            streamedToolCalls.push({
              id: chunk.id,
              name: chunk.name,
              arguments: chunk.arguments,
            });
          }
        }

        if (streamedToolCalls.length > 0) {
          logger.debug(
            {
              tools: streamedToolCalls.map((tool) => tool.name),
            },
            "Stream collected tool calls",
          );
        }

        if (streamedAssistantContent.length > 0) {
          conversationMessages.push({
            role: "assistant",
            content: streamedAssistantContent,
          });
        }

        await runtimeEventService.create({
          conversationId,

          type: "llm.completed",

          metadata: {
            responseLength: finalReply.length,
          },
        });

        if (streamedToolCalls.length === 0) {
          break;
        }

        logger.info(
          {
            tools: streamedToolCalls.map((tool) => tool.name),
          },
          "Executing streamed tools",
        );

        for (const tool of streamedToolCalls) {
          yield {
            type: "tool_start",
            tool: tool.name,
          };
        }

        const toolResults = await orchestrator.executeToolCalls(
          streamedToolCalls,
          toolExecutor,
        );
        console.dir(toolResults, { depth: null });

        await runtimeEventService.create({
          conversationId,
          type: "tool-execution.completed",
          metadata: {
            executed: toolResults.length,

            tools: toolResults.map((tool) => ({
              name: tool.toolCall.name,
              arguments: tool.toolCall.arguments,
              result: tool.executionResult.result,
              success: tool.executionResult.success,
            })),
          },
        });

        for (const result of toolResults) {
          yield {
            type: "tool_result",
            tool: result.toolCall.name,
            result: JSON.parse(JSON.stringify(result.executionResult.result)),
          };
        }

        const toolMessages = orchestrator.buildToolMessages(
          streamedToolCalls.map((tool) => ({
            id: tool.id,
            type: "function",
            function: {
              name: tool.name,
              arguments: JSON.stringify(tool.arguments),
            },
          })),
          toolResults,
        );

        conversationMessages.push(...toolMessages);

        continue;
      } catch (error) {
        if (signal.aborted) {
          chatStreamAbortedTotal.inc();

          logger.warn(
            {
              conversationId,
            },
            "Client aborted streaming response",
          );
          return;
        }
        throw error;
      }
    }
    logger.warn(
      {
        aborted: signal.aborted,
      },
      "Reached end of stream",
    );
    if (signal.aborted) {
      return;
    }

    if (!finalReply) {
      throw new PlanningError(
        `Agent exceeded the maximum planning steps (${MAX_PLANNING_STEPS}).`,
      );
    }

    logger.info(
      {
        finalReply,
        length: finalReply.length,
      },
      "About to save assistant message",
    );
    await db.insert(messages).values({
      conversationId,
      role: "assistant",
      content: finalReply,
    });

    logger.info("Assistant message saved");

    await runtimeEventService.create({
      conversationId,

      type: "response.saved",
    });

    await jobQueue.enqueue("memory-extraction", {
      ownerId,
      agentId: runtime.agentId,
      userMessage: data.message,
      assistantReply: finalReply,
    });

    await runtimeEventService.create({
      conversationId,
      type: "conversation.completed",
    });

    endStreamTimer();

    return;
  }
}
