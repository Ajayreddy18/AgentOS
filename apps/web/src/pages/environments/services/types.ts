export interface Environment {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEnvironmentInput {
  name: string;
  description?: string;
}

export interface UpdateEnvironmentInput {
  name?: string;
  description?: string;
}

export interface EnvironmentResponse {
  success: boolean;
  data: Environment;
}

export interface EnvironmentsResponse {
  success: boolean;
  data: Environment[];
}
