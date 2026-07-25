import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function TopAgents({ metrics }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Workspace Statistics</h3>

      <div className="mt-5 space-y-4">
        <div className="flex justify-between">
          <span>Agents</span>

          <span className="font-semibold">{metrics.totalAgents}</span>
        </div>

        <div className="flex justify-between">
          <span>Conversations</span>

          <span className="font-semibold">{metrics.totalConversations}</span>
        </div>

        <div className="flex justify-between">
          <span>Messages</span>

          <span className="font-semibold">{metrics.totalMessages}</span>
        </div>

        <div className="flex justify-between">
          <span>Knowledge Bases</span>

          <span className="font-semibold">{metrics.totalKnowledgeBases}</span>
        </div>

        <div className="flex justify-between">
          <span>Tools</span>

          <span className="font-semibold">{metrics.totalTools}</span>
        </div>
      </div>
    </div>
  );
}
