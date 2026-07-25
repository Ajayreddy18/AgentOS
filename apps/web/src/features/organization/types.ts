import type { Organization } from "@/types/organization";

export type { Organization };

export interface CreateOrganizationInput {
  name: string;

  slug: string;

  description?: string;
}

export interface UpdateOrganizationInput {
  name?: string;

  slug?: string;

  description?: string;
}
