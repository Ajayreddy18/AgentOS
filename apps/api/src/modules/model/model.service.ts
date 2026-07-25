import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";
import { models } from "../../db/schema/model";

import type { CreateModelInput, UpdateModelInput } from "./model.validation";

import type { ModelResponse } from "./model.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class ModelService {
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
    data: CreateModelInput,
  ): Promise<ModelResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const insertedModel = await db
      .insert(models)
      .values({
        agentId,
        provider: data.provider,
        modelName: data.modelName,
        temperature: data.temperature,
        maxTokens: data.maxTokens,
        topP: data.topP,
        frequencyPenalty: data.frequencyPenalty,
        presencePenalty: data.presencePenalty,
      })
      .returning();

    const model = insertedModel[0];

    return {
      id: model.id,
      agentId: model.agentId,
      provider: model.provider,
      modelName: model.modelName,
      temperature: model.temperature,
      maxTokens: model.maxTokens,
      topP: model.topP,
      frequencyPenalty: model.frequencyPenalty,
      presencePenalty: model.presencePenalty,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
  async list(ownerId: string, agentId: string): Promise<ModelResponse[]> {
    await this.verifyAgentOwnership(ownerId, agentId);

    return await db.select().from(models).where(eq(models.agentId, agentId));
  }
  async getById(
    ownerId: string,
    agentId: string,
    modelId: string,
  ): Promise<ModelResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const model = (
      await db
        .select()
        .from(models)
        .where(and(eq(models.id, modelId), eq(models.agentId, agentId)))
    )[0];

    if (!model) {
      throw new NotFoundError("Model not found");
    }

    return model;
  }
  async update(
    ownerId: string,
    agentId: string,
    modelId: string,
    data: UpdateModelInput,
  ): Promise<ModelResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingModel = (
      await db
        .select()
        .from(models)
        .where(and(eq(models.id, modelId), eq(models.agentId, agentId)))
    )[0];

    if (!existingModel) {
      throw new NotFoundError("Model not found");
    }

    const updatedModel = await db
      .update(models)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(models.id, modelId), eq(models.agentId, agentId)))
      .returning();

    return updatedModel[0];
  }
  async delete(
    ownerId: string,
    agentId: string,
    modelId: string,
  ): Promise<void> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingModel = (
      await db
        .select()
        .from(models)
        .where(and(eq(models.id, modelId), eq(models.agentId, agentId)))
    )[0];

    if (!existingModel) {
      throw new NotFoundError("Model not found");
    }

    await db
      .delete(models)
      .where(and(eq(models.id, modelId), eq(models.agentId, agentId)));
  }
}
