type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-muted-foreground">{description}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
                        mt-6
                        rounded-md
                        bg-primary
                        px-4
                        py-2
                        text-primary-foreground
                    "
        >
          Retry
        </button>
      )}
    </div>
  );
}
