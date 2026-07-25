import { useState } from "react";

import { Button, AppDialog, Input, Textarea } from "@/components/ui";

import type { Prompt } from "../services";

import { useUpdatePrompt } from "../hooks/useUpdatePrompt";

interface Props {
  open: boolean;

  onOpenChange(open: boolean): void;

  agentId: string;

  prompt: Prompt;
}

export function EditPromptDialog({
  open,
  onOpenChange,
  agentId,
  prompt,
}: Props) {
  const mutation = useUpdatePrompt();

  const [name, setName] = useState(prompt.name);

  const [content, setContent] = useState(prompt.content);

  function handleOpenChange(next: boolean) {
    if (next) {
      setName(prompt.name);

      setContent(prompt.content);
    }

    onOpenChange(next);
  }

  function handleUpdate() {
    mutation.mutate(
      {
        agentId,

        promptId: prompt.id,

        data: {
          name,
          content,
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
    <AppDialog
      open={open}

      onOpenChange={handleOpenChange}

      title="Edit Prompt"
    >
      <div className="space-y-4">
        <Input
          value={name}

          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          value={content}

          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end">
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </AppDialog>
  );
}
