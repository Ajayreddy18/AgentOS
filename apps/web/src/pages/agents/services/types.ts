export interface Agent {
  id: string;
  environmentId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentInput {
  name: string;
  description?: string;
}

export interface UpdateAgentInput {
  name?: string;
  description?: string;
}

export interface AgentResponse {
  success: boolean;
  data: Agent;
}

export interface AgentsResponse {
  success: boolean;
  data: Agent[];
}
