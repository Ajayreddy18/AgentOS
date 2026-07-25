import { useParams } from "react-router-dom";

import { SkeletonPage } from "@/components/ui/SKELETON/";

import { useKnowledge } from "./hooks/useKnowledge";

import { CreateKnowledgeDialog } from "./components/CreateKnowledgeDialog";
import { KnowledgeCard } from "./components/KnowledgeCard";

import { EmptyState } from "@/components/feedback";

export function KnowledgePage() {
  const { agentId } = useParams();

  const { data: knowledge = [], isLoading } = useKnowledge(agentId ?? "");

  if (isLoading) {
    return <SkeletonPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge</h1>

          <p className="text-muted-foreground">
            Manage knowledge for this agent.
          </p>
        </div>

        <CreateKnowledgeDialog agentId={agentId ?? ""} />
      </div>

      {knowledge.length === 0 ? (
        <EmptyState
          title="No Knowledge Yet"
          description="Create your first knowledge document."
        />
      ) : (
        <div className="grid gap-4">
          {knowledge.map((item) => (
            <KnowledgeCard
              key={item.id}
              agentId={agentId ?? ""}
              knowledge={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
