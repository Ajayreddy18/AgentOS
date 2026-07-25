import { useState } from "react";

import { Button, AppDialog, Input } from "@/components/ui";

import { useCreateTool } from "../hooks/useCreateTool";

interface Props {
  agentId: string;
}

export function CreateToolDialog({ agentId }: Props) {
  const mutation = useCreateTool();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [type, setType] = useState("");

  const [configuration, setConfiguration] = useState("");

  function handleCreate() {
    mutation.mutate(
      {
        agentId,

        data: {
          name,
          description,
          type,
          configuration,
        },
      },
      {
        onSuccess() {
          setName("");

          setDescription("");

          setType("");

          setConfiguration("");

          setOpen(false);
        },
      },
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Tool</Button>

      <AppDialog open={open} onOpenChange={setOpen} title="Create Tool">
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <Input
            placeholder="Configuration"
            value={configuration}
            onChange={(e) => setConfiguration(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </AppDialog>
    </>
  );
}
