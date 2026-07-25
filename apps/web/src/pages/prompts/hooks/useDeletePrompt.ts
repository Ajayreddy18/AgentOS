import { useMutation, useQueryClient } from "@tanstack/react-query";

import { promptService } from "../services";

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      promptId,
    }: {
      agentId: string;
      promptId: string;
    }) => promptService.deletePrompt(agentId, promptId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["prompts", variables.agentId],
      });
    },
  });
}
