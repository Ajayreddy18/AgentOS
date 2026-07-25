export type PlannerEvent =
  | {
      type: "planning_started";
      goal: string;
    }
  | {
      type: "planning_step";
      step: number;
    }
  | {
      type: "tool_called";
      tool: string;
    }
  | {
      type: "tool_finished";
      tool: string;
      success: boolean;
    }
  | {
      type: "reflection";
      reason: string;
    }
  | {
      type: "planning_finished";
    };
