import type { JobContext, JobOptions } from "./job.types";

import type { Job } from "./job.interface";

export abstract class BaseJob<T = unknown> implements Job<T> {
  abstract readonly name: string;

  readonly options?: JobOptions;

  constructor(options?: JobOptions) {
    this.options = options;
  }

  abstract execute(payload: T, context: JobContext): Promise<void>;
}
