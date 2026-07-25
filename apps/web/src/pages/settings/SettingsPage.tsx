import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsSidebar } from "./components/SettingsSidebar";
import { SettingsLayout } from "./components/SettingsLayout";
import { SaveChangesBar } from "./components/SaveChangesBar";
import { ProfileAvatar } from "./components/ProfileAvatar";

import { ProfileSection } from "./components/ProfileSection";
import { PreferencesSection } from "./components/PreferencesSection";

import { ErrorState } from "@/components/feedback";
import { SkeletonPage } from "@/components/ui/SKELETON/";

import { useSettings } from "./hooks/useSettings";

export function SettingsPage() {
  const {
    data,

    isLoading,

    isError,

    refetch,
  } = useSettings();

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Unable to load settings"
        description="Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-8">
      <SettingsHeader />

      <ProfileAvatar name={data.name} />

      <SettingsLayout sidebar={<SettingsSidebar />}>
        <ProfileSection name={data.name} email={data.email} />

        <PreferencesSection
          theme={data.theme}
          notifications={data.notifications}
        />

        <SaveChangesBar />
      </SettingsLayout>
    </div>
  );
}
