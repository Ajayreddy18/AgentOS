import { useQuery } from "@tanstack/react-query";

import { projectService } from "../services";

export function useProjects(organizationId: string) {
  return useQuery({
    queryKey: ["projects", organizationId],

    queryFn: () => projectService.getProjects(organizationId),

    enabled: !!organizationId,
  });
}
