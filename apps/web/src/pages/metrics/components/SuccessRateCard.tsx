import { CheckCircle2 } from "lucide-react";

import type { AnalyticsOverview } from "../types";

interface Props {
  metrics: AnalyticsOverview;
}

export function SuccessRateCard({ metrics }: Props) {
  const percentage = metrics.successRate;

  const circumference = 2 * Math.PI * 45;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <section className="rounded-xl border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold">Tool Success Rate</h2>

        <p className="text-sm text-muted-foreground">
          Overall execution reliability.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="relative h-36 w-36">
          <svg className="h-36 w-36 -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />

            <circle
              cx="72"
              cy="72"
              r="45"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <CheckCircle2 className="mb-1 h-6 w-6 text-green-600" />

            <div className="text-3xl font-bold">{percentage}%</div>
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 text-center">
            <div className="text-xs text-muted-foreground">Successful</div>

            <div className="mt-2 text-2xl font-bold text-green-600">
              {metrics.successfulToolExecutions}
            </div>
          </div>

          <div className="rounded-lg border p-4 text-center">
            <div className="text-xs text-muted-foreground">Failed</div>

            <div className="mt-2 text-2xl font-bold text-red-600">
              {metrics.failedToolExecutions}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
