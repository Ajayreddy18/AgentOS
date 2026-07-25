import type { RuntimeEvent } from "../services";
import { RuntimeEventCard } from "./RuntimeEventCard";

interface Props {
  events: RuntimeEvent[];
}

export function RuntimeTimeline({ events }: Props) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  if (!sortedEvents.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-semibold">No Runtime Events</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Send a message to inspect the execution pipeline.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sortedEvents.map((event) => (
        <RuntimeEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
