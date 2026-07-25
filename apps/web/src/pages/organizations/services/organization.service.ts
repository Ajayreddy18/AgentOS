import { apiClient } from "@/api";
import { API } from "@/api/endpoints";

import type {
  GetOrganizationsResponse,
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
  GetOrganizationResponse,
  DeleteOrganizationResponse,
} from "./organization.types";

class OrganizationService {
  async getOrganizations(): Promise<GetOrganizationsResponse> {
    const response = await apiClient.get<GetOrganizationsResponse>(
      API.organizations,
    );

    return response.data;
  }

  async createOrganization(
    payload: CreateOrganizationRequest,
  ): Promise<CreateOrganizationResponse> {
    const response = await apiClient.post<CreateOrganizationResponse>(
      API.organizations,
      payload,
    );

    return response.data;
  }

  async updateOrganization(
    id: string,
    payload: UpdateOrganizationRequest,
  ): Promise<UpdateOrganizationResponse> {
    const response = await apiClient.patch<UpdateOrganizationResponse>(
      `${API.organizations}/${id}`,
      payload,
    );

    return response.data;
  }

  async getOrganization(id: string): Promise<GetOrganizationResponse> {
    const response = await apiClient.get<GetOrganizationResponse>(
      `${API.organizations}/${id}`,
    );

    return response.data;
  }

  async deleteOrganization(id: string): Promise<DeleteOrganizationResponse> {
    const response = await apiClient.delete<DeleteOrganizationResponse>(
      `${API.organizations}/${id}`,
    );

    return response.data;
  }
}

export const organizationService = new OrganizationService();
