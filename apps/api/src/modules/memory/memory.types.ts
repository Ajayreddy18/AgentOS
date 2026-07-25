export interface CreateMemoryDto {
  name: string;
  content: string;
}

export interface UpdateMemoryDto {
  name?: string;
  content?: string;
}

export interface MemoryResponse {
  id: string;
  agentId: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
