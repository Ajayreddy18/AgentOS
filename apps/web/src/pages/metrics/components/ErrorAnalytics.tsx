import { AlertTriangle } from "lucide-react";

interface Props {
  onRetry?: () => void;
}

export function ErrorAnalytics({ onRetry }: Props) {
  return (
    <div className="flex h-[65vh] flex-col items-center justify-center rounded-xl border">
      <AlertTriangle className="h-16 w-16 text-red-500" />

      <h2 className="mt-6 text-2xl font-bold">Unable to load analytics</h2>

      <p className="mt-2 text-muted-foreground">
        Something went wrong while loading dashboard data.
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-primary px-5 py-2 text-primary-foreground"
        >
          Retry
        </button>
      )}
    </div>
  );
}
