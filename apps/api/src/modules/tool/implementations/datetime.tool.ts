import {
  Tool,
  ToolExecutionResult,
  ToolParameterSchema,
} from "../runtime/tool.interface";

export class DateTimeTool implements Tool {
  readonly name = "datetime";

  readonly description =
    "Get the current date, current time, current datetime, today's date, current timezone, or current timestamp. Use this whenever the user asks about the current date or time.";

  readonly schema: ToolParameterSchema = {
    type: "object",

    properties: {
      format: {
        type: "string",
        description:
          "Optional output format. Examples: date, time, datetime, iso.",
      },
    },

    required: [],
  };

  async execute(): Promise<ToolExecutionResult> {
    const now = new Date();

    return {
      success: true,
      result: {
        date: now.toLocaleDateString("en-CA"),
        time: now.toLocaleTimeString(),
        iso: now.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
  }
}
