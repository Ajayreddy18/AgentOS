export interface CreateMessageDto {
  role: string;
  content: string;
}

export interface UpdateMessageDto {
  role?: string;
  content?: string;
}

export interface MessageResponse {
  id: string;
  conversationId: string;
  role: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
