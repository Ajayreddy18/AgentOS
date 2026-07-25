import type { JobContext, JobOptions } from "./job.types";

export interface Job<T = unknown> {
  readonly name: string;

  readonly options?: JobOptions;

  execute(payload: T, context: JobContext): Promise<void>;
}
