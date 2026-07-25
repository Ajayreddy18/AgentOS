import { ToolExecutionResult } from "./tool.interface";
import { ToolRegistry } from "../registry/tool.registry";

import {
  toolExecutionTotal,
  toolExecutionDuration,
} from "../../../common/metrics/metrics.registry";

export class ToolExecutor {
  constructor(private readonly registry: ToolRegistry) {}

  async execute(
    toolName: string,
    input: Record<string, unknown>,
  ): Promise<ToolExecutionResult> {
    const endTimer = toolExecutionDuration.startTimer({
      tool: toolName,
    });

    const tool = this.registry.get(toolName);

    if (!tool) {
      toolExecutionTotal.inc({
        tool: toolName,
        status: "error",
      });

      endTimer();

      return {
        success: false,
        error: `Tool "${toolName}" not found.`,
      };
    }

    try {
      const result = await tool.execute(input);

      toolExecutionTotal.inc({
        tool: toolName,
        status: result.success ? "success" : "error",
      });

      return result;
    } catch (error) {
      toolExecutionTotal.inc({
        tool: toolName,
        status: "error",
      });

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while executing the tool.",
      };
    } finally {
      endTimer();
    }
  }
}
