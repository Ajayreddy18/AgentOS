import { useParams } from "react-router-dom";

import { useMessages } from "@/pages/messages/hooks";
import { useStreamingMessage } from "@/pages/messages/hooks/useStreamingMessage";

import { MessageBubble } from "./MessageBubble";

export function MessageList() {
  const { conversationId } = useParams<{
    conversationId: string;
  }>();

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useMessages(conversationId ?? "");

  const { data: streaming } = useStreamingMessage();

  if (isLoading) {
    return <div className="p-6">Loading messages...</div>;
  }

  if (isError) {
    return <div className="p-6 text-destructive">Failed to load messages.</div>;
  }

  if (
    messages.length === 0 &&
    !streaming?.pendingUserMessage &&
    !streaming?.assistantMessage
  ) {
    return (
      <div className="p-6 text-muted-foreground">
        No messages yet.
        <br />
        Start the conversation below.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}

      {streaming?.pendingUserMessage && (
        <MessageBubble role="user" content={streaming.pendingUserMessage} />
      )}

      {(streaming?.assistantMessage || streaming?.isStreaming) && (
        <MessageBubble
          role="assistant"
          content={
            streaming.isStreaming
              ? `${streaming.assistantMessage}▋`
              : streaming.assistantMessage
          }
        />
      )}
    </div>
  );
}
