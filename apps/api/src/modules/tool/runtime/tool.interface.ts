export type ToolParameterSchema = Record<string, unknown>;
export interface ToolExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
}

export interface Tool {
  name: string;
  description: string;

  schema: ToolParameterSchema;

  execute(input: Record<string, unknown>): Promise<ToolExecutionResult>;
}
