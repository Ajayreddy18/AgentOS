import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface Props {
  value: number;
}

export function HealthBadge({ value }: Props) {
  if (value >= 95) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-4 w-4" />
        Healthy
      </div>
    );
  }

  if (value >= 70) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
        <AlertTriangle className="h-4 w-4" />
        Warning
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
      <XCircle className="h-4 w-4" />
      Critical
    </div>
  );
}
