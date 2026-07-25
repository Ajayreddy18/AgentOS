import { Bot } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function ModelUsageCard({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Model Usage</p>

          <h2 className="mt-2 text-2xl font-bold">Groq</h2>

          <p className="text-sm text-muted-foreground">
            {metrics.totalLLMCalls} Requests
          </p>
        </div>

        <Bot className="h-10 w-10 text-violet-500" />
      </div>
    </div>
  );
}
