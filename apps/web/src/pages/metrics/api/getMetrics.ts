import { apiClient } from "@/api/client";

import type { AnalyticsOverview } from "../types";

export async function getMetrics() {
  const response = await apiClient.get("/analytics/overview");

  return response.data.data as AnalyticsOverview;
}
