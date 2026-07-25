import { useState } from "react";

import type { Agent } from "../services";

import { Button, AppDialog, Input } from "@/components/ui";

import { useUpdateAgent } from "../hooks/useUpdateAgent";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  environmentId: string;
  agent: Agent;
}

export function EditAgentDialog({
  open,
  onOpenChange,
  environmentId,
  agent,
}: Props) {
  const mutation = useUpdateAgent();

  const [name, setName] = useState(agent.name);

  const [description, setDescription] = useState(agent.description ?? "");

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setName(agent.name);
      setDescription(agent.description ?? "");
    }
    onOpenChange(nextOpen);
  }

  function handleUpdate() {
    mutation.mutate(
      {
        environmentId,
        agentId: agent.id,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess() {
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <AppDialog open={open} onOpenChange={handleOpenChange} title="Edit Agent">
      <div className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end">
          <Button disabled={mutation.isPending} onClick={handleUpdate}>
            {mutation.isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
