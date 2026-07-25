import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";
import { prompts } from "../../db/schema/prompt";

import type { CreatePromptInput, UpdatePromptInput } from "./prompt.validation";

import type { PromptResponse } from "./prompt.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class PromptService {
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
    data: CreatePromptInput,
  ): Promise<PromptResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const insertedPrompt = await db
      .insert(prompts)
      .values({
        name: data.name,
        content: data.content,
        agentId,
      })
      .returning();

    const prompt = insertedPrompt[0];

    return {
      id: prompt.id,
      name: prompt.name,
      content: prompt.content,
      agentId: prompt.agentId,
      createdAt: prompt.createdAt,
      updatedAt: prompt.updatedAt,
    };
  }

  async list(ownerId: string, agentId: string): Promise<PromptResponse[]> {
    await this.verifyAgentOwnership(ownerId, agentId);
    return await db.select().from(prompts).where(eq(prompts.agentId, agentId));
  }

  async getById(
    ownerId: string,
    agentId: string,
    promptId: string,
  ): Promise<PromptResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const prompt = (
      await db
        .select()
        .from(prompts)
        .where(and(eq(prompts.id, promptId), eq(prompts.agentId, agentId)))
    )[0];
    if (!prompt) {
      throw new NotFoundError("Prompt not found");
    }

    return prompt;
  }

  async update(
    ownerId: string,
    agentId: string,
    promptId: string,
    data: UpdatePromptInput,
  ): Promise<PromptResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const existingPrompt = (
      await db
        .select()
        .from(prompts)
        .where(and(eq(prompts.id, promptId), eq(prompts.agentId, agentId)))
    )[0];

    if (!existingPrompt) {
      throw new NotFoundError("Prompt not found");
    }
    const updatedPrompt = await db
      .update(prompts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(prompts.id, promptId), eq(prompts.agentId, agentId)))
      .returning();

    return updatedPrompt[0];
  }
  async delete(
    ownerId: string,
    agentId: string,
    promptId: string,
  ): Promise<void> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingPrompt = (
      await db
        .select()
        .from(prompts)
        .where(and(eq(prompts.id, promptId), eq(prompts.agentId, agentId)))
    )[0];

    if (!existingPrompt) {
      throw new NotFoundError("Prompt not found");
    }

    await db
      .delete(prompts)
      .where(and(eq(prompts.id, promptId), eq(prompts.agentId, agentId)));
  }
}
