import type { Goal } from "./goal.types";

export class GoalPlanner {
  createGoal(userMessage: string): Goal {
    return {
      objective: userMessage,
      tasks: [
        {
          id: 1,
          description: userMessage,
          completed: false,
        },
      ],
    };
  }
}
