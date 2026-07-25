import { useQuery } from "@tanstack/react-query";

import { knowledgeService } from "../services";

export function useKnowledge(agentId: string) {
  return useQuery({
    queryKey: ["knowledge", agentId],

    queryFn: () => knowledgeService.getKnowledges(agentId),

    enabled: !!agentId,
  });
}
