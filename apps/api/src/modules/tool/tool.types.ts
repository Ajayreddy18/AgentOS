export interface CreateToolDto {
  name: string;
  description?: string;
  type: string;
  configuration?: string;
}

export interface UpdateToolDto {
  name?: string;
  description?: string;
  type?: string;
  configuration?: string;
}

export interface ToolResponse {
  id: string;
  agentId: string;
  name: string;
  description: string | null;
  type: string;
  configuration: string | null;
  createdAt: Date;
  updatedAt: Date;
}
