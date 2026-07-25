import { CalendarDays } from "lucide-react";

export function DateRangeSelector() {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
      <CalendarDays className="h-4 w-4 text-muted-foreground" />

      <select
        defaultValue="all"
        className="border-none bg-transparent text-sm outline-none"
      >
        <option value="today">Today</option>

        <option value="7">Last 7 Days</option>

        <option value="30">Last 30 Days</option>

        <option value="90">Last 90 Days</option>

        <option value="all">All Time</option>
      </select>
    </div>
  );
}
