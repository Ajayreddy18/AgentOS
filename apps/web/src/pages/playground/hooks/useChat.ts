import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendChat } from "../services";

export function useChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      message,
    }: {
      conversationId: string;
      message: string;
    }) =>
      sendChat(conversationId, {
        message,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
  });
}
