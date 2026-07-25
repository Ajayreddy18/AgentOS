import { Button } from "@/components/ui";

import { useDeleteConversation } from "../hooks/useDeleteConversation";

interface Props {
  agentId: string;
  conversationId: string;
}

export function DeleteConversationButton({ agentId, conversationId }: Props) {
  const mutation = useDeleteConversation();

  return (
    <Button
      variant="destructive"
      onClick={() =>
        mutation.mutate({
          agentId,
          conversationId,
        })
      }
    >
      Delete
    </Button>
  );
}
