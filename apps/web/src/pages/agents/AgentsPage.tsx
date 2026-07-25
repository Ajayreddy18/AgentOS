import { useParams } from "react-router-dom";

import { CreateAgentDialog } from "./components/CreateAgentDialog";
import { AgentCard } from "./components/AgentCard";

import { useAgents } from "./hooks/useAgents";

import { SkeletonPage } from "@/components/ui/SKELETON/";
import { ErrorState, EmptyState } from "@/components/feedback";

export function AgentsPage() {
  const { organizationId, projectId, environmentId } = useParams<{
    organizationId: string;
    projectId: string;
    environmentId: string;
  }>();

  const {
    data: agents = [],
    isLoading,
    isError,
  } = useAgents(environmentId ?? "");

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load agents"
        description="Please try again."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>

          <p className="text-muted-foreground">
            Manage AI agents inside this environment.
          </p>
        </div>

        <CreateAgentDialog environmentId={environmentId ?? ""} />
      </div>

      {agents.length === 0 ? (
        <EmptyState
          title="No Agents Yet"
          description="Create your first AI agent."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              organizationId={organizationId ?? ""}
              projectId={projectId ?? ""}
              environmentId={environmentId ?? ""}
              agent={agent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
