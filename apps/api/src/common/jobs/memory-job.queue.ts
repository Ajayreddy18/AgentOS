import crypto from "node:crypto";

import type { JobQueue } from "./job.queue.interface";

import type { JobContext } from "./job.types";

import type { QueuedJob } from "./queued-job.types";

import { backgroundJobsQueued } from "../metrics/metrics.registry";

export class MemoryJobQueue implements JobQueue {
  private readonly queue: QueuedJob[] = [];

  async enqueue<T>(
    jobName: string,
    payload: T,
    context?: JobContext,
    delayMs = 0,
  ): Promise<JobContext> {
    const jobContext = context ?? {
      id: crypto.randomUUID(),

      name: jobName,

      attempts: 0,

      createdAt: new Date(),
    };

    this.queue.push({
      context: jobContext,

      jobName,

      payload,

      runAt: new Date(Date.now() + delayMs),
    });

    backgroundJobsQueued.set(this.queue.length);

    return jobContext;
  }

  dequeue(): QueuedJob | undefined {
    if (this.queue.length === 0) {
      return undefined;
    }

    const now = Date.now();

    const index = this.queue.findIndex((job) => job.runAt.getTime() <= now);

    if (index === -1) {
      return undefined;
    }

    const job = this.queue.splice(index, 1)[0];

    backgroundJobsQueued.set(this.queue.length);

    return job;
  }

  size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue.length = 0;
  }
}
