import type { ToolParameterSchema } from "../tool/runtime/tool.interface";
import type { ChatCompletionMessageToolCall } from "groq-sdk/resources/chat/completions";
export type LLMMessage =
  | {
      role: "system";
      content: string;
    }
  | {
      role: "user";
      content: string;
    }
  | {
      role: "assistant";
      content: string;
      toolCalls?: ChatCompletionMessageToolCall[];
    }
  | {
      role: "tool";
      content: string;
      toolCallId: string;
    };
export interface LLMTool {
  type: "function";

  function: {
    name: string;
    description: string;
    parameters: ToolParameterSchema;
  };
}
export interface GenerateTextInput {
  provider: string;

  model: string;

  messages: LLMMessage[];

  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  tools?: LLMTool[];

  signal?: AbortSignal;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface GenerateTextResponse {
  reply: string;
  toolCalls?: ToolCall[];
  assistantToolCalls?: ChatCompletionMessageToolCall[];
}

export type StreamTextChunk =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "tool_call";
      id: string;
      name: string;
      arguments: Record<string, unknown>;
    }
  | {
      type: "done";
    };
