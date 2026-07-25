import { Activity, CheckCircle2, Cpu, Wrench, Brain } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function RecentActivity({ metrics }: Props) {
  const activities = [
    {
      icon: Brain,
      label: `${metrics.totalLLMCalls} LLM requests processed`,
    },

    {
      icon: Wrench,
      label: `${metrics.toolExecutions} tool executions completed`,
    },

    {
      icon: Cpu,
      label: `${metrics.runtimeEvents} runtime events captured`,
    },

    {
      icon: Activity,
      label: `${metrics.plannerRuns} planner executions`,
    },

    {
      icon: CheckCircle2,
      label: `${metrics.successRate.toFixed(1)}% execution success`,
    },
  ];

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Recent Activity</h2>

      <div className="mt-6 space-y-4">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-blue-500" />

              <span className="text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
