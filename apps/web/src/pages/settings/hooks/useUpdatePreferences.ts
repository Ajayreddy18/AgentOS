import { useMutation, useQueryClient } from "@tanstack/react-query";

import { settingsService } from "../services/settings.service";

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsService.updatePreferences,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
}
