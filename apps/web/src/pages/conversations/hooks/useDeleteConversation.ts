import { useMutation, useQueryClient } from "@tanstack/react-query";

import { conversationService } from "../services";

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      conversationId,
    }: {
      agentId: string;

      conversationId: string;
    }) => conversationService.deleteConversation(agentId, conversationId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", variables.agentId],
      });
    },
  });
}
