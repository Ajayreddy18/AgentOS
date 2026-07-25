import { RotateCw } from "lucide-react";

interface Props {
  onClick: () => void;
}

export function RefreshButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}

      className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted"
    >
      <RotateCw className="h-4 w-4" />
      Refresh
    </button>
  );
}
