import { MessageSquare } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function AvgMessagesCard({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Avg Messages / Conversation
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {metrics.averageMessagesPerConversation.toFixed(1)}
          </h2>
        </div>

        <MessageSquare className="h-10 w-10 text-violet-500" />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Average number of messages exchanged per conversation.
      </p>
    </div>
  );
}
