import type { PlannerEvent } from "./planner.events";
import { logger } from "../../common/logger/logger";

export class PlannerLogger {
  log(event: PlannerEvent) {
    switch (event.type) {
      case "planning_started":
        logger.info(
          {
            goal: event.goal,
          },
          "Planning started",
        );
        break;

      case "planning_step":
        logger.info(
          {
            step: event.step,
          },
          "Planning step",
        );
        break;

      case "tool_called":
        logger.info(
          {
            tool: event.tool,
          },
          "Tool execution started",
        );
        break;

      case "tool_finished":
        logger.info(
          {
            tool: event.tool,
            success: event.success,
          },
          "Tool execution completed",
        );
        break;

      case "reflection":
        logger.debug(
          {
            reason: event.reason,
          },
          "Planner reflection",
        );
        break;

      case "planning_finished":
        logger.info({}, "Planning finished");
        break;
    }
  }
}
