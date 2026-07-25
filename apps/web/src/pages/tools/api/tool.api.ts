import { apiClient } from "@/api/client";

import type {
  CreateToolInput,
  UpdateToolInput,
  GetToolsResponse,
  ToolResponse,
} from "../services/types";

export async function getTools(agentId: string) {
  const response = await apiClient.get<GetToolsResponse>(
    `/agents/${agentId}/tools`,
  );

  return response.data.data;
}

export async function createTool(agentId: string, data: CreateToolInput) {
  const response = await apiClient.post<ToolResponse>(
    `/agents/${agentId}/tools`,
    data,
  );

  return response.data.data;
}

export async function updateTool(
  agentId: string,
  toolId: string,
  data: UpdateToolInput,
) {
  const response = await apiClient.patch<ToolResponse>(
    `/agents/${agentId}/tools/${toolId}`,
    data,
  );

  return response.data.data;
}

export async function deleteTool(agentId: string, toolId: string) {
  const response = await apiClient.delete(`/agents/${agentId}/tools/${toolId}`);

  return response.data;
}
