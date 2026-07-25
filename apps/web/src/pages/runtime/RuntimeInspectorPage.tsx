import { useParams } from "react-router-dom";

import { SkeletonPage } from "@/components/ui/SKELETON/";

import { EmptyState, ErrorState } from "@/components/feedback";

import { useRuntimeEvents } from "./hooks/useRuntimeEvents";

import { RuntimeTimeline } from "./components/RuntimeTimeline";

export function RuntimeInspectorPage() {
  const { conversationId } = useParams();

  const {
    data: events = [],

    isLoading,

    isError,
  } = useRuntimeEvents(conversationId ?? "");

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load runtime events"
        description="Please try again."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Runtime Inspector</h1>

        <p className="text-muted-foreground">
          Inspect how the agent executed this conversation.
        </p>
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="No Runtime Events"
          description="Run a conversation to generate runtime events."
        />
      ) : (
        <RuntimeTimeline events={events} />
      )}
    </div>
  );
}
