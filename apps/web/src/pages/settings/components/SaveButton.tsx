interface Props {
  loading?: boolean;

  children: React.ReactNode;
}

export function SaveButton({
  loading,

  children,
}: Props) {
  return (
    <button
      disabled={loading}

      className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Saving..." : children}
    </button>
  );
}
