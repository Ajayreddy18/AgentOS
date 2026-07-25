import { AppError } from "./app-error";

export class PlanningError extends AppError {
  constructor(message = "Agent exceeded maximum planning steps") {
    super(message, 500, "PLANNING_ERROR");
  }
}
