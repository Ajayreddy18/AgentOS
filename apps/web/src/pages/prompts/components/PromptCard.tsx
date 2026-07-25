import { useState } from "react";

import { Button } from "@/components/ui";

import type { Prompt } from "../services";

import { EditPromptDialog } from "./EditPromptDialog";
import { DeletePromptButton } from "./DeletePromptButton";

interface Props {
  agentId: string;

  prompt: Prompt;
}

export function PromptCard({ agentId, prompt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{prompt.name}</h2>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {prompt.content}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeletePromptButton
          agentId={agentId}

          promptId={prompt.id}
        />
      </div>

      <EditPromptDialog
        open={open}

        onOpenChange={setOpen}

        agentId={agentId}

        prompt={prompt}
      />
    </div>
  );
}
