import { ApiError } from "./ApiError";

import { RetryButton } from "./RetryButton";

interface ErrorFallbackProps {
  message: string;

  onRetry?: () => void;
}

export function ErrorFallback({
  message,

  onRetry,
}: ErrorFallbackProps) {
  return (
    <div
      className="
                flex
                flex-col
                items-center
                gap-4
                py-16
            "
    >
      <ApiError message={message} />

      {onRetry && <RetryButton onRetry={onRetry} />}
    </div>
  );
}
