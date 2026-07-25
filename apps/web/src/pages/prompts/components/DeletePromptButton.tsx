import { Button } from "@/components/ui";

import { useDeletePrompt } from "../hooks/useDeletePrompt";

interface Props {
  agentId: string;

  promptId: string;
}

export function DeletePromptButton({ agentId, promptId }: Props) {
  const mutation = useDeletePrompt();

  return (
    <Button
      variant="destructive"

      onClick={() =>
        mutation.mutate({
          agentId,
          promptId,
        })
      }
    >
      Delete
    </Button>
  );
}
