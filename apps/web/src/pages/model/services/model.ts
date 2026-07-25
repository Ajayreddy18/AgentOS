import { apiClient } from "@/api/client";

import type { Model, CreateModelDto, UpdateModelDto } from "../types";

export async function getModels(agentId: string): Promise<Model[]> {
  const res = await apiClient.get(`/agents/${agentId}/models`);

  return res.data.data;
}

export async function createModel(
  agentId: string,
  data: CreateModelDto,
): Promise<Model> {
  const res = await apiClient.post(`/agents/${agentId}/models`, data);

  return res.data.data;
}

export async function updateModel(
  agentId: string,
  modelId: string,
  data: UpdateModelDto,
): Promise<Model> {
  const res = await apiClient.patch(
    `/agents/${agentId}/models/${modelId}`,
    data,
  );

  return res.data.data;
}
