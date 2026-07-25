import { useMutation } from "@tanstack/react-query";

import { settingsService } from "../services/settings.service";

export function useChangePassword() {
  return useMutation({
    mutationFn: settingsService.changePassword,
  });
}
