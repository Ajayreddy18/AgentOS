import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "../services";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      data,
    }: {
      organizationId: string;
      data: {
        name: string;
        description?: string;
      };
    }) => projectService.createProject(organizationId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.organizationId],
      });
    },
  });
}
