import { apiClient } from "@/api/client";

import type {
  CreateMessageInput,
  UpdateMessageInput,
  Message,
  MessageResponse,
  MessagesResponse,
} from "./types";

export async function getMessages(conversationId: string): Promise<Message[]> {
  const response = await apiClient.get<MessagesResponse>(
    `/conversations/${conversationId}/messages`,
  );

  return response.data.data;
}

export async function createMessage(
  conversationId: string,
  data: CreateMessageInput,
) {
  const response = await apiClient.post<MessageResponse>(
    `/conversations/${conversationId}/messages`,
    data,
  );

  return response.data.data;
}

export async function updateMessage(
  conversationId: string,
  messageId: string,
  data: UpdateMessageInput,
) {
  const response = await apiClient.patch<MessageResponse>(
    `/conversations/${conversationId}/messages/${messageId}`,
    data,
  );

  return response.data.data;
}

export async function deleteMessage(conversationId: string, messageId: string) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/conversations/${conversationId}/messages/${messageId}`);

  return response.data;
}
