import type { Tool } from "../tool/runtime/tool.interface";
import type { LLMTool } from "./provider.types";

export class ToolAdapter {
  static toLLMTools(tools: Tool[]): LLMTool[] {
    return tools.map((tool) => ({
      type: "function",

      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.schema,
      },
    }));
  }
}
