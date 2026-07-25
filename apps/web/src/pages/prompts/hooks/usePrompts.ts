import { useQuery } from "@tanstack/react-query";

import { promptService } from "../services";

export function usePrompts(agentId: string) {
  return useQuery({
    queryKey: ["prompts", agentId],

    queryFn: () => promptService.getPrompts(agentId),

    enabled: !!agentId,
  });
}
