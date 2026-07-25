import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function ExecutionPanel({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="mb-5 text-lg font-semibold">Tool Execution</h3>

      <div className="space-y-4">
        <Row label="Successful" value={metrics.successfulToolExecutions} />

        <Row label="Failed" value={metrics.failedToolExecutions} />

        <Row label="Success Rate" value={`${metrics.successRate}%`} />
      </div>
    </div>
  );
}

function Row({
  label,

  value,
}: {
  label: string;

  value: string | number;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
