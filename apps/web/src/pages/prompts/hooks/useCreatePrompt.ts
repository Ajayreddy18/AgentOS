import { useMutation, useQueryClient } from "@tanstack/react-query";

import { promptService } from "../services";

export function useCreatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      data,
    }: {
      agentId: string;
      data: {
        name: string;
        content: string;
      };
    }) => promptService.createPrompt(agentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["prompts", variables.agentId],
      });
    },
  });
}
