import { useQuery } from "@tanstack/react-query";

import { agentService } from "../services";

export function useAgents(environmentId: string) {
  return useQuery({
    queryKey: ["agents", environmentId],

    queryFn: () => agentService.getAgents(environmentId),

    enabled: !!environmentId,
  });
}
