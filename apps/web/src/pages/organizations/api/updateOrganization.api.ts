import { apiClient } from "@/api/client";

import type {
  Organization,
  UpdateOrganizationInput,
} from "@/features/organization/types";

export async function updateOrganization(
  id: string,
  data: UpdateOrganizationInput,
) {
  const response = await apiClient.patch<{
    success: boolean;
    data: Organization;
  }>(`/organizations/${id}`, data);

  return response.data;
}
