import { apiClient } from "@/api/client";

import type {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectsResponse,
  ProjectResponse,
} from "../services/types";

export async function getProjects(organizationId: string) {
  const response = await apiClient.get<ProjectsResponse>(
    `/organizations/${organizationId}/projects`,
  );

  return response.data.data;
}

export async function createProject(
  organizationId: string,
  data: CreateProjectInput,
) {
  const response = await apiClient.post<ProjectResponse>(
    `/organizations/${organizationId}/projects`,
    data,
  );

  return response.data.data;
}

export async function updateProject(
  organizationId: string,
  projectId: string,
  data: UpdateProjectInput,
) {
  const response = await apiClient.patch<ProjectResponse>(
    `/organizations/${organizationId}/projects/${projectId}`,
    data,
  );

  return response.data.data;
}

export async function deleteProject(organizationId: string, projectId: string) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/organizations/${organizationId}/projects/${projectId}`);

  return response.data;
}
