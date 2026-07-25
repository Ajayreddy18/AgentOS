import { BarChart3 } from "lucide-react";

export function EmptyAnalyticsState() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed">
      <BarChart3 className="h-14 w-14 text-muted-foreground" />

      <h2 className="mt-5 text-xl font-semibold">No Analytics Available</h2>

      <p className="mt-2 max-w-md text-center text-muted-foreground">
        Start chatting with your agents to generate conversations, runtime
        events, tool executions and AI analytics.
      </p>
    </div>
  );
}
