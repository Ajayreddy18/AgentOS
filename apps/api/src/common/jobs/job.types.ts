export type JobStatus = "pending" | "running" | "completed" | "failed";

export interface JobContext {
  id: string;

  name: string;

  attempts: number;

  createdAt: Date;
}

export interface JobOptions {
  maxRetries?: number;

  delayMs?: number;
}
