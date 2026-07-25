export function LoadingAnalytics() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-64 rounded bg-muted" />

        <div className="mt-3 h-4 w-96 rounded bg-muted" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div key={index} className="h-40 rounded-xl border bg-card" />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div key={index} className="h-72 rounded-xl border bg-card" />
        ))}
      </div>
    </div>
  );
}
