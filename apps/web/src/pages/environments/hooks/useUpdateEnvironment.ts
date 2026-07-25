import { useMutation, useQueryClient } from "@tanstack/react-query";

import { environmentService } from "../services";

export function useUpdateEnvironment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      environmentId,
      data,
    }: {
      projectId: string;
      environmentId: string;
      data: {
        name?: string;
        description?: string;
      };
    }) => environmentService.updateEnvironment(projectId, environmentId, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["environments", variables.projectId],
      });
    },
  });
}
