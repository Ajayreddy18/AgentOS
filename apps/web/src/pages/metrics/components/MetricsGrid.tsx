import {
  Building2,
  FolderKanban,
  Bot,
  MessagesSquare,
  MessageSquare,
} from "lucide-react";

import type { AnalyticsOverview } from "../types";

import { MetricCard } from "./MetricCard";

interface Props {
  metrics: AnalyticsOverview;
}

export function MetricsGrid({ metrics }: Props) {
  return (
    <div
      className="
grid
gap-6
sm:grid-cols-2
xl:grid-cols-3
"
    >
      <MetricCard
        title="Organizations"

        value={metrics.totalOrganizations}

        description="Active workspaces"

        icon={<Building2 />}
      />

      <MetricCard
        title="Projects"

        value={metrics.totalProjects}

        description="Configured projects"

        icon={<FolderKanban />}
      />

      <MetricCard
        title="Agents"

        value={metrics.totalAgents}

        description="AI agents running"

        icon={<Bot />}
      />

      <MetricCard
        title="Conversations"

        value={metrics.totalConversations}

        description="Total conversations"

        icon={<MessagesSquare />}
      />

      <MetricCard
        title="Messages"

        value={metrics.totalMessages}

        description="AI interactions"

        icon={<MessageSquare />}
      />
    </div>
  );
}
