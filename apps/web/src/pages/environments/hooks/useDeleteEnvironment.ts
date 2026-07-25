import { useMutation, useQueryClient } from "@tanstack/react-query";

import { environmentService } from "../services";

export function useDeleteEnvironment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      environmentId,
    }: {
      projectId: string;
      environmentId: string;
    }) => environmentService.deleteEnvironment(projectId, environmentId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["environments", variables.projectId],
      });
    },
  });
}
