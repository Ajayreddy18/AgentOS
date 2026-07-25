import { useQuery } from "@tanstack/react-query";

import { modelService } from "../services";

export function useModels(agentId: string) {
  return useQuery({
    queryKey: ["models", agentId],

    queryFn: () => modelService.getModels(agentId),

    enabled: !!agentId,
  });
}
