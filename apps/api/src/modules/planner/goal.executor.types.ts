import type { Goal, GoalTask } from "./goal.types";

export interface GoalExecutionResult {
  goal: Goal;
  currentTask: GoalTask | null;
  completed: boolean;
}
