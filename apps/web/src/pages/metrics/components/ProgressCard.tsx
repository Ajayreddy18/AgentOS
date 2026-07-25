interface Props {
  title: string;
  value: number;
  max?: number;
  color?: string;
}

export function ProgressCard({
  title,
  value,
  max = 100,
  color = "bg-primary",
}: Props) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="font-medium">{title}</span>

        <span className="font-bold">{value}</span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
}
