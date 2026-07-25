import { useMutation, useQueryClient } from "@tanstack/react-query";

import { settingsService } from "../services/settings.service";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsService.updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
}
