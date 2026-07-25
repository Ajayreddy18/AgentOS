export interface Message {
  id: string;
  conversationId: string;
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageInput {
  role: string;
  content: string;
}

export interface UpdateMessageInput {
  role?: string;
  content?: string;
}

export interface MessageResponse {
  success: boolean;
  data: Message;
}

export interface MessagesResponse {
  success: boolean;
  data: Message[];
}
