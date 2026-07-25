export interface CreateEnvironmentDto {
  name: string;
  description?: string;
}

export interface UpdateEnvironmentDto {
  name?: string;
  description?: string;
}

export interface EnvironmentResponse {
  id: string;
  name: string;
  description: string | null;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
