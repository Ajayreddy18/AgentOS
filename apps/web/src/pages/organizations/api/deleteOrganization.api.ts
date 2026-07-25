import { apiClient } from "@/api/client";

export async function deleteOrganization(id: string) {
  const response = await apiClient.delete(`/organizations/${id}`);

  return response.data;
}
