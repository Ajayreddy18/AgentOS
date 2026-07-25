import { eq, and, sql } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";
import { memories } from "../../db/schema/memory";
import { EmbeddingService } from "../embeddings/embedding.service";
import { logger } from "../../common/logger/logger";

const embeddingService = new EmbeddingService();

import type { CreateMemoryInput, UpdateMemoryInput } from "./memory.validation";

import type { MemoryResponse } from "./memory.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class MemoryService {
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
    data: CreateMemoryInput,
  ): Promise<MemoryResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    logger.info(
      {
        agentId,
      },
      "Creating memory",
    );
    const existing = await this.findSimilar(agentId, data.content);

    if (existing && existing.similarity > 0.95) {
      logger.info(
        {
          agentId,
          memoryId: existing.id,
          similarity: existing.similarity,
        },
        "Duplicate memory prevented",
      );
      const memory = await db.query.memories.findFirst({
        where: eq(memories.id, existing.id),
      });

      if (!memory) {
        throw new NotFoundError("Memory not found");
      }
      return memory;
    }
    const embedding = await embeddingService.generate(data.content);
    const insertedMemory = await db
      .insert(memories)
      .values({
        name: data.name,
        content: data.content,
        agentId,
        embedding,
      })
      .returning();

    const memory = insertedMemory[0];

    return {
      id: memory.id,
      name: memory.name,
      content: memory.content,
      agentId: memory.agentId,
      createdAt: memory.createdAt,
      updatedAt: memory.updatedAt,
    };
  }

  async list(ownerId: string, agentId: string): Promise<MemoryResponse[]> {
    await this.verifyAgentOwnership(ownerId, agentId);
    return db.select().from(memories).where(eq(memories.agentId, agentId));
  }

  async getById(
    ownerId: string,
    agentId: string,
    memoryId: string,
  ): Promise<MemoryResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const memory = (
      await db
        .select()
        .from(memories)
        .where(and(eq(memories.id, memoryId), eq(memories.agentId, agentId)))
    )[0];
    if (!memory) {
      throw new NotFoundError("Memory not found");
    }

    return memory;
  }

  async update(
    ownerId: string,
    agentId: string,
    memoryId: string,
    data: UpdateMemoryInput,
  ): Promise<MemoryResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const existingMemory = (
      await db
        .select()
        .from(memories)
        .where(and(eq(memories.id, memoryId), eq(memories.agentId, agentId)))
    )[0];

    if (!existingMemory) {
      throw new NotFoundError("Memory not found");
    }

    let embedding = existingMemory.embedding;

    if (data.content) {
      embedding = await embeddingService.generate(data.content);
    }

    const updatedMemory = await db
      .update(memories)
      .set({
        ...data,
        embedding,
        updatedAt: new Date(),
      })
      .where(and(eq(memories.id, memoryId), eq(memories.agentId, agentId)))
      .returning();

    return updatedMemory[0];
  }
  async delete(
    ownerId: string,
    agentId: string,
    memoryId: string,
  ): Promise<void> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingMemory = (
      await db
        .select()
        .from(memories)
        .where(and(eq(memories.id, memoryId), eq(memories.agentId, agentId)))
    )[0];

    if (!existingMemory) {
      throw new NotFoundError("Memory not found");
    }

    await db
      .delete(memories)
      .where(and(eq(memories.id, memoryId), eq(memories.agentId, agentId)));
  }

  async findSimilar(agentId: string, content: string) {
    const embedding = await embeddingService.generate(content);

    const vector = `[${embedding.join(",")}]`;

    const result = (
      await db
        .select({
          id: memories.id,
          name: memories.name,
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
            sql`${memories.embedding} <=> ${vector}::vector < 0.15`,
          ),
        )
        .orderBy(sql`${memories.embedding} <=> ${vector}::vector`)
        .limit(1)
    )[0];

    logger.debug(
      {
        agentId,
        similarity: result?.similarity,
        found: Boolean(result),
      },
      "Nearest similar memory lookup completed",
    );

    return result;
  }
}
