import { useParams } from "react-router-dom";

import { useRuntime } from "../hooks/useRuntime";

import { useRuntimeEvents } from "@/pages/runtime/hooks/useRuntimeEvents";
import { RuntimeTimeline } from "@/pages/runtime/components/RuntimeTimeline";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-card shadow-sm">
      <div className="border-b px-4 py-2">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          {title}
        </h3>
      </div>

      <div className="p-4">{children}</div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export function RuntimeInspector() {
  const { conversationId } = useParams<{
    conversationId: string;
  }>();

  const { data, isLoading, isError } = useRuntime(conversationId ?? "");
  const { data: events = [] } = useRuntimeEvents(conversationId ?? "");

  const llmCalls = events.filter((e) => e.type === "llm.completed").length;

  const toolCalls = events.filter(
    (e) => e.type === "tool-execution.completed",
  ).length;

  const retrievals = events.filter(
    (e) => e.type === "retrieval.completed",
  ).length;

  const memories = events.filter((e) => e.type === "memory.completed").length;

  if (!conversationId) {
    return (
      <aside className="w-96 border-l bg-background">
        <div className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">
          Select a conversation to inspect its runtime.
        </div>
      </aside>
    );
  }

  if (isLoading) {
    return (
      <aside className="w-96 border-l bg-background">
        <div className="space-y-4 p-6">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />

          <div className="h-28 animate-pulse rounded-lg bg-muted" />

          <div className="h-24 animate-pulse rounded-lg bg-muted" />

          <div className="h-24 animate-pulse rounded-lg bg-muted" />

          <div className="h-24 animate-pulse rounded-lg bg-muted" />
        </div>
      </aside>
    );
  }

  if (isError || !data) {
    return (
      <aside className="w-96 border-l bg-background">
        <div className="flex h-full items-center justify-center p-6 text-center text-destructive">
          Failed to load runtime.
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-96 border-l bg-background overflow-y-auto">
      <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur px-6 py-4">
        <h2 className="text-xl font-bold">Runtime Inspector</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Current execution context
        </p>
      </div>

      <div className="space-y-6 p-5">
        <Section title="Execution Summary">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">LLM Calls</div>

              <div className="mt-1 text-2xl font-bold">{llmCalls}</div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">Tool Calls</div>

              <div className="mt-1 text-2xl font-bold">{toolCalls}</div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">Retrievals</div>

              <div className="mt-1 text-2xl font-bold">{retrievals}</div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">Memories</div>

              <div className="mt-1 text-2xl font-bold">{memories}</div>
            </div>
          </div>
        </Section>

        <Section title="Execution Timeline">
          {events.length === 0 ? (
            <EmptyState message="No runtime events yet." />
          ) : (
            <RuntimeTimeline events={events} />
          )}
        </Section>

        <Section title="Prompt">
          <div className="max-h-64 overflow-auto rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">
            {data.prompt}
          </div>
        </Section>

        <Section title="Model">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Provider</div>

              <div className="font-medium">{data.model.provider}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Model</div>

              <div className="font-medium">{data.model.modelName}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Temperature</div>

              <div>{data.model.temperature}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Max Tokens</div>

              <div>{data.model.maxTokens}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Top P</div>

              <div>{data.model.topP}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Frequency Penalty</div>

              <div>{data.model.frequencyPenalty}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Presence Penalty</div>

              <div>{data.model.presencePenalty}</div>
            </div>
          </div>
        </Section>

        <Section title="Knowledge">
          {data.knowledge.length === 0 ? (
            <EmptyState message="No knowledge attached." />
          ) : (
            <div className="space-y-3">
              {data.knowledge.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="font-semibold">{item.name}</div>

                  <div className="mt-2 max-h-32 overflow-auto text-sm whitespace-pre-wrap text-muted-foreground">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Memories">
          {data.memories.length === 0 ? (
            <EmptyState message="No memories available." />
          ) : (
            <div className="space-y-3">
              {data.memories.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="font-semibold">{item.name}</div>

                  <div className="mt-2 max-h-32 overflow-auto text-sm whitespace-pre-wrap text-muted-foreground">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Tools">
          {data.tools.length === 0 ? (
            <EmptyState message="No tools configured." />
          ) : (
            <div className="space-y-3">
              {data.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-xl border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{tool.name}</div>

                    <span className="rounded bg-muted px-2 py-1 text-xs uppercase">
                      {tool.type}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {tool.description ?? "No description provided."}
                  </div>

                  {tool.configuration && (
                    <div className="mt-3">
                      <div className="mb-1 text-xs font-medium uppercase text-muted-foreground">
                        Configuration
                      </div>

                      <pre className="max-h-40 overflow-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap">
                        {tool.configuration}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </aside>
  );
}
