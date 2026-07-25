import { useQuery } from "@tanstack/react-query";

import { getMetrics } from "../api/getMetrics";

export function useMetricsDashboard() {
  return useQuery({
    queryKey: ["analytics-overview"],

    queryFn: getMetrics,
  });
}
