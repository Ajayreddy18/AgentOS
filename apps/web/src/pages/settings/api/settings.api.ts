import { apiClient } from "@/api/client";

import type {
  UpdateProfileDto,
  UpdatePreferencesDto,
  ChangePasswordDto,
} from "@/pages/settings/services/types";

export async function getSettings() {
  const response = await apiClient.get("/settings");

  return response.data.data;
}

export async function updateProfile(data: UpdateProfileDto) {
  const response = await apiClient.patch(
    "/settings/profile",

    data,
  );

  return response.data.data;
}

export async function updatePreferences(data: UpdatePreferencesDto) {
  const response = await apiClient.patch(
    "/settings/preferences",

    data,
  );

  return response.data.data;
}

export async function changePassword(data: ChangePasswordDto) {
  const response = await apiClient.patch(
    "/settings/password",

    data,
  );

  return response.data;
}
