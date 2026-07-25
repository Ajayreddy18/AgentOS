import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

function Row({
  title,

  value,
}: {
  title: string;

  value: number;
}) {
  const width = Math.min(value * 15, 100);

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{title}</span>

        <span>{value}</span>
      </div>

      <div className="h-3 rounded bg-muted">
        <div
          className="h-full rounded bg-indigo-600"
          style={{
            width: `${width}%`,
          }}
        />
      </div>
    </div>
  );
}

export function PipelineChart({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Runtime Pipeline</h2>

      <div className="mt-6 space-y-5">
        <Row title="Planner" value={metrics.plannerRuns} />

        <Row title="Retrieval" value={metrics.retrievalRuns} />

        <Row title="Memory" value={metrics.memoryRuns} />

        <Row title="LLM" value={metrics.totalLLMCalls} />

        <Row title="Tool Execution" value={metrics.toolExecutions} />
      </div>
    </div>
  );
}
