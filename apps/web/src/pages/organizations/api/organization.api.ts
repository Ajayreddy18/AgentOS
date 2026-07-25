import { apiClient } from "@/api/client";
import type { CreateOrganizationInput } from "@/features/organization/types";

export async function createOrganization(data: CreateOrganizationInput) {
  const response = await apiClient.post("/organizations", data);

  return response.data;
}
