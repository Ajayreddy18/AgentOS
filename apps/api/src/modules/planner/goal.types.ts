export interface Goal {
  objective: string;
  tasks: GoalTask[];
}

export interface GoalTask {
  id: number;
  description: string;
  completed: boolean;
}
