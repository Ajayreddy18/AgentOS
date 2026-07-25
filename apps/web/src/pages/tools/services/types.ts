export interface Tool {
  id: string;

  agentId: string;

  name: string;

  description: string | null;

  type: string;

  configuration: string | null;

  createdAt: Date;

  updatedAt: Date;
}

export interface CreateToolInput {
  name: string;

  description?: string;

  type: string;

  configuration?: string;
}

export interface UpdateToolInput {
  name?: string;

  description?: string;

  type?: string;

  configuration?: string;
}

export interface GetToolsResponse {
  success: boolean;
  data: Tool[];
}

export interface ToolResponse {
  success: boolean;
  data: Tool;
}
