import { useState } from "react";

import { SectionCard } from "./SectionCard";

import { ThemeSelector } from "./ThemeSelector";

import { NotificationToggle } from "./NotificationToggle";

import { SaveButton } from "./SaveButton";

import { useUpdatePreferences } from "../hooks/useUpdatePreferences";

interface Props {
  theme: "light" | "dark";

  notifications: boolean;
}

export function PreferencesSection({
  theme,

  notifications,
}: Props) {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const [currentNotifications, setCurrentNotifications] =
    useState(notifications);

  const mutation = useUpdatePreferences();

  return (
    <SectionCard title="Preferences">
      <div className="space-y-5">
        <ThemeSelector
          value={currentTheme}

          onChange={setCurrentTheme}
        />

        <NotificationToggle
          value={currentNotifications}

          onChange={setCurrentNotifications}
        />

        <SaveButton loading={mutation.isPending}>
          <span
            onClick={() =>
              mutation.mutate({
                theme: currentTheme,

                notifications: currentNotifications,
              })
            }
          >
            Save Preferences
          </span>
        </SaveButton>
      </div>
    </SectionCard>
  );
}
