import { getAnalyticsOverview } from "../api/metrics.api";

export async function getMetrics() {
  return getAnalyticsOverview();
}

export const metricsService = {
  getOverview: getMetrics,
};
