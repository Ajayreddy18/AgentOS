interface LoadingErrorProps {
  message?: string;
}

export function LoadingError({
  message = "Failed to load data.",
}: LoadingErrorProps) {
  return (
    <div
      className="
                rounded-lg
                border
                border-red-300
                bg-red-50
                p-6
                text-center
                text-red-700
            "
    >
      {message}
    </div>
  );
}
