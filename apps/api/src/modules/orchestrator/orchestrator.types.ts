import type { AgentRuntime } from "../runtime/runtime.types";
import type { ToolCall } from "../providers/provider.types";
import type { ToolExecutionResult } from "../tool/runtime/tool.interface";

export interface ToolExecution {
  toolCall: ToolCall;
  executionResult: ToolExecutionResult;
}

export interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface BuildPromptInput {
  runtime: AgentRuntime;
  history: ConversationMessage[];
  userMessage: string;
}

export interface BuildPromptOutput {
  systemPrompt: string;
  userMessage: string;
}
