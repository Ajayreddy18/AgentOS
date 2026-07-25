export interface CreateConversationDto {
  title: string;
}

export interface UpdateConversationDto {
  title?: string;
}

export interface ConversationResponse {
  id: string;
  agentId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
