import { useState } from "react";

import { SectionCard } from "./SectionCard";

import { SaveButton } from "./SaveButton";

import { useUpdateProfile } from "../hooks/useUpdateProfile";

interface Props {
  name: string;

  email: string;
}

export function ProfileSection({
  name,

  email,
}: Props) {
  const [profileName, setProfileName] = useState(name);

  const mutation = useUpdateProfile();

  return (
    <SectionCard title="Profile">
      <div className="space-y-4">
        <input
          value={profileName}

          onChange={(e) => setProfileName(e.target.value)}

          className="w-full rounded-lg border p-2"
        />

        <input
          value={email}

          disabled

          className="w-full rounded-lg border bg-muted p-2"
        />

        <SaveButton loading={mutation.isPending}>
          <span
            onClick={() =>
              mutation.mutate({
                name: profileName,
              })
            }
          >
            Save Profile
          </span>
        </SaveButton>
      </div>
    </SectionCard>
  );
}
