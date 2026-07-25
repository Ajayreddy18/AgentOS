interface RetryButtonProps {
  onRetry: () => void;
}

export function RetryButton({ onRetry }: RetryButtonProps) {
  return (
    <button
      onClick={onRetry}
      className="
                rounded-md
                bg-black
                px-4
                py-2
                text-white
                hover:bg-neutral-800
            "
    >
      Retry
    </button>
  );
}
