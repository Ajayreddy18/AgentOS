import { useState } from "react";

import { Button, AppDialog, Input } from "@/components/ui";

import { useCreateAgent } from "../hooks/useCreateAgent";

interface Props {
  environmentId: string;
}

export function CreateAgentDialog({ environmentId }: Props) {
  const mutation = useCreateAgent();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  function handleCreate() {
    mutation.mutate(
      {
        environmentId,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess() {
          setName("");
          setDescription("");
          setOpen(false);
        },
      },
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Agent</Button>

      <AppDialog open={open} onOpenChange={setOpen} title="Create Agent">
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

          <div className="flex justify-end">
            <Button disabled={mutation.isPending} onClick={handleCreate}>
              {mutation.isPending ? "Creating...." : "Create"}
            </Button>
          </div>
        </div>
      </AppDialog>
    </>
  );
}
