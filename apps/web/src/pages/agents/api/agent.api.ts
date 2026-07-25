import { apiClient } from "@/api/client";

import type {
  AgentResponse,
  AgentsResponse,
  CreateAgentInput,
  UpdateAgentInput,
} from "../services/types";

export async function getAgents(environmentId: string) {
  const response = await apiClient.get<AgentsResponse>(
    `/environments/${environmentId}/agents`,
  );

  return response.data.data;
}

export async function createAgent(
  environmentId: string,
  data: CreateAgentInput,
) {
  const response = await apiClient.post<AgentResponse>(
    `/environments/${environmentId}/agents`,
    data,
  );

  return response.data.data;
}

export async function updateAgent(
  environmentId: string,
  agentId: string,
  data: UpdateAgentInput,
) {
  const response = await apiClient.patch<AgentResponse>(
    `/environments/${environmentId}/agents/${agentId}`,
    data,
  );

  return response.data.data;
}

export async function deleteAgent(environmentId: string, agentId: string) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/environments/${environmentId}/agents/${agentId}`);

  return response.data;
}
