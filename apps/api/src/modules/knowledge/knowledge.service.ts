import { eq, and, sql } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";
import { knowledges } from "../../db/schema/knowledge";
import { EmbeddingService } from "../embeddings/embedding.service";
import { buildKnowledgePrompt } from "./knowledge.prompt";
import { LLMService } from "../llm/llm.service";
import { chunkText } from "./text-chunker";

import type {
  CreateKnowledgeInput,
  UpdateKnowledgeInput,
} from "./knowledge.validation";

import type { KnowledgeResponse } from "./knowledge.types";
import type { SearchKnowledgeInput } from "./knowledge.search.validation";
import { NotFoundError } from "../../common/errors/not-found-error";

const embeddingService = new EmbeddingService();
const llmService = new LLMService();

export class KnowledgeService {
  private async verifyAgentOwnership(ownerId: string, agentId: string) {
    const agent = (
      await db
        .select()
        .from(agents)
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(and(eq(agents.id, agentId), eq(organizations.ownerId, ownerId)))
    )[0];

    if (!agent) {
      throw new NotFoundError("Agent not found");
    }

    return agent;
  }
  async create(
    ownerId: string,
    agentId: string,
    data: CreateKnowledgeInput,
  ): Promise<KnowledgeResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const chunks = chunkText(data.content);
    const insertedChunks = [];
    for (const chunk of chunks) {
      const embedding = await embeddingService.generate(chunk.content);

      const inserted = await db
        .insert(knowledges)
        .values({
          name: data.name,
          content: chunk.content,
          agentId,
          embedding,
        })
        .returning();

      insertedChunks.push(inserted[0]);
    }

    const knowledge = insertedChunks[0];

    return {
      id: knowledge.id,
      name: knowledge.name,
      content: knowledge.content,
      agentId: knowledge.agentId,
      createdAt: knowledge.createdAt,
      updatedAt: knowledge.updatedAt,
    };
  }

  async list(ownerId: string, agentId: string): Promise<KnowledgeResponse[]> {
    await this.verifyAgentOwnership(ownerId, agentId);
    return await db
      .select()
      .from(knowledges)
      .where(eq(knowledges.agentId, agentId));
  }

  async getById(
    ownerId: string,
    agentId: string,
    knowledgeId: string,
  ): Promise<KnowledgeResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const knowledge = (
      await db
        .select()
        .from(knowledges)
        .where(
          and(eq(knowledges.id, knowledgeId), eq(knowledges.agentId, agentId)),
        )
    )[0];
    if (!knowledge) {
      throw new NotFoundError("Knowledge not found");
    }

    return knowledge;
  }

  async update(
    ownerId: string,
    agentId: string,
    knowledgeId: string,
    data: UpdateKnowledgeInput,
  ): Promise<KnowledgeResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingKnowledge = (
      await db
        .select()
        .from(knowledges)
        .where(
          and(eq(knowledges.id, knowledgeId), eq(knowledges.agentId, agentId)),
        )
    )[0];

    if (!existingKnowledge) {
      throw new NotFoundError("Knowledge not found");
    }

    const embedding = await embeddingService.generate(
      data.content ?? existingKnowledge.content,
    );
    const updatedEmbedding = await db
      .update(knowledges)
      .set({
        ...data,
        embedding,
        updatedAt: new Date(),
      })
      .where(
        and(eq(knowledges.id, knowledgeId), eq(knowledges.agentId, agentId)),
      )
      .returning();

    return updatedEmbedding[0];
  }
  async delete(
    ownerId: string,
    agentId: string,
    knowledgeId: string,
  ): Promise<void> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingKnowledge = (
      await db
        .select()
        .from(knowledges)
        .where(
          and(eq(knowledges.id, knowledgeId), eq(knowledges.agentId, agentId)),
        )
    )[0];

    if (!existingKnowledge) {
      throw new NotFoundError("Knowledge not found");
    }

    await db
      .delete(knowledges)
      .where(
        and(eq(knowledges.id, knowledgeId), eq(knowledges.agentId, agentId)),
      );
  }

  async search(ownerId: string, agentId: string, data: SearchKnowledgeInput) {
    await this.verifyAgentOwnership(ownerId, agentId);

    const queryEmbedding = await embeddingService.generate(data.query);

    const vector = `[${queryEmbedding.join(",")}]`;

    const results = await db
      .select({
        id: knowledges.id,
        name: knowledges.name,
        content: knowledges.content,
        similarity: sql<number>`
                    1 - (${knowledges.embedding} <=> ${vector}::vector)
                `,
      })
      .from(knowledges)
      .where(
        and(
          eq(knowledges.agentId, agentId),
          sql`${knowledges.embedding} <=> ${vector}::vector < 0.7`,
        ),
      )
      .orderBy(sql`${knowledges.embedding} <=> ${vector}::vector`)
      .limit(data.limit ?? 5);

    const prompt = buildKnowledgePrompt(data.query, results);

    const response = await llmService.generate(prompt);

    return {
      results,
      prompt,
      answer: response.text,
    };
  }
}
