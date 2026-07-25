import { CheckCircle2 } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function WorkspaceInsights({ metrics }: Props) {
  const insights = [
    `Workspace contains ${metrics.totalAgents} agent(s).`,

    `${metrics.totalMessages} messages processed.`,

    `${metrics.totalLLMCalls} LLM calls executed.`,

    `${metrics.toolExecutions} tool executions completed.`,

    `Average response length is ${metrics.averageResponseLength.toFixed(
      0,
    )} characters.`,
  ];

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Workspace Insights</h2>

      <div className="mt-6 space-y-4">
        {insights.map((item) => (
          <div key={item} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />

            <p className="text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
