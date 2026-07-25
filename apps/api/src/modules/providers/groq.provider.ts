import Groq from "groq-sdk";

import type {
  GenerateTextInput,
  GenerateTextResponse,
  StreamTextChunk,
} from "./provider.types";

import { env } from "../../config/env";
import type { LLMProvider } from "./provider.interface";
import { InternalServerError } from "../../common/errors/internal-server-error";
import { logger } from "../../common/logger/logger";

export class GroqProvider implements LLMProvider {
  private client = new Groq({
    apiKey: env.GROQ_API_KEY,
  });

  async generateText(input: GenerateTextInput): Promise<GenerateTextResponse> {
    logger.info(
      {
        model: input.model,
        messageCount: input.messages.length,
      },
      "Sending request to LLM provider",
    );
    logger.debug(
      {
        model: input.model,
        messageCount: input.messages.length,
      },
      "LLM request payload prepared",
    );
    const completion = await this.client.chat.completions.create({
      model: input.model,

      temperature: input.temperature,

      max_tokens: input.maxTokens,

      top_p: input.topP,

      frequency_penalty: input.frequencyPenalty,

      presence_penalty: input.presencePenalty,

      messages: input.messages.map((message) => {
        if (message.role === "tool") {
          return {
            role: "tool",
            content: message.content,
            tool_call_id: message.toolCallId,
          };
        }

        if (message.role === "assistant" && message.toolCalls) {
          return {
            role: "assistant",
            content: message.content,
            tool_calls: message.toolCalls,
          };
        }
        return message;
      }),

      tools: input.tools,
      tool_choice: "auto",
    });

    const message = completion.choices[0]?.message;

    logger.info(
      {
        hasReply: Boolean(message?.content),
        toolCalls: message?.tool_calls?.length ?? 0,
      },
      "LLM response received",
    );

    const reply = message?.content ?? "";

    const toolCalls =
      message?.tool_calls?.map((toolCall) => ({
        id: toolCall.id,
        name: toolCall.function.name,
        arguments: JSON.parse(toolCall.function.arguments),
      })) ?? [];

    if (!reply && toolCalls.length === 0) {
      throw new InternalServerError(
        "Groq returned neither a reply nor a tool call.",
      );
    }
    return {
      reply,
      toolCalls,
      assistantToolCalls: message?.tool_calls,
    };
  }

  async *streamText(input: GenerateTextInput): AsyncIterable<StreamTextChunk> {
    const stream = await this.client.chat.completions.create({
      model: input.model,

      temperature: input.temperature,

      max_tokens: input.maxTokens,

      top_p: input.topP,

      frequency_penalty: input.frequencyPenalty,

      presence_penalty: input.presencePenalty,

      messages: input.messages.map((message) => {
        if (message.role === "tool") {
          return {
            role: "tool",
            content: message.content,
            tool_call_id: message.toolCallId,
          };
        }

        if (message.role === "assistant") {
          return {
            role: "assistant",
            content: message.content,
            tool_calls: message.toolCalls,
          };
        }

        return message;
      }),
      tools: input.tools,
      tool_choice: "auto",

      stream: true,
    });

    const toolCallBuffer = new Map<
      number,
      {
        id: string;
        name: string;
        arguments: string;
      }
    >();

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;

      if (!delta) {
        continue;
      }

      if (delta.content) {
        yield {
          type: "text",
          content: delta.content,
        };
      }

      if (delta.tool_calls) {
        for (const toolCall of delta.tool_calls) {
          const index = toolCall.index;

          let current = toolCallBuffer.get(index);

          if (!current) {
            current = {
              id: "",
              name: "",
              arguments: "",
            };

            toolCallBuffer.set(index, current);
          }

          if (toolCall.id) {
            current.id = toolCall.id;
          }

          if (toolCall.function?.name) {
            current.name = toolCall.function.name;
          }

          if (toolCall.function?.arguments) {
            current.arguments += toolCall.function.arguments;
          }
        }
      }

      if (toolCallBuffer.size > 0) {
        logger.debug(
          {
            toolCount: toolCallBuffer.size,
          },
          "Streaming tool call buffer updated",
        );
      }
    }

    for (const toolCall of toolCallBuffer.values()) {
      yield {
        type: "tool_call",

        id: toolCall.id,
        name: toolCall.name,
        arguments: JSON.parse(toolCall.arguments),
      };
    }
  }
}
