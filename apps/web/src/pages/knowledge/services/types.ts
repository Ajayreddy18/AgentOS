export interface Knowledge {
  id: string;
  agentId: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKnowledgeInput {
  name: string;
  content: string;
}

export interface UpdateKnowledgeInput {
  name?: string;
  content?: string;
}

export interface KnowledgeResponse {
  success: boolean;
  data: Knowledge;
}

export interface KnowledgesResponse {
  success: boolean;
  data: Knowledge[];
}
