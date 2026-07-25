import { apiClient } from "@/api/client";

import type {
  CreateEnvironmentInput,
  UpdateEnvironmentInput,
  EnvironmentResponse,
  EnvironmentsResponse,
} from "../services/types";

export async function getEnvironments(projectId: string) {
  const response = await apiClient.get<EnvironmentsResponse>(
    `/projects/${projectId}/environments`,
  );

  return response.data.data;
}

export async function createEnvironment(
  projectId: string,
  data: CreateEnvironmentInput,
) {
  const response = await apiClient.post<EnvironmentResponse>(
    `/projects/${projectId}/environments`,
    data,
  );

  return response.data.data;
}

export async function updateEnvironment(
  projectId: string,
  environmentId: string,
  data: UpdateEnvironmentInput,
) {
  const response = await apiClient.patch<EnvironmentResponse>(
    `/projects/${projectId}/environments/${environmentId}`,
    data,
  );

  return response.data.data;
}

export async function deleteEnvironment(
  projectId: string,
  environmentId: string,
) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
  }>(`/projects/${projectId}/environments/${environmentId}`);

  return response.data;
}
