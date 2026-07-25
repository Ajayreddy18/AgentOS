import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";

import type {
  CreateEnvironmentInput,
  UpdateEnvironmentInput,
} from "./environment.validation";

import type { EnvironmentResponse } from "./environment.types";
import { organizations } from "../../db/schema";
import { NotFoundError } from "../../common/errors/not-found-error";

export class EnvironmentService {
  private async verifyProjectOwnership(ownerId: string, projectId: string) {
    const project = (
      await db
        .select()
        .from(projects)
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(
          and(eq(projects.id, projectId), eq(organizations.ownerId, ownerId)),
        )
    )[0];

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    return project;
  }
  async create(
    ownerId: string,
    projectId: string,
    data: CreateEnvironmentInput,
  ): Promise<EnvironmentResponse> {
    await this.verifyProjectOwnership(ownerId, projectId);

    const insertedEnvironment = await db
      .insert(environments)
      .values({
        name: data.name,
        description: data.description,
        projectId: projectId,
      })
      .returning();

    const environment = insertedEnvironment[0];

    return {
      id: environment.id,
      name: environment.name,
      description: environment.description,
      projectId: environment.projectId,
      createdAt: environment.createdAt,
      updatedAt: environment.updatedAt,
    };
  }

  async list(
    ownerId: string,
    projectId: string,
  ): Promise<EnvironmentResponse[]> {
    await this.verifyProjectOwnership(ownerId, projectId);
    const result = await db
      .select()
      .from(environments)
      .where(eq(environments.projectId, projectId));
    return result;
  }

  async getById(
    ownerId: string,
    projectId: string,
    environmentId: string,
  ): Promise<EnvironmentResponse> {
    await this.verifyProjectOwnership(ownerId, projectId);
    const environment = (
      await db
        .select()
        .from(environments)
        .where(
          and(
            eq(environments.id, environmentId),
            eq(environments.projectId, projectId),
          ),
        )
    )[0];
    if (!environment) {
      throw new NotFoundError("Environment not found");
    }

    return environment;
  }

  async update(
    ownerId: string,
    projectId: string,
    environmentId: string,
    data: UpdateEnvironmentInput,
  ): Promise<EnvironmentResponse> {
    await this.verifyProjectOwnership(ownerId, projectId);
    const existingEnvironment = (
      await db
        .select()
        .from(environments)
        .where(
          and(
            eq(environments.id, environmentId),
            eq(environments.projectId, projectId),
          ),
        )
    )[0];

    if (!existingEnvironment) {
      throw new NotFoundError("Environment not found");
    }
    const updatedEnvironment = await db
      .update(environments)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(environments.id, environmentId),
          eq(environments.projectId, projectId),
        ),
      )
      .returning();

    const environment = updatedEnvironment[0];

    return environment;
  }
  async delete(
    ownerId: string,
    projectId: string,
    environmentId: string,
  ): Promise<void> {
    await this.verifyProjectOwnership(ownerId, projectId);

    const environment = (
      await db
        .select()
        .from(environments)
        .where(
          and(
            eq(environments.id, environmentId),
            eq(environments.projectId, projectId),
          ),
        )
    )[0];

    if (!environment) {
      throw new NotFoundError("Environment not found");
    }

    await db
      .delete(environments)
      .where(
        and(
          eq(environments.id, environmentId),
          eq(environments.projectId, projectId),
        ),
      );
  }
}
