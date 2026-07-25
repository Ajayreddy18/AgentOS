import { logger } from "../logger/logger";

import type { Scheduler } from "./scheduler.interface";
import type { JobQueue } from "./job.queue.interface";
import type { ScheduledJob } from "./scheduled-job.types";

export class JobScheduler implements Scheduler {
  private readonly timers = new Map<string, NodeJS.Timeout>();

  constructor(private readonly queue: JobQueue) {}

  async schedule(job: ScheduledJob): Promise<void> {
    if (this.timers.has(job.jobName)) {
      return;
    }

    const timer = setInterval(async () => {
      logger.debug(
        {
          job: job.jobName,
        },
        "Scheduling recurring job",
      );

      await this.queue.enqueue(job.jobName, job.payload ?? {});
    }, job.intervalMs);

    this.timers.set(job.jobName, timer);
  }

  async start(): Promise<void> {
    logger.info("Job scheduler started");
  }

  async stop(): Promise<void> {
    for (const timer of this.timers.values()) {
      clearInterval(timer);
    }

    this.timers.clear();

    logger.info("Job scheduler stopped");
  }
}
