import type { Organization } from "@/types/organization";

export interface GetOrganizationsResponse {
  success: boolean;

  data: Organization[];
}

export interface CreateOrganizationRequest {
  name: string;

  description?: string;
}

export interface CreateOrganizationResponse {
  success: boolean;

  data: Organization;
}

export interface UpdateOrganizationRequest {
  name: string;

  description?: string;
}

export interface UpdateOrganizationResponse {
  success: boolean;

  data: Organization;
}

export interface GetOrganizationResponse {
  success: boolean;

  data: Organization;
}

export interface DeleteOrganizationResponse {
  success: boolean;
}
