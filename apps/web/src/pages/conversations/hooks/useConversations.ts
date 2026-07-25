import { useQuery } from "@tanstack/react-query";

import { conversationService } from "../services";

export function useConversations(agentId: string) {
  return useQuery({
    queryKey: ["conversations", agentId],

    queryFn: () => conversationService.getConversations(agentId),

    enabled: !!agentId,
  });
}
