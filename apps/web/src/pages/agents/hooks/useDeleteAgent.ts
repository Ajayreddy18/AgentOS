import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agentService } from "../services";

export function useDeleteAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      environmentId,
      agentId,
    }: {
      environmentId: string;
      agentId: string;
    }) => agentService.deleteAgent(environmentId, agentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agents", variables.environmentId],
      });
    },
  });
}
