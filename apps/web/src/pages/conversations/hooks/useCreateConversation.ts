import { useMutation, useQueryClient } from "@tanstack/react-query";

import { conversationService } from "../services";

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      data,
    }: {
      agentId: string;

      data: {
        title: string;
      };
    }) => conversationService.createConversation(agentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", variables.agentId],
      });
    },
  });
}
