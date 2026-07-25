export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
}

export interface ProjectResponse {
  success: boolean;
  data: Project;
}

export interface ProjectsResponse {
  success: boolean;
  data: Project[];
}
