import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function AIUsagePanel({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="mb-5 text-lg font-semibold">AI Usage</h3>

      <div className="space-y-4">
        <Row title="LLM Calls" value={metrics.totalLLMCalls} />

        <Row title="Tool Executions" value={metrics.toolExecutions} />

        <Row title="Planner Runs" value={metrics.plannerRuns} />

        <Row title="Retrieval Runs" value={metrics.retrievalRuns} />

        <Row title="Memory Runs" value={metrics.memoryRuns} />
      </div>
    </div>
  );
}

function Row({
  title,

  value,
}: {
  title: string;

  value: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{title}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
