import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/api/client";

export function useDeleteModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId, modelId }: { agentId: string; modelId: string }) =>
      apiClient.delete(`/agents/${agentId}/models/${modelId}`),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["models", variables.agentId],
      });
    },
  });
}
