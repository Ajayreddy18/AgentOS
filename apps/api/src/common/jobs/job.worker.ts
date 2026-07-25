import { logger } from "../logger/logger";

import type { Worker } from "./worker.interface";
import type { JobRegistry } from "./job.registry";
import type { MemoryJobQueue } from "./memory-job.queue";
import {
  backgroundJobsTotal,
  backgroundJobDuration,
  backgroundJobRetries,
} from "../metrics/metrics.registry";
export class JobWorker implements Worker {
  private running = false;

  constructor(
    private readonly queue: MemoryJobQueue,
    private readonly registry: JobRegistry,
    private readonly pollIntervalMs = 100,
  ) {}

  async start(): Promise<void> {
    this.running = true;

    logger.info("Background job worker started");

    while (this.running) {
      const queuedJob = this.queue.dequeue();

      if (!queuedJob) {
        await this.sleep(this.pollIntervalMs);

        continue;
      }

      const endTimer = backgroundJobDuration.startTimer({
        job: queuedJob.jobName,
      });

      try {
        const job = this.registry.get(queuedJob.jobName);

        queuedJob.context.attempts++;

        logger.info(
          {
            job: queuedJob.jobName,
            id: queuedJob.context.id,
          },
          "Executing background job",
        );

        await job.execute(
          queuedJob.payload,

          queuedJob.context,
        );

        logger.info(
          {
            job: queuedJob.jobName,
            id: queuedJob.context.id,
          },
          "Background job completed",
        );
        backgroundJobsTotal.inc({
          job: queuedJob.jobName,
          status: "success",
        });
      } catch (error) {
        logger.error(
          {
            error,
            job: queuedJob.jobName,
            id: queuedJob.context.id,
            attempts: queuedJob.context.attempts,
          },
          "Background job failed",
        );

        backgroundJobsTotal.inc({
          job: queuedJob.jobName,
          status: "failed",
        });

        const job = this.registry.get(queuedJob.jobName);

        const maxRetries = job.options?.maxRetries ?? 3;

        if (queuedJob.context.attempts < maxRetries) {
          logger.warn(
            {
              job: queuedJob.jobName,
              attempt: queuedJob.context.attempts,
              maxRetries,
            },
            "Retrying background job",
          );

          backgroundJobRetries.inc({
            job: queuedJob.jobName,
          });

          await this.queue.enqueue(
            queuedJob.jobName,
            queuedJob.payload,
            queuedJob.context,
            job.options?.delayMs ?? 1000,
          );
        } else {
          logger.error(
            {
              job: queuedJob.jobName,
              id: queuedJob.context.id,
            },
            "Background job permanently failed",
          );
        }
      } finally {
        endTimer();
      }
    }

    logger.info("Background job worker stopped");
  }

  async stop(): Promise<void> {
    this.running = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
