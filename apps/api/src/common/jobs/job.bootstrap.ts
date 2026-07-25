import { logger } from "../logger/logger";

import { MemoryJobQueue } from "./memory-job.queue";
import { JobRegistry } from "./job.registry";
import { JobWorker } from "./job.worker";

import { MemoryExtractionJob } from "../../modules/memory/jobs/memory-extraction.job";

const queue = new MemoryJobQueue();

const registry = new JobRegistry();

const worker = new JobWorker(queue, registry);

registry.register(new MemoryExtractionJob());

export async function startBackgroundJobs(): Promise<void> {
  logger.info("Initializing background jobs");

  await worker.start();
}

export async function stopBackgroundJobs(): Promise<void> {
  await worker.stop();
}

export { queue, registry, worker };
