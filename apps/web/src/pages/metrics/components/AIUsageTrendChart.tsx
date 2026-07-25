import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function AIUsageTrendChart({ metrics }: Props) {
  const percentage = Math.min(metrics.totalLLMCalls * 5, 100);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">AI Usage Trend</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Simulated request volume
      </p>

      <div className="mt-8">
        <div className="h-4 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span>{metrics.totalLLMCalls} Calls</span>

          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
