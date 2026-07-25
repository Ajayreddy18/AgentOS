import { useMutation, useQueryClient } from "@tanstack/react-query";

import { promptService } from "../services";

export function useUpdatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      promptId,
      data,
    }: {
      agentId: string;
      promptId: string;
      data: {
        name?: string;
        content?: string;
      };
    }) => promptService.updatePrompt(agentId, promptId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["prompts", variables.agentId],
      });
    },
  });
}
