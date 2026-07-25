import { apiClient } from "@/api/client";

import type { AnalyticsOverview } from "../types";

export async function getMetrics(): Promise<AnalyticsOverview> {
  const response = await apiClient.get("/metrics/dashboard");

  return response.data.data;
}
