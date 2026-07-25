import { apiClient } from "@/api/client";

export async function getAuditLogs(page = 1, limit = 20) {
  const response = await apiClient.get(`/audit?page=${page}&limit=${limit}`);

  return response.data.data;
}
