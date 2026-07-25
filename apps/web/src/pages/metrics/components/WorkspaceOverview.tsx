import {
  Bot,
  BookOpen,
  Building2,
  FolderKanban,
  MessageSquare,
  Wrench,
} from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

const cards = [
  {
    key: "totalOrganizations",
    title: "Organizations",
    icon: Building2,
  },
  {
    key: "totalProjects",
    title: "Projects",
    icon: FolderKanban,
  },
  {
    key: "totalAgents",
    title: "Agents",
    icon: Bot,
  },
  {
    key: "totalConversations",
    title: "Conversations",
    icon: MessageSquare,
  },
  {
    key: "totalKnowledgeBases",
    title: "Knowledge",
    icon: BookOpen,
  },
  {
    key: "totalTools",
    title: "Tools",
    icon: Wrench,
  },
] as const;

export function WorkspaceOverview({ metrics }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  {card.title}
                </div>

                <div className="mt-2 text-3xl font-bold">
                  {metrics[card.key]}
                </div>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
