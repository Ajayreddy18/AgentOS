export interface CreateKnowledgeDto {
  name: string;
  content: string;
}

export interface UpdateKnowledgeDto {
  name?: string;
  content?: string;
}

export interface KnowledgeResponse {
  id: string;
  agentId: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
