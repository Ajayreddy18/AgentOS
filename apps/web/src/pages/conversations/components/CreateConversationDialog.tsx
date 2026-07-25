import { useState } from "react";

import { Button, AppDialog, Input } from "@/components/ui";

import { useCreateConversation } from "../hooks/useCreateConversation";

interface Props {
  agentId: string;
}

export function CreateConversationDialog({ agentId }: Props) {
  const mutation = useCreateConversation();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  function handleCreate() {
    mutation.mutate(
      {
        agentId,
        data: {
          title,
        },
      },
      {
        onSuccess() {
          setTitle("");
          setOpen(false);
        },
      },
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Conversation</Button>

      <AppDialog open={open} onOpenChange={setOpen} title="Create Conversation">
        <div className="space-y-4">
          <Input
            placeholder="Conversation title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </AppDialog>
    </>
  );
}
