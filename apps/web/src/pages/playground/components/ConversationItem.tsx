import { NavLink, useParams } from "react-router-dom";

import type { Conversation } from "@/pages/conversations/services";

interface Props {
  conversation: Conversation;
}

export function ConversationItem({ conversation }: Props) {
  const { organizationId, projectId, environmentId, agentId } = useParams();

  return (
    <NavLink
      to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/conversations/${conversation.id}`}
      className={({ isActive }) =>
        [
          "block rounded-lg border p-3 transition-colors",
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
        ].join(" ")
      }
    >
      <div className="font-medium">{conversation.title}</div>
    </NavLink>
  );
}
