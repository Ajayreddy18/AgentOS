import { useState } from "react";

import type { Knowledge } from "../services";

import { Button } from "@/components/ui";

import { EditKnowledgeDialog } from "./EditKnowledgeDialog";
import { DeleteKnowledgeButton } from "./DeleteKnowledgeButton";

interface Props {
  agentId: string;
  knowledge: Knowledge;
}

export function KnowledgeCard({ agentId, knowledge }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{knowledge.name}</h2>

        <p className="text-sm text-muted-foreground line-clamp-4">
          {knowledge.content}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeleteKnowledgeButton agentId={agentId} knowledgeId={knowledge.id} />
      </div>

      <EditKnowledgeDialog
        open={open}
        onOpenChange={setOpen}
        agentId={agentId}
        knowledge={knowledge}
      />
    </div>
  );
}
