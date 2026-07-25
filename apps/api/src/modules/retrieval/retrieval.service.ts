import { eq, and, sql } from "drizzle-orm";

import { db } from "../../db";

import { organizations } from "../../db/schema/organization";
import { projects } from "../../db/schema/project";
import { environments } from "../../db/schema/environment";
import { agents } from "../../db/schema/agent";
import { conversations } from "../../db/schema/conversation";
import { knowledges } from "../../db/schema/knowledge";
import { EmbeddingService } from "../embeddings/embedding.service";
import { logger } from "../../common/logger/logger";
import { retrievalDuration } from "../../common/metrics/metrics.registry";

const embeddingService = new EmbeddingService();

import type { RetrievalResult } from "./retrieval.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class RetrievalService {
  async retrieve(
    ownerId: string,
    conversationId: string,
    query: string,
  ): Promise<RetrievalResult> {
    const endTimer = retrievalDuration.startTimer();

    try {
      const conversation = (
        await db
          .select({
            agentId: conversations.agentId,
          })
          .from(conversations)
          .innerJoin(agents, eq(conversations.agentId, agents.id))
          .innerJoin(environments, eq(agents.environmentId, environments.id))
          .innerJoin(projects, eq(environments.projectId, projects.id))
          .innerJoin(
            organizations,
            eq(projects.organizationId, organizations.id),
          )
          .where(
            and(
              eq(conversations.id, conversationId),
              eq(organizations.ownerId, ownerId),
            ),
          )
      )[0];

      if (!conversation) {
        throw new NotFoundError("Conversation not found");
      }

      const queryEmbedding = await embeddingService.generate(query);

      const vector = `[${queryEmbedding.join(",")}]`;

      const knowledgeList = await db
        .select({
          content: knowledges.content,
          similarity: sql<number>`
                        1 - (${knowledges.embedding} <=> ${vector}::vector)
                    `,
        })
        .from(knowledges)
        .where(eq(knowledges.agentId, conversation.agentId))
        .orderBy(sql`${knowledges.embedding} <=> ${vector}::vector`)
        .limit(5);

      logger.info(
        {
          agentId: conversation.agentId,
          retrievedCount: knowledgeList.length,
        },
        "Knowledge retrieval completed",
      );

      logger.debug(
        {
          similarities: knowledgeList.map((item) => ({
            similarity: item.similarity,
          })),
        },
        "Knowledge similarity scores",
      );

      const context = knowledgeList
        .map((knowledge) => knowledge.content)
        .join("\n\n");

      return {
        context,
      };
    } finally {
      endTimer();
    }
  }
}
