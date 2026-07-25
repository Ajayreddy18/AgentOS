import { apiClient } from "@/api/client";

import type {
  CreatePromptInput,
  UpdatePromptInput,
  PromptResponse,
  PromptsResponse,
} from "../services/types";

export async function getPrompts(agentId: string) {
  const response = await apiClient.get<PromptsResponse>(
    `/agents/${agentId}/prompts`,
  );

  return response.data.data;
}

export async function createPrompt(agentId: string, data: CreatePromptInput) {
  const response = await apiClient.post<PromptResponse>(
    `/agents/${agentId}/prompts`,
    data,
  );

  return response.data.data;
}

export async function updatePrompt(
  agentId: string,
  promptId: string,
  data: UpdatePromptInput,
) {
  const response = await apiClient.patch<PromptResponse>(
    `/agents/${agentId}/prompts/${promptId}`,
    data,
  );

  return response.data.data;
}

export async function deletePrompt(agentId: string, promptId: string) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/agents/${agentId}/prompts/${promptId}`);

  return response.data;
}
