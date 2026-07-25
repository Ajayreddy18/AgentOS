import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui";

import type { Conversation } from "../services";

import { EditConversationDialog } from "./EditConversationDialog";
import { DeleteConversationButton } from "./DeleteConversationButton";

interface Props {
  agentId: string;
  conversation: Conversation;
}

export function ConversationCard({ agentId, conversation }: Props) {
  const navigate = useNavigate();

  const { organizationId, projectId, environmentId } = useParams();

  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{conversation.title}</h2>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeleteConversationButton
          agentId={agentId}
          conversationId={conversation.id}
        />

        <Button
          onClick={() =>
            navigate(
              `/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/conversations/${conversation.id}`,
            )
          }
        >
          Open Chat
        </Button>
      </div>

      <EditConversationDialog
        open={open}
        onOpenChange={setOpen}
        agentId={agentId}
        conversation={conversation}
      />
    </div>
  );
}
