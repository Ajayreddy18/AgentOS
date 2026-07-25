import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";
import { tools } from "../../db/schema/tool";

import type { CreateToolInput, UpdateToolInput } from "./tool.validation";

import type { ToolResponse } from "./tool.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class ToolService {
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
    data: CreateToolInput,
  ): Promise<ToolResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const insertedTool = await db
      .insert(tools)
      .values({
        name: data.name,
        description: data.description,
        type: data.type,
        configuration: data.configuration,
        agentId,
      })
      .returning();

    const tool = insertedTool[0];

    return {
      id: tool.id,
      agentId: tool.agentId,
      name: tool.name,
      description: tool.description,
      type: tool.type,
      configuration: tool.configuration,
      createdAt: tool.createdAt,
      updatedAt: tool.updatedAt,
    };
  }

  async list(ownerId: string, agentId: string): Promise<ToolResponse[]> {
    await this.verifyAgentOwnership(ownerId, agentId);

    return await db.select().from(tools).where(eq(tools.agentId, agentId));
  }

  async getById(
    ownerId: string,
    agentId: string,
    toolId: string,
  ): Promise<ToolResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const tool = (
      await db
        .select()
        .from(tools)
        .where(and(eq(tools.id, toolId), eq(tools.agentId, agentId)))
    )[0];

    if (!tool) {
      throw new NotFoundError("Tool not found");
    }

    return tool;
  }

  async update(
    ownerId: string,
    agentId: string,
    toolId: string,
    data: UpdateToolInput,
  ): Promise<ToolResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingTool = (
      await db
        .select()
        .from(tools)
        .where(and(eq(tools.id, toolId), eq(tools.agentId, agentId)))
    )[0];

    if (!existingTool) {
      throw new NotFoundError("Tool not found");
    }

    const updatedTool = await db
      .update(tools)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(tools.id, toolId), eq(tools.agentId, agentId)))
      .returning();

    return updatedTool[0];
  }

  async delete(
    ownerId: string,
    agentId: string,
    toolId: string,
  ): Promise<void> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingTool = (
      await db
        .select()
        .from(tools)
        .where(and(eq(tools.id, toolId), eq(tools.agentId, agentId)))
    )[0];

    if (!existingTool) {
      throw new NotFoundError("Tool not found");
    }

    await db
      .delete(tools)
      .where(and(eq(tools.id, toolId), eq(tools.agentId, agentId)));
  }
}
