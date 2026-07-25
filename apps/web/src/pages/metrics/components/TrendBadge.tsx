import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface Props {
  value: number;
}

export function TrendBadge({ value }: Props) {
  if (value > 0) {
    return (
      <div className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        <ArrowUpRight className="mr-1 h-3 w-3" />+{value}%
      </div>
    );
  }

  if (value < 0) {
    return (
      <div className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
        <ArrowDownRight className="mr-1 h-3 w-3" />
        {value}%
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
      <Minus className="mr-1 h-3 w-3" />
      Stable
    </div>
  );
}
