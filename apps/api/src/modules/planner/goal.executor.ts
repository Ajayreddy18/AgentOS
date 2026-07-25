import type { GoalExecutionResult } from "./goal.executor.types";

import type { Goal } from "./goal.types";

export class GoalExecutor {
  execute(goal: Goal): GoalExecutionResult {
    const currentTask = goal.tasks.find((task) => !task.completed) ?? null;

    return {
      goal,

      currentTask,

      completed: currentTask === null,
    };
  }

  completeTask(goal: Goal, taskId: number): void {
    const task = goal.tasks.find((task) => task.id === taskId);

    if (task) {
      task.completed = true;
    }
  }
}
