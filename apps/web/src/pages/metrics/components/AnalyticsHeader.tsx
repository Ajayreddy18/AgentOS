import { RefreshButton } from "./RefreshButton";

import { ExportButton } from "./ExportButton";

import { DateRangeSelector } from "./DateRangeSelector";

import { LastUpdated } from "./LastUpdated";

interface Props {
  onRefresh: () => void;
}

export function AnalyticsHeader({ onRefresh }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Observe the health and performance of your AI workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DateRangeSelector />

          <RefreshButton onClick={onRefresh} />

          <ExportButton />
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <LastUpdated />
      </div>
    </div>
  );
}
