import { useState } from "react";

import { Button, AppDialog, Input, Textarea } from "@/components/ui";

import { useCreatePrompt } from "../hooks/useCreatePrompt";

interface Props {
  agentId: string;
}

export function CreatePromptDialog({ agentId }: Props) {
  const mutation = useCreatePrompt();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [content, setContent] = useState("");

  function handleCreate() {
    mutation.mutate(
      {
        agentId,

        data: {
          name,
          content,
        },
      },

      {
        onSuccess() {
          setName("");

          setContent("");

          setOpen(false);
        },
      },
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Prompt</Button>

      <AppDialog
        open={open}

        onOpenChange={setOpen}

        title="Create Prompt"
      >
        <div className="space-y-4">
          <Input
            placeholder="Prompt name"

            value={name}

            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Prompt content"

            value={content}

            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </AppDialog>
    </>
  );
}
