import { eq, sql, and } from "drizzle-orm";

import { db } from "../../db";
import { memories } from "../../db/schema/memory";
import { EmbeddingService } from "../embeddings/embedding.service";
import { logger } from "../../common/logger/logger";

const embeddingService = new EmbeddingService();

export class MemoryRetriever {
  async retrieve(agentId: string, query: string): Promise<string[]> {
    logger.info(
      {
        agentId,
        queryLength: query.length,
      },
      "Memory retrieval started",
    );

    const queryEmbedding = await embeddingService.generate(query);

    const vector = `[${queryEmbedding.join(",")}]`;

    const rows = await db
      .select({
        content: memories.content,
        similarity: sql<number>`
                    1 - (${memories.embedding} <=> ${vector}::vector)
                `,
      })
      .from(memories)
      .where(
        and(
          eq(memories.agentId, agentId),
          sql`${memories.embedding} IS NOT NULL`,
          sql`
                    1- (${memories.embedding} <=> ${vector}::vector)>0.55
                    `,
        ),
      )
      .orderBy(sql`${memories.embedding} <=> ${vector}::vector`)
      .limit(3);

    logger.info(
      {
        agentId,
        retrievedCount: rows.length,
      },
      "Memory retrieval completed",
    );

    logger.debug(
      {
        memories: rows.map((row) => ({
          similarity: row.similarity,
        })),
      },
      "Retrieved memory similarities",
    );

    return rows.map((row) => row.content);
  }
}
