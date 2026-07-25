import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";

import type { CreateAgentInput, UpdateAgentInput } from "./agent.validation";

import type { AgentResponse } from "./agent.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class AgentService {
  private async verifyEnvironmentOwnership(
    ownerId: string,
    environmentId: string,
  ) {
    const environment = (
      await db
        .select()
        .from(environments)
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(
          and(
            eq(environments.id, environmentId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!environment) {
      throw new NotFoundError("Environment not found");
    }

    return environment;
  }
  async create(
    ownerId: string,
    environmentId: string,
    data: CreateAgentInput,
  ): Promise<AgentResponse> {
    await this.verifyEnvironmentOwnership(ownerId, environmentId);

    const insertedAgent = await db
      .insert(agents)
      .values({
        name: data.name,
        description: data.description,
        environmentId,
      })
      .returning();

    const agent = insertedAgent[0];

    return {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      environmentId: agent.environmentId,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt,
    };
  }

  async list(ownerId: string, environmentId: string): Promise<AgentResponse[]> {
    await this.verifyEnvironmentOwnership(ownerId, environmentId);
    return db
      .select()
      .from(agents)
      .where(eq(agents.environmentId, environmentId));
  }

  async getById(
    ownerId: string,
    environmentId: string,
    agentId: string,
  ): Promise<AgentResponse> {
    await this.verifyEnvironmentOwnership(ownerId, environmentId);
    const agent = (
      await db
        .select()
        .from(agents)
        .where(
          and(eq(agents.id, agentId), eq(agents.environmentId, environmentId)),
        )
    )[0];
    if (!agent) {
      throw new NotFoundError("Agent not found");
    }

    return agent;
  }

  async update(
    ownerId: string,
    environmentId: string,
    agentId: string,
    data: UpdateAgentInput,
  ): Promise<AgentResponse> {
    await this.verifyEnvironmentOwnership(ownerId, environmentId);
    const existingAgent = (
      await db
        .select()
        .from(agents)
        .where(
          and(eq(agents.id, agentId), eq(agents.environmentId, environmentId)),
        )
    )[0];

    if (!existingAgent) {
      throw new NotFoundError("Agent not found");
    }
    const updatedAgent = await db
      .update(agents)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(eq(agents.id, agentId), eq(agents.environmentId, environmentId)),
      )
      .returning();

    return updatedAgent[0];
  }
  async delete(
    ownerId: string,
    environmentId: string,
    agentId: string,
  ): Promise<void> {
    await this.verifyEnvironmentOwnership(ownerId, environmentId);

    const existingAgent = (
      await db
        .select()
        .from(agents)
        .where(
          and(eq(agents.id, agentId), eq(agents.environmentId, environmentId)),
        )
    )[0];

    if (!existingAgent) {
      throw new NotFoundError("Agent not found");
    }

    await db
      .delete(agents)
      .where(
        and(eq(agents.id, agentId), eq(agents.environmentId, environmentId)),
      );
  }
}
