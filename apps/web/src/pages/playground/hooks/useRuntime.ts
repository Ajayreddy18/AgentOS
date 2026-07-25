import { useQuery } from "@tanstack/react-query";

import { getRuntime } from "../services/runtime";

export function useRuntime(conversationId: string) {
  return useQuery({
    queryKey: ["runtime", conversationId],

    queryFn: () => getRuntime(conversationId),

    enabled: !!conversationId,
  });
}
