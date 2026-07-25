import type { JobContext } from "./job.types";

export interface QueuedJob<T = unknown> {
  context: JobContext;

  jobName: string;

  payload: T;

  runAt: Date;
}
