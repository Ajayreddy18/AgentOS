interface Props {
  value: "light" | "dark";

  onChange: (value: "light" | "dark") => void;
}

export function ThemeSelector({
  value,

  onChange,
}: Props) {
  return (
    <select
      value={value}

      onChange={(e) => onChange(e.target.value as "light" | "dark")}

      className="rounded-lg border px-3 py-2"
    >
      <option value="light">Light</option>

      <option value="dark">Dark</option>
    </select>
  );
}
