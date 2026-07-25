import { useQuery } from "@tanstack/react-query";

import { getMetrics } from "../services/metrics.service";

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics-dashboard"],

    queryFn: getMetrics,

    staleTime: 60 * 1000,
  });
}
