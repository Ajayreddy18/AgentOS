import { useState } from "react";

import { SettingsActions } from "./SettingsActions";

interface Props {
  open: boolean;

  loading?: boolean;

  onClose: () => void;

  onSave: (
    current: string,

    next: string,
  ) => void;
}

export function ChangePasswordDialog({
  open,

  loading,

  onClose,

  onSave,
}: Props) {
  const [current, setCurrent] = useState("");

  const [next, setNext] = useState("");

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold">Change Password</h2>

        <div className="mt-5 space-y-4">
          <input
            type="password"

            placeholder="Current Password"

            className="w-full rounded-lg border p-3"

            value={current}

            onChange={(e) => setCurrent(e.target.value)}
          />

          <input
            type="password"

            placeholder="New Password"

            className="w-full rounded-lg border p-3"

            value={next}

            onChange={(e) => setNext(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <SettingsActions
            loading={loading}

            onCancel={onClose}

            onSave={() =>
              onSave(
                current,

                next,
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
