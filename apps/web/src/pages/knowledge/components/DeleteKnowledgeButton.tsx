import { Button } from "@/components/ui";

import { useDeleteKnowledge } from "../hooks/useDeleteKnowledge";

interface Props {
  agentId: string;
  knowledgeId: string;
}

export function DeleteKnowledgeButton({ agentId, knowledgeId }: Props) {
  const mutation = useDeleteKnowledge();

  return (
    <Button
      variant="destructive"
      onClick={() =>
        mutation.mutate({
          agentId,
          knowledgeId,
        })
      }
    >
      Delete
    </Button>
  );
}
