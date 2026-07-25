import { apiClient } from "@/api/client";

import type {
  ConversationResponse,
  ConversationsResponse,
  CreateConversationInput,
  UpdateConversationInput,
} from "../services/types";

export async function getConversations(agentId: string) {
  const response = await apiClient.get<ConversationsResponse>(
    `/agents/${agentId}/conversations`,
  );

  return response.data.data;
}

export async function createConversation(
  agentId: string,
  data: CreateConversationInput,
) {
  const response = await apiClient.post<ConversationResponse>(
    `/agents/${agentId}/conversations`,
    data,
  );

  return response.data.data;
}

export async function updateConversation(
  agentId: string,
  conversationId: string,
  data: UpdateConversationInput,
) {
  const response = await apiClient.patch<ConversationResponse>(
    `/agents/${agentId}/conversations/${conversationId}`,
    data,
  );

  return response.data.data;
}

export async function deleteConversation(
  agentId: string,
  conversationId: string,
) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/agents/${agentId}/conversations/${conversationId}`);

  return response.data;
}
