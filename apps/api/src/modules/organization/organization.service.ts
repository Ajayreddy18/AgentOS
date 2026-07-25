import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { organizations } from "../../db/schema/organization";

import type {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "./organization.validation";

import type { OrganizationResponse } from "./organization.types";
import { NotFoundError } from "../../common/errors/not-found-error";
import { ValidationError } from "../../common/errors/validation-error";

export class OrganizationService {
  async create(
    ownerId: string,
    data: CreateOrganizationInput,
  ): Promise<OrganizationResponse> {
    const existingOrganization = (
      await db
        .select()
        .from(organizations)
        .where(eq(organizations.slug, data.slug))
    )[0];

    if (existingOrganization) {
      throw new ValidationError("Organization slug already exists");
    }

    const insertedOrganization = await db
      .insert(organizations)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description,
        ownerId,
      })
      .returning();

    const organization = insertedOrganization[0];

    return {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      ownerId: organization.ownerId,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    };
  }

  async list(ownerId: string): Promise<OrganizationResponse[]> {
    const result = await db
      .select()
      .from(organizations)
      .where(eq(organizations.ownerId, ownerId));

    return result;
  }

  async getById(
    ownerId: string,
    organizationId: string,
  ): Promise<OrganizationResponse> {
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

    return organization;
  }

  async update(
    ownerId: string,
    organizationId: string,
    data: UpdateOrganizationInput,
  ): Promise<OrganizationResponse> {
    const existingOrganization = (
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

    if (!existingOrganization) {
      throw new NotFoundError("Organization not found");
    }
    const updatedOrganizations = await db
      .update(organizations)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(organizations.id, organizationId),
          eq(organizations.ownerId, ownerId),
        ),
      )
      .returning();

    const organization = updatedOrganizations[0];

    return organization;
  }
  async delete(ownerId: string, organizationId: string): Promise<void> {
    const existingOrganization = (
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

    if (!existingOrganization) {
      throw new NotFoundError("Organization not found");
    }

    await db
      .delete(organizations)
      .where(
        and(
          eq(organizations.id, organizationId),
          eq(organizations.ownerId, ownerId),
        ),
      );
  }
}
