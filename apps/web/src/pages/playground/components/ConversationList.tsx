import { useParams } from "react-router-dom";

import { useConversations } from "@/pages/conversations/hooks";

import { ConversationItem } from "./ConversationItem";

export function ConversationList() {
  const { agentId } = useParams<{
    agentId: string;
  }>();

  const { data: conversations = [], isLoading } = useConversations(
    agentId ?? "",
  );

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-2 space-y-2">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
