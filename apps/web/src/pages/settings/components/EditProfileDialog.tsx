import { useState } from "react";

import { SettingsActions } from "./SettingsActions";

interface Props {
  name: string;

  open: boolean;

  loading?: boolean;

  onClose: () => void;

  onSave: (name: string) => void;
}

export function EditProfileDialog({
  name,

  open,

  loading,

  onClose,

  onSave,
}: Props) {
  const [value, setValue] = useState(name);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <input
          className="mt-5 w-full rounded-lg border p-3"

          value={value}

          onChange={(e) => setValue(e.target.value)}
        />

        <div className="mt-6">
          <SettingsActions
            loading={loading}

            onCancel={onClose}

            onSave={() => onSave(value)}
          />
        </div>
      </div>
    </div>
  );
}
