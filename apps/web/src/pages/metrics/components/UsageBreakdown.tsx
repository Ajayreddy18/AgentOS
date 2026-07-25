import { Brain, Database, Search, Wrench } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

function Row({
  label,
  value,
  total,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  icon: React.ElementType;
}) {
  const percentage = total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />

          <span className="text-sm">{label}</span>
        </div>

        <span className="font-medium">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color.replace("text", "bg")}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export function UsageBreakdown({ metrics }: Props) {
  const total =
    metrics.totalLLMCalls +
    metrics.toolExecutions +
    metrics.retrievalRuns +
    metrics.memoryRuns;

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">AI Usage Breakdown</h2>

        <p className="text-sm text-muted-foreground">
          Distribution of runtime operations.
        </p>
      </div>

      <div className="space-y-5">
        <Row
          label="LLM Calls"
          value={metrics.totalLLMCalls}
          total={total}
          color="text-cyan-600"
          icon={Brain}
        />

        <Row
          label="Tool Executions"
          value={metrics.toolExecutions}
          total={total}
          color="text-violet-600"
          icon={Wrench}
        />

        <Row
          label="Retrieval"
          value={metrics.retrievalRuns}
          total={total}
          color="text-yellow-600"
          icon={Search}
        />

        <Row
          label="Memory"
          value={metrics.memoryRuns}
          total={total}
          color="text-pink-600"
          icon={Database}
        />
      </div>
    </section>
  );
}
