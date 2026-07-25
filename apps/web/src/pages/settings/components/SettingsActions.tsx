interface Props {
  loading?: boolean;

  onCancel?: () => void;

  onSave: () => void;
}

export function SettingsActions({
  loading,

  onCancel,

  onSave,
}: Props) {
  return (
    <div className="flex justify-end gap-3">
      {onCancel && (
        <button onClick={onCancel} className="rounded-lg border px-4 py-2">
          Cancel
        </button>
      )}

      <button
        disabled={loading}
        onClick={onSave}
        className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
