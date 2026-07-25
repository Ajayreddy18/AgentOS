interface Props {
  page: number;

  totalPages: number;

  onPrevious: () => void;

  onNext: () => void;
}

export function Pagination({
  page,

  totalPages,

  onPrevious,

  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrevious}

        disabled={page === 1}

        className="rounded border px-4 py-2 disabled:opacity-40"
      >
        Previous
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        onClick={onNext}

        disabled={page === totalPages}

        className="rounded border px-4 py-2 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
