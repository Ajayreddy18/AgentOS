import { apiClient } from "@/api/client";

import type {
  CreateKnowledgeInput,
  UpdateKnowledgeInput,
  KnowledgeResponse,
  KnowledgesResponse,
} from "../services/types";

export async function getKnowledges(agentId: string) {
  const response = await apiClient.get<KnowledgesResponse>(
    `/agents/${agentId}/knowledges`,
  );

  return response.data.data;
}

export async function createKnowledge(
  agentId: string,
  data: CreateKnowledgeInput,
) {
  const response = await apiClient.post<KnowledgeResponse>(
    `/agents/${agentId}/knowledges`,
    data,
  );

  return response.data.data;
}

export async function updateKnowledge(
  agentId: string,
  knowledgeId: string,
  data: UpdateKnowledgeInput,
) {
  const response = await apiClient.patch<KnowledgeResponse>(
    `/agents/${agentId}/knowledges/${knowledgeId}`,
    data,
  );

  return response.data.data;
}

export async function deleteKnowledge(agentId: string, knowledgeId: string) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/agents/${agentId}/knowledges/${knowledgeId}`);

  return response.data;
}
