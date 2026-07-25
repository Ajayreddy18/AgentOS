import { useQuery } from "@tanstack/react-query";

import { runtimeService } from "../services";

export function useRuntimeEvents(conversationId: string) {
  return useQuery({
    queryKey: ["runtime-events", conversationId],

    queryFn: () => runtimeService.getRuntimeEvents(conversationId),

    enabled: !!conversationId,
  });
}
