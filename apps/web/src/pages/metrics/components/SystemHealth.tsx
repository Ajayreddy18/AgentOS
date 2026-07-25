import { CheckCircle2, Timer, MessageSquareText } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function SystemHealth({ metrics }: Props) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">System Health</h2>

        <p className="text-sm text-muted-foreground">
          Runtime performance indicators
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <span className="text-sm">Status</span>
          </div>

          <div className="mt-3 text-2xl font-bold">Healthy</div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-600" />

            <span className="text-sm">Avg Latency</span>
          </div>

          <div className="mt-3 text-2xl font-bold">
            {metrics.averageLatencyMs} ms
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-violet-600" />

            <span className="text-sm">Avg Response</span>
          </div>

          <div className="mt-3 text-2xl font-bold">
            {metrics.averageResponseLength}
          </div>
        </div>
      </div>
    </section>
  );
}
