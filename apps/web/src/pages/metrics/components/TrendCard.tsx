import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  trend: number;
}

export function TrendCard({ title, value, trend }: Props) {
  const positive = trend >= 0;

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="text-sm text-muted-foreground">{title}</div>

      <div className="mt-2 text-3xl font-bold">{value}</div>

      <div
        className={`mt-3 inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm ${
          positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {positive ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <ArrowDownRight className="h-4 w-4" />
        )}
        {Math.abs(trend)}%
      </div>
    </div>
  );
}
