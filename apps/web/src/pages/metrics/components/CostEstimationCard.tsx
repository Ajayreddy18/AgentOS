import { DollarSign } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function CostEstimationCard({ metrics }: Props) {
  const estimated = (metrics.totalLLMCalls * 0.00015).toFixed(4);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Estimated AI Cost</p>

          <h2 className="mt-2 text-3xl font-bold">${estimated}</h2>

          <p className="text-sm text-muted-foreground">
            Approximate LLM usage cost
          </p>
        </div>

        <DollarSign className="h-10 w-10 text-green-600" />
      </div>
    </div>
  );
}
