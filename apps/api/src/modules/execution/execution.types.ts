export type ExecutionStatus = "running" | "completed" | "failed";

export interface ExecutionStep {
  step: number;

  action: string;

  observation?: string;

  completed: boolean;

  createdAt: Date;
}

export interface ExecutionRecord {
  id: string;

  goal: string;

  status: ExecutionStatus;

  startedAt: Date;

  completedAt?: Date;

  steps: ExecutionStep[];
}
