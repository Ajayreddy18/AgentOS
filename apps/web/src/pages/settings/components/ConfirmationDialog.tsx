interface Props {
  open: boolean;

  title: string;

  description: string;

  onConfirm: () => void;

  onCancel: () => void;
}

export function ConfirmationDialog({
  open,

  title,

  description,

  onConfirm,

  onCancel,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-3 text-muted-foreground">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
