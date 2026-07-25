import { useMutation, useQueryClient } from "@tanstack/react-query";

import { messageService } from "../services";

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      data,
    }: {
      conversationId: string;
      data: {
        role: string;
        content: string;
      };
    }) => messageService.createMessage(conversationId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
  });
}
