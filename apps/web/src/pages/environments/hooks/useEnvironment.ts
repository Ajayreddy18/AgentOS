import { useQuery } from "@tanstack/react-query";

import { environmentService } from "../services";

export function useEnvironments(projectId: string) {
  return useQuery({
    queryKey: ["environments", projectId],

    queryFn: () => environmentService.getEnvironments(projectId),

    enabled: !!projectId,
  });
}
