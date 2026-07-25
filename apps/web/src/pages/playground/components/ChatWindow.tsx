import { useStreamingMessage } from "@/pages/messages/hooks/useStreamingMessage";

import { MessageList } from "./MessageList";

import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useMessages } from "@/pages/messages/hooks";

import { useParams } from "react-router-dom";

export function ChatWindow() {
  const { conversationId } = useParams<{
    conversationId: string;
  }>();

  const { data: messages = [] } = useMessages(conversationId ?? "");

  const { data: streaming } = useStreamingMessage();

  const { containerRef, bottomRef } = useAutoScroll([
    messages.length,
    streaming?.pendingUserMessage,
    streaming?.assistantMessage,
  ]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      <MessageList />

      <div ref={bottomRef} />
    </div>
  );
}
