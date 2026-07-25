import { Timer } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function LatencyCard({ metrics }: Props) {
  const latency = metrics.averageLatencyMs;

  let color = "text-green-600";

  if (latency > 1000) {
    color = "text-red-600";
  } else if (latency > 500) {
    color = "text-yellow-600";
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Average Latency</p>

          <h2 className={`mt-2 text-3xl font-bold ${color}`}>
            {latency.toFixed(0)} ms
          </h2>
        </div>

        <Timer className={`h-10 w-10 ${color}`} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Average runtime execution latency.
      </p>
    </div>
  );
}
