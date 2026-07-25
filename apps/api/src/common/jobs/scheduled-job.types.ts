export interface ScheduledJob {
  jobName: string;

  intervalMs: number;

  payload?: unknown;
}
