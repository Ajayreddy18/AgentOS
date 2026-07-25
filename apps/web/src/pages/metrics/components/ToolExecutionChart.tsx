import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function ToolExecutionChart({ metrics }: Props) {
  const total = metrics.toolExecutions || 1;

  const success = metrics.successfulToolExecutions;

  const failed = metrics.failedToolExecutions;

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Tool Executions</h2>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>Successful</span>

            <span>{success}</span>
          </div>

          <div className="h-3 rounded bg-muted">
            <div
              className="h-full rounded bg-green-500"
              style={{
                width: `${(success / total) * 100}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>Failed</span>

            <span>{failed}</span>
          </div>

          <div className="h-3 rounded bg-muted">
            <div
              className="h-full rounded bg-red-500"
              style={{
                width: `${(failed / total) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
