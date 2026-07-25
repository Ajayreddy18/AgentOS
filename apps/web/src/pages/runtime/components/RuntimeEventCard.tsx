import type { RuntimeEvent } from "../services";
import { getEventConfig } from "../utils/eventConfig";

interface ToolExecutionResult {
  name: string;
  success: boolean;
  arguments: unknown;
  result: unknown;
}

interface ToolSelectionMetadata {
  tools?: string[];
}

interface ToolExecutionMetadata {
  tools?: ToolExecutionResult[];
}

interface LlmCompletedMetadata {
  responseLength?: number;
}

type RuntimeMetadata =
  ToolSelectionMetadata | ToolExecutionMetadata | LlmCompletedMetadata | null;

interface Props {
  event: RuntimeEvent;
}

export function RuntimeEventCard({ event }: Props) {
  const config = getEventConfig(event.type);

  const Icon = config.icon;

  const iconColor = config.color;

  const metadata = event.metadata as RuntimeMetadata;

  const renderMetadata = () => {
    if (!metadata) {
      return null;
    }

    switch (event.type) {
      case "tool-selection.completed": {
        const data = metadata as ToolSelectionMetadata;

        return (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Selected Tools</p>

            {data.tools?.length ? (
              data.tools.map((tool) => (
                <div key={tool} className="rounded bg-muted px-3 py-2 text-sm">
                  {tool}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tools selected</p>
            )}
          </div>
        );
      }

      case "tool-execution.completed": {
        const data = metadata as ToolExecutionMetadata;

        return (
          <div className="mt-4 space-y-3">
            {data.tools?.map((tool) => (
              <div key={tool.name} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{tool.name}</div>

                  <span
                    className={
                      tool.success
                        ? "rounded bg-green-100 px-2 py-1 text-xs text-green-700"
                        : "rounded bg-red-100 px-2 py-1 text-xs text-red-700"
                    }
                  >
                    {tool.success ? "Success" : "Failed"}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="text-xs text-muted-foreground">Arguments</div>

                  <pre className="overflow-auto rounded bg-muted p-2 text-xs">
                    {JSON.stringify(tool.arguments, null, 2)}
                  </pre>
                </div>

                <div className="mt-2">
                  <div className="text-xs text-muted-foreground">Result</div>

                  <pre className="overflow-auto rounded bg-muted p-2 text-xs">
                    {JSON.stringify(tool.result, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        );
      }

      case "llm.completed": {
        const data = metadata as LlmCompletedMetadata;

        return (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">
                Response Length
              </div>

              <div className="font-semibold">{data.responseLength}</div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="relative pb-8 pl-10">
      <div className="absolute bottom-0 left-4 top-8 w-px bg-border" />

      <div className="absolute left-0 top-0 rounded-full border bg-background p-2 shadow-sm">
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{config.label}</h3>

            <p className="mt-1 text-xs text-muted-foreground">{event.type}</p>
          </div>

          <span className="rounded bg-muted px-2 py-1 text-xs">
            {new Date(event.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </div>

        {renderMetadata()}
      </div>
    </div>
  );
}
