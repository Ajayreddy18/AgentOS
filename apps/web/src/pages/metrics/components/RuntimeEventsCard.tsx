import { Activity } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function RuntimeEventsCard({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Runtime Events</p>

          <h2 className="mt-2 text-3xl font-bold">{metrics.runtimeEvents}</h2>
        </div>

        <Activity className="h-10 w-10 text-indigo-500" />
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Planner Runs</span>

          <span>{metrics.plannerRuns}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Retrieval Runs</span>

          <span>{metrics.retrievalRuns}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Memory Runs</span>

          <span>{metrics.memoryRuns}</span>
        </div>
      </div>
    </div>
  );
}
