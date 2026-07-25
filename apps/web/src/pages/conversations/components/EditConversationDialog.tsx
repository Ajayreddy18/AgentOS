import { useState } from "react";

import type { Conversation } from "../services";

import { Button, AppDialog, Input } from "@/components/ui";

import { useUpdateConversation } from "../hooks/useUpdateConversation";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  agentId: string;
  conversation: Conversation;
}

export function EditConversationDialog({
  open,
  onOpenChange,
  agentId,
  conversation,
}: Props) {
  const mutation = useUpdateConversation();

  const [title, setTitle] = useState(conversation.title);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setTitle(conversation.title);
    }

    onOpenChange(nextOpen);
  }

  function handleUpdate() {
    mutation.mutate(
      {
        agentId,
        conversationId: conversation.id,
        data: {
          title,
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
      title="Edit Conversation"
    >
      <div className="space-y-4">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="flex justify-end">
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </AppDialog>
  );
}
