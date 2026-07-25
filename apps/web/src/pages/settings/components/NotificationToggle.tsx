interface Props {
  value: boolean;

  onChange: (value: boolean) => void;
}

export function NotificationToggle({
  value,

  onChange,
}: Props) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"

        checked={value}

        onChange={(e) => onChange(e.target.checked)}
      />

      <span>Enable Notifications</span>
    </label>
  );
}
