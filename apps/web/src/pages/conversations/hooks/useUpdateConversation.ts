import { useMutation, useQueryClient } from "@tanstack/react-query";

import { conversationService } from "../services";

export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      conversationId,
      data,
    }: {
      agentId: string;

      conversationId: string;

      data: {
        title?: string;
      };
    }) => conversationService.updateConversation(agentId, conversationId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", variables.agentId],
      });
    },
  });
}
