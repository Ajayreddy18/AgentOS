import { useState } from "react";

import { Button, AppDialog, Input } from "@/components/ui";

import type { Tool } from "../services";

import { useUpdateTool } from "../hooks/useUpdateTool";

interface Props {
  open: boolean;

  onOpenChange(open: boolean): void;

  agentId: string;

  tool: Tool;
}

export function EditToolDialog({ open, onOpenChange, agentId, tool }: Props) {
  const mutation = useUpdateTool();

  const [name, setName] = useState(tool.name);

  const [description, setDescription] = useState(tool.description ?? "");

  const [type, setType] = useState(tool.type);

  const [configuration, setConfiguration] = useState(tool.configuration ?? "");

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setName(tool.name);

      setDescription(tool.description ?? "");

      setType(tool.type);

      setConfiguration(tool.configuration ?? "");
    }

    onOpenChange(nextOpen);
  }

  function handleUpdate() {
    mutation.mutate(
      {
        agentId,

        toolId: tool.id,

        data: {
          name,
          description,
          type,
          configuration,
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
    <AppDialog open={open} onOpenChange={handleOpenChange} title="Edit Tool">
      <div className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input value={type} onChange={(e) => setType(e.target.value)} />

        <Input
          value={configuration}
          onChange={(e) => setConfiguration(e.target.value)}
        />

        <div className="flex justify-end">
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </AppDialog>
  );
}
