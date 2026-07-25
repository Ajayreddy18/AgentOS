export interface CreateAgentDto {
  name: string;
  description?: string;
}

export interface UpdateAgentDto {
  name?: string;
  description?: string;
}

export interface AgentResponse {
  id: string;
  name: string;
  description: string | null;
  environmentId: string;
  createdAt: Date;
  updatedAt: Date;
}
