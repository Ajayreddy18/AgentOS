export interface Conversation {
  id: string;
  agentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsResponse {
  success: boolean;
  data: Conversation[];
}

export interface ConversationResponse {
  success: boolean;
  data: Conversation;
}

export interface CreateConversationInput {
  title: string;
}

export interface UpdateConversationInput {
  title?: string;
}
