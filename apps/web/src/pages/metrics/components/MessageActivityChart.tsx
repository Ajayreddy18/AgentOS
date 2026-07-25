import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function MessageActivityChart({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">AI Usage</h3>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Total LLM Calls</span>

            <span className="font-semibold">{metrics.totalLLMCalls}</span>
          </div>

          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${Math.min(metrics.totalLLMCalls * 5, 100)}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Tool Executions</span>

            <span className="font-semibold">{metrics.toolExecutions}</span>
          </div>

          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: `${Math.min(metrics.toolExecutions * 10, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
