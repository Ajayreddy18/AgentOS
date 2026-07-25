import { useState } from "react";

import { AppDialog, Button, Input, Textarea } from "@/components/ui";

import { useCreateKnowledge } from "../hooks/useCreateKnowledge";

interface Props {
  agentId: string;
}

export function CreateKnowledgeDialog({ agentId }: Props) {
  const mutation = useCreateKnowledge();

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
      <Button onClick={() => setOpen(true)}>New Knowledge</Button>

      <AppDialog open={open} onOpenChange={setOpen} title="Create Knowledge">
        <div className="space-y-4">
          <Input
            placeholder="Knowledge Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Knowledge Content"
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
