import { apiClient } from "@/api/client";

import type { RuntimeEventsResponse } from "../services";

export async function getRuntimeEvents(conversationId: string) {
  const response = await apiClient.get<RuntimeEventsResponse>(
    `/conversations/${conversationId}/runtime-events`,
  );

  return response.data.data;
}
