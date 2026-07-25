import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { organizations } from "../../db/schema/organization";
import { projects } from "../../db/schema/project";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.validation";

import type { ProjectResponse } from "./project.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class ProjectService {
  async create(
    ownerId: string,
    organizationId: string,
    data: CreateProjectInput,
  ): Promise<ProjectResponse> {
    const organization = (
      await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.id, organizationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!organization) {
      throw new NotFoundError("Organization not found");
    }

    const insertedProject = await db
      .insert(projects)
      .values({
        name: data.name,
        description: data.description,
        organizationId: organizationId,
      })
      .returning();

    const project = insertedProject[0];

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      organizationId: project.organizationId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async list(
    ownerId: string,
    organizationId: string,
  ): Promise<ProjectResponse[]> {
    const organization = (
      await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.id, organizationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!organization) {
      throw new NotFoundError("Organizations not found");
    }

    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, organizationId));

    return result;
  }

  async getById(
    ownerId: string,
    organizationId: string,
    projectId: string,
  ): Promise<ProjectResponse> {
    const organization = (
      await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.id, organizationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!organization) {
      throw new NotFoundError("Organization not found");
    }

    const project = (
      await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.organizationId, organizationId),
          ),
        )
    )[0];

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    return project;
  }

  async update(
    ownerId: string,
    organizationId: string,
    projectId: string,
    data: UpdateProjectInput,
  ): Promise<ProjectResponse> {
    const organization = (
      await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.id, organizationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!organization) {
      throw new NotFoundError("Organization not found");
    }

    const existingProject = (
      await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.organizationId, organizationId),
          ),
        )
    )[0];

    if (!existingProject) {
      throw new NotFoundError("Project not found");
    }

    const updatedProject = await db
      .update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    return updatedProject[0];
  }

  async delete(
    ownerId: string,
    organizationId: string,
    projectId: string,
  ): Promise<void> {
    const organization = (
      await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.id, organizationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!organization) {
      throw new NotFoundError("Organization not found");
    }

    const existingProject = (
      await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.organizationId, organizationId),
          ),
        )
    )[0];

    if (!existingProject) {
      throw new NotFoundError("Project not found");
    }

    await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.organizationId, organizationId),
        ),
      );
  }
}
