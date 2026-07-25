export interface UserSettings {
  id: string;

  name: string;

  email: string;

  theme: "light" | "dark";

  notifications: boolean;
}

export interface UpdateProfileDto {
  name: string;
}

export interface UpdatePreferencesDto {
  theme: "light" | "dark";

  notifications: boolean;
}

export interface ChangePasswordDto {
  currentPassword: string;

  newPassword: string;
}
