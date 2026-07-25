import { apiClient } from "@/api/client";

export interface DashboardMetrics {
  totalProjects: number;
  totalAgents: number;
  totalModels: number;
  totalMessages: number;
}

export const dashboardService = {
  async getMetrics() {
    const response = await apiClient.get("/metrics/dashboard");

    return response.data.data as DashboardMetrics;
  },
};
