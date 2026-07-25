interface Props {
  onSave?: () => void;
}

export function SaveChangesBar({ onSave }: Props) {
  return (
    <div
      className="
                sticky
                bottom-0
                flex
                items-center
                justify-between
                rounded-xl
                border
                bg-card
                p-4
                shadow-lg
            "
    >
      <p className="text-sm text-muted-foreground">
        Don't forget to save your changes.
      </p>

      <button
        onClick={onSave}
        className="
                    rounded-lg
                    bg-primary
                    px-5
                    py-2
                    text-primary-foreground
                "
      >
        Save Changes
      </button>
    </div>
  );
}
