import { logger } from "../../../common/logger/logger";

import type { Job } from "../../../common/jobs/job.interface";

import { MemoryManager } from "../memory.manager";

const memoryManager = new MemoryManager();

export class MemoryExtractionJob implements Job {
  readonly name = "memory-extraction";

  async execute(payload: {
    ownerId: string;
    agentId: string;
    userMessage: string;
    assistantReply: string;
  }): Promise<void> {
    logger.info(
      {
        agentId: payload.agentId,
      },
      "Processing memory extraction job",
    );

    await memoryManager.extractAndStore(
      payload.ownerId,
      payload.agentId,
      payload.userMessage,
    );

    logger.info(
      {
        agentId: payload.agentId,
      },
      "Memory extraction completed",
    );
  }
}
