export interface Prompt {
  id: string;

  agentId: string;

  name: string;

  content: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreatePromptInput {
  name: string;

  content: string;
}

export interface UpdatePromptInput {
  name?: string;

  content?: string;
}

export interface PromptResponse {
  success: boolean;

  data: Prompt;
}

export interface PromptsResponse {
  success: boolean;

  data: Prompt[];
}
