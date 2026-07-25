import { Gauge } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function PerformanceScore({ metrics }: Props) {
  let score = 100;

  score -= metrics.failedToolExecutions * 5;

  score -= Math.floor(metrics.averageLatencyMs / 100);

  score = Math.max(score, 0);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Performance Score</p>

          <h2 className="mt-2 text-4xl font-bold">{score}</h2>
        </div>

        <Gauge className="h-10 w-10 text-green-600" />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Overall AI workspace performance.
      </p>
    </div>
  );
}
