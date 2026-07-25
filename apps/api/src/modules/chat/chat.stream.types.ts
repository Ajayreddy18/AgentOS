export type ChatStreamEvent =
  | {
      type: "token";
      content: string;
    }
  | {
      type: "tool_start";
      tool: string;
    }
  | {
      type: "tool_result";
      tool: string;
      result: Record<string, unknown> | string | number | boolean | null;
    }
  | {
      type: "done";
    }
  | {
      type: "error";
      message: string;
    };
