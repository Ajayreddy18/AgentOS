import { useMutation, useQueryClient } from "@tanstack/react-query";

import { knowledgeService } from "../services";

export function useDeleteKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      knowledgeId,
    }: {
      agentId: string;
      knowledgeId: string;
    }) => knowledgeService.deleteKnowledge(agentId, knowledgeId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["knowledge", variables.agentId],
      });
    },
  });
}
