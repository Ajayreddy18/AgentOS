import type { PlanningState } from "./planner.types";

export class PlanningStateManager {
  create(goal: string, maxSteps = 5): PlanningState {
    return {
      goal,

      currentStep: 0,

      maxSteps,

      status: "running",

      steps: [],
    };
  }
}
