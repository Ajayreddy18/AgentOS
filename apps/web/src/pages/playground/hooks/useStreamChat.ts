import { useMutation, useQueryClient } from "@tanstack/react-query";

import { streamChat, type StreamEvent } from "../services/streamChat";

export function useStreamChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      message,
      onEvent,
      signal,
    }: {
      conversationId: string;
      message: string;
      onEvent: (event: StreamEvent) => void;
      signal?: AbortSignal;
    }) =>
      streamChat(
        {
          conversationId,
          message,
        },
        onEvent,
        signal,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
  });
}
