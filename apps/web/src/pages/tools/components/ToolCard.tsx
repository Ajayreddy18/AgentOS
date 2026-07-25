import { useState } from "react";

import { Button } from "@/components/ui";

import type { Tool } from "../services";

import { EditToolDialog } from "./EditToolDialog";

import { DeleteToolButton } from "./DeleteToolButton";

interface Props {
  agentId: string;

  tool: Tool;
}

export function ToolCard({ agentId, tool }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{tool.name}</h2>

        <p className="text-sm text-muted-foreground">
          {tool.description || "No description"}
        </p>

        <p className="text-xs text-muted-foreground">Type: {tool.type}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeleteToolButton agentId={agentId} toolId={tool.id} />
      </div>

      <EditToolDialog
        open={open}
        onOpenChange={setOpen}
        agentId={agentId}
        tool={tool}
      />
    </div>
  );
}
