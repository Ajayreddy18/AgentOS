import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Input } from "@/components/ui";

import { useStreamChat } from "../hooks";
import { useStreamingMessageActions } from "@/pages/messages/hooks/useStreamingMessage";
import { useAbortStream } from "@/hooks/useAbortStream";

import { useStreamingMessage } from "@/pages/messages/hooks/useStreamingMessage";

export function MessageComposer() {
  const { conversationId } = useParams();

  const mutation = useStreamChat();

  const { data: streaming } = useStreamingMessage();

  const [message, setMessage] = useState("");

  const { setPendingUserMessage, appendAssistantToken, clear } =
    useStreamingMessageActions();

  const { createController, abort } = useAbortStream();

  function sendMessage(prompt: string) {
    const controller = createController();

    setPendingUserMessage(prompt);

    mutation.mutate(
      {
        conversationId: conversationId ?? "",
        message: prompt,
        signal: controller.signal,

        onEvent(event) {
          if (event.type === "token" && event.content) {
            appendAssistantToken(event.content);
          }
        },
      },
      {
        onSuccess() {
          clear();
        },
      },
    );
  }

  function handleSend() {
    if (!message.trim()) {
      return;
    }

    sendMessage(message);

    setMessage("");
  }

  function handleRegenerate() {
    if (!streaming?.lastPrompt) {
      return;
    }

    setMessage(streaming.lastPrompt);
    sendMessage(streaming.lastPrompt);
  }

  return (
    <div className="border-t p-4">
      <div className="flex gap-3">
        <Input
          placeholder="Send a message..."
          value={message}
          disabled={streaming?.isStreaming}
          onChange={(e) => setMessage(e.target.value)}
        />

        {streaming?.isStreaming ? (
          <Button
            variant="destructive"
            onClick={() => {
              abort();
              clear();
            }}
          >
            Stop
          </Button>
        ) : (
          <Button onClick={handleSend} disabled={mutation.isPending}>
            Send
          </Button>
        )}

        {!streaming?.isStreaming && streaming?.lastPrompt && (
          <Button variant="outline" onClick={handleRegenerate}>
            Regenerate
          </Button>
        )}
      </div>
    </div>
  );
}
