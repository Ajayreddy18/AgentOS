import { MemoryExtractor } from "./memory.extractor";
import { MemoryRetriever } from "./memory.retriever";
import { MemoryService } from "./memory.service";
import { logger } from "../../common/logger/logger";

export class MemoryManager {
  private extractor = new MemoryExtractor();

  private retriever = new MemoryRetriever();

  private memoryService = new MemoryService();

  async retrieve(agentId: string, query: string) {
    return this.retriever.retrieve(agentId, query);
  }

  async extractAndStore(ownerId: string, agentId: string, userMessage: string) {
    const extracted = this.extractor.extract(userMessage);
    logger.debug(
      {
        extractedCount: extracted.length,
      },
      "Memory extraction completed",
    );

    for (const memory of extracted) {
      const existing = await this.memoryService.findSimilar(
        agentId,
        memory.content,
      );

      if (existing && existing.similarity > 0.88) {
        logger.info(
          {
            memoryId: existing.id,
            agentId,
          },
          "Updating existing memory",
        );

        await this.memoryService.update(ownerId, agentId, existing.id, {
          name: memory.name,
          content: memory.content,
        });
      } else {
        logger.info(
          {
            agentId,
          },
          "Creating new memory",
        );

        await this.memoryService.create(ownerId, agentId, {
          name: memory.name,
          content: memory.content,
        });
      }
    }
  }
}
