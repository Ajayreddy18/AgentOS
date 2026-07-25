import { apiClient } from "@/api/client";

export interface StreamChatInput {
  conversationId: string;
  message: string;
}

export interface StreamEvent {
  type: "token" | "tool_start" | "tool_result" | "done" | "error";

  content?: string;
  tool?: string;
  result?: unknown;
  message?: string;
}

export async function streamChat(
  input: StreamChatInput,
  onEvent: (event: StreamEvent) => void,
  signal?: AbortSignal,
) {
  const auth = localStorage.getItem("agentos-auth");

  if (!auth) {
    throw new Error("Not authenticated");
  }

  const token = JSON.parse(auth).state.token;

  const response = await fetch(
    `${apiClient.defaults.baseURL}/conversations/${input.conversationId}/chat/stream`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        message: input.message,
      }),

      signal,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to start stream");
  }

  if (!response.body) {
    throw new Error("Streaming not supported");
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, {
      stream: true,
    });

    const events = buffer.split("\n\n");

    buffer = events.pop() ?? "";

    for (const raw of events) {
      if (!raw.startsWith("data: ")) {
        continue;
      }

      const payload = raw.replace("data: ", "");

      const event: StreamEvent = JSON.parse(payload);

      onEvent(event);
    }
  }
}
