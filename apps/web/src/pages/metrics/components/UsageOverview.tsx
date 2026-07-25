import { SectionCard } from "./SectionCard";

export function UsageOverview() {
  return (
    <SectionCard title="Usage Overview">
      <div
        className="
grid
gap-4
md:grid-cols-3
"
      >
        <div>
          <p className="text-sm text-muted-foreground">LLM Requests</p>

          <h3 className="text-2xl font-bold">229</h3>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Tokens Generated</p>

          <h3 className="text-2xl font-bold">18.4K</h3>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Tool Executions</p>

          <h3 className="text-2xl font-bold">34</h3>
        </div>
      </div>
    </SectionCard>
  );
}
