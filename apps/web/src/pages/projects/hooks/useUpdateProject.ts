import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "../services";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      data,
    }: {
      organizationId: string;
      projectId: string;
      data: {
        name?: string;
        description?: string;
      };
    }) => projectService.updateProject(organizationId, projectId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.organizationId],
      });
    },
  });
}
