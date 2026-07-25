import { apiClient } from "@/api/client";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    id: string;
    role: string;
    content: string;
    createdAt: string;
  };
}

export async function sendChat(conversationId: string, data: ChatRequest) {
  const response = await apiClient.post<ChatResponse>(
    `/conversations/${conversationId}/chat`,
    data,
  );

  return response.data.data;
}
