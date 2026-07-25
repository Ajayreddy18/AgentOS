import type { JobContext } from "./job.types";

export interface JobQueue {
  enqueue<T>(jobName: string, payload: T): Promise<JobContext>;
}
