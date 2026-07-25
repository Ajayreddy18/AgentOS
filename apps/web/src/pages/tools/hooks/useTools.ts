import { useQuery } from "@tanstack/react-query";

import { toolService } from "../services";

export function useTools(agentId: string) {
  return useQuery({
    queryKey: ["tools", agentId],

    queryFn: () => toolService.getTools(agentId),

    enabled: Boolean(agentId),
  });
}
