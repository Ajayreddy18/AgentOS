import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface StreamingMessage {
  pendingUserMessage: string;
  assistantMessage: string;
  isStreaming: boolean;
  lastPrompt: string;
}

const DEFAULT_VALUE: StreamingMessage = {
  pendingUserMessage: "",
  assistantMessage: "",
  isStreaming: false,
  lastPrompt: "",
};

export function useStreamingMessage() {
  return useQuery({
    queryKey: ["streaming-message"],
    queryFn: () => DEFAULT_VALUE,
    initialData: DEFAULT_VALUE,
    staleTime: Infinity,
  });
}

export function useStreamingMessageActions() {
  const queryClient = useQueryClient();

  function setPendingUserMessage(message: string) {
    queryClient.setQueryData(
      ["streaming-message"],
      (previous: StreamingMessage = DEFAULT_VALUE) => ({
        ...previous,
        pendingUserMessage: message,
        assistantMessage: "",
        isStreaming: true,
        lastPrompt: message,
      }),
    );
  }

  function appendAssistantToken(token: string) {
    queryClient.setQueryData(
      ["streaming-message"],
      (previous: StreamingMessage = DEFAULT_VALUE) => ({
        ...previous,
        assistantMessage: previous.assistantMessage + token,
      }),
    );
  }

  function clear() {
    queryClient.setQueryData(
      ["streaming-message"],
      (previous: StreamingMessage = DEFAULT_VALUE) => ({
        ...previous,
        pendingUserMessage: "",
        assistantMessage: "",
        isStreaming: false,
      }),
    );
  }

  return {
    setPendingUserMessage,
    appendAssistantToken,
    clear,
  };
}
