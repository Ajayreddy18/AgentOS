import {
  Brain,
  Wrench,
  Search,
  Database,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

function Item({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="text-sm text-muted-foreground">{title}</div>

          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}

export function OperationsPanel({ metrics }: Props) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">AI Operations</h2>

        <p className="text-sm text-muted-foreground">
          Live execution pipeline statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Item
          icon={Brain}
          title="LLM Calls"
          value={metrics.totalLLMCalls}
          color="bg-cyan-100 text-cyan-600"
        />

        <Item
          icon={Wrench}
          title="Tool Executions"
          value={metrics.toolExecutions}
          color="bg-violet-100 text-violet-600"
        />

        <Item
          icon={Search}
          title="Retrieval Runs"
          value={metrics.retrievalRuns}
          color="bg-yellow-100 text-yellow-700"
        />

        <Item
          icon={Database}
          title="Memory Runs"
          value={metrics.memoryRuns}
          color="bg-pink-100 text-pink-600"
        />

        <Item
          icon={CheckCircle2}
          title="Successful Tools"
          value={metrics.successfulToolExecutions}
          color="bg-green-100 text-green-600"
        />

        <Item
          icon={XCircle}
          title="Failed Tools"
          value={metrics.failedToolExecutions}
          color="bg-red-100 text-red-600"
        />

        <Item
          icon={Activity}
          title="Success Rate"
          value={`${metrics.successRate}%`}
          color="bg-emerald-100 text-emerald-600"
        />

        <Item
          icon={Activity}
          title="Runtime Events"
          value={metrics.runtimeEvents}
          color="bg-orange-100 text-orange-600"
        />
      </div>
    </section>
  );
}
