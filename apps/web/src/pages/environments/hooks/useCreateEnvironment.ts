import { useMutation, useQueryClient } from "@tanstack/react-query";

import { environmentService } from "../services";

export function useCreateEnvironment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: {
        name: string;
        description?: string;
      };
    }) => environmentService.createEnvironment(projectId, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["environments", variables.projectId],
      });
    },
  });
}
