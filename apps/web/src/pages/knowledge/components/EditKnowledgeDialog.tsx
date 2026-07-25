import { useState } from "react";

import type { Knowledge } from "../services";

import { AppDialog, Button, Input, Textarea } from "@/components/ui";

import { useUpdateKnowledge } from "../hooks/useUpdateKnowledge";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  agentId: string;
  knowledge: Knowledge;
}

export function EditKnowledgeDialog({
  open,
  onOpenChange,
  agentId,
  knowledge,
}: Props) {
  const mutation = useUpdateKnowledge();

  const [name, setName] = useState(knowledge.name);

  const [content, setContent] = useState(knowledge.content);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setName(knowledge.name);
      setContent(knowledge.content);
    }

    onOpenChange(nextOpen);
  }

  function handleUpdate() {
    mutation.mutate(
      {
        agentId,
        knowledgeId: knowledge.id,
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
      title="Edit Knowledge"
    >
      <div className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} />

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
