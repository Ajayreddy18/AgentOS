import { useParams } from "react-router-dom";

import { CreateConversationDialog } from "./components/CreateConversationDialog";
import { ConversationCard } from "./components/ConversationCard";

import { useConversations } from "./hooks/useConversations";

import { SkeletonPage } from "@/components/ui/SKELETON/";

import { ErrorState, EmptyState } from "@/components/feedback";

export function ConversationsPage() {
  const { agentId } = useParams<{
    agentId: string;
  }>();

  const {
    data: conversations = [],
    isLoading,
    isError,
  } = useConversations(agentId ?? "");

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load conversations"
        description="Please try again."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversations</h1>

          <p className="text-muted-foreground">
            Manage conversations for this agent.
          </p>
        </div>

        <CreateConversationDialog agentId={agentId ?? ""} />
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          title="No Conversations Yet"
          description="Start your first conversation."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              agentId={agentId ?? ""}
              conversation={conversation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
