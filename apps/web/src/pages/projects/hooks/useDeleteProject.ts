import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "../services";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
    }: {
      organizationId: string;
      projectId: string;
    }) => projectService.deleteProject(organizationId, projectId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.organizationId],
      });
    },
  });
}
