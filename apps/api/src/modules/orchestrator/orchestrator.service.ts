import { ToolExecutor } from "../tool/runtime/tool.executor";
import type { ToolCall, LLMMessage } from "../providers/provider.types";
import type {
  BuildPromptInput,
  BuildPromptOutput,
  ToolExecution,
} from "./orchestrator.types";

import type { ChatCompletionMessageToolCall } from "groq-sdk/resources/chat/completions";

export class OrchestratorService {
  buildPrompt(input: BuildPromptInput): BuildPromptOutput {
    const { runtime, history, userMessage } = input;

    const memories =
      runtime.memories.length > 0
        ? runtime.memories.map((memory) => `- ${memory.content}`).join("\n")
        : "No memories available.";

    const knowledge =
      runtime.knowledge.length > 0
        ? runtime.knowledge.map((item) => `- ${item.content}`).join("\n")
        : "No knowledge available.";

    const tools =
      runtime.tools.length > 0
        ? runtime.tools
            .map((tool) => `- ${tool.name}: ${tool.description ?? ""}`)
            .join("\n")
        : "No tools available.";

    const conversationHistory =
      history.length > 0
        ? history
            .map((message) => `${message.role}: ${message.content}`)
            .join("\n")
        : "No previous conversation.";

    const systemPrompt = `
${runtime.prompt}

========================
MEMORIES
========================
${memories}

========================
KNOWLEDGE
========================
${knowledge}

========================
AVAILABLE TOOLS
========================
${tools}

========================
CONVERSATION HISTORY
========================
${conversationHistory}
`.trim();

    return {
      systemPrompt,
      userMessage,
    };
  }

  async executeToolCalls(
    toolCalls: ToolCall[],
    toolExecutor: ToolExecutor,
  ): Promise<ToolExecution[]> {
    const results = [];

    for (const toolCall of toolCalls) {
      const executionResult = await toolExecutor.execute(
        toolCall.name,
        toolCall.arguments,
      );

      results.push({
        toolCall,
        executionResult,
      });
    }

    return results;
  }
  buildToolMessages(
    assistantToolCalls: ChatCompletionMessageToolCall[],
    toolExecutions: ToolExecution[],
  ): LLMMessage[] {
    const messages: LLMMessage[] = [];

    messages.push({
      role: "assistant",
      content: "",
      toolCalls: assistantToolCalls,
    });

    for (const { toolCall, executionResult } of toolExecutions) {
      messages.push({
        role: "tool",
        toolCallId: toolCall.id,
        content: JSON.stringify(
          executionResult.success
            ? executionResult.result
            : { error: executionResult.error },
        ),
      });
    }

    return messages;
  }
}
