import { useParams } from "react-router-dom";

import { CreatePromptDialog } from "./components/CreatePromptDialog";
import { PromptCard } from "./components/PromptCard";

import { usePrompts } from "./hooks/usePrompts";

export function PromptsPage() {
  const { agentId } = useParams<{
    agentId: string;
  }>();

  const { data: prompts = [], isLoading, isError } = usePrompts(agentId ?? "");

  if (isLoading) {
    return <div>Loading prompts...</div>;
  }

  if (isError) {
    return <div>Failed to load prompts.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prompts</h1>

          <p className="text-muted-foreground">
            Manage prompts for this agent.
          </p>
        </div>

        <CreatePromptDialog agentId={agentId ?? ""} />
      </div>

      {prompts.length === 0 ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          No prompts yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}

              agentId={agentId ?? ""}

              prompt={prompt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
