export interface CreatePromptDto {
  name: string;
  content: string;
}

export interface UpdatePromptDto {
  name?: string;
  content?: string;
}

export interface PromptResponse {
  id: string;
  agentId: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
