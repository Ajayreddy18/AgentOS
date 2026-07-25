import { useState } from "react";

import { Button } from "@/components/ui";

import type { Agent } from "../services";

import { EditAgentDialog } from "./EditAgentDialog";
import { DeleteAgentButton } from "./DeleteAgentButton";
import { useNavigate } from "react-router-dom";

interface Props {
  organizationId: string;
  projectId: string;
  environmentId: string;
  agent: Agent;
}

export function AgentCard({
  organizationId,
  projectId,
  environmentId,
  agent,
}: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{agent.name}</h2>

        <p className="text-sm text-muted-foreground">
          {agent.description || "No description"}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={() =>
            navigate(
              `/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agent.id}`,
            )
          }
        >
          Open Workspace
        </Button>

        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeleteAgentButton environmentId={environmentId} agentId={agent.id} />
      </div>

      <EditAgentDialog
        open={open}
        onOpenChange={setOpen}
        environmentId={environmentId}
        agent={agent}
      />
    </div>
  );
}
