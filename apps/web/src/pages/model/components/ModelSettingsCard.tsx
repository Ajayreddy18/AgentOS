import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";

import type { Model } from "../types";

interface Props {
  model: Model;

  onEdit: () => void;

  onDelete: () => void;
}

export function ModelSettingsCard({
  model,

  onEdit,

  onDelete,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Configuration</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <strong>Provider</strong>

          <p>{model.provider}</p>
        </div>

        <div>
          <strong>Model</strong>

          <p>{model.modelName}</p>
        </div>

        <div>
          <strong>Temperature</strong>

          <p>{model.temperature}</p>
        </div>

        <div>
          <strong>Max Tokens</strong>

          <p>{model.maxTokens}</p>
        </div>

        <div>
          <strong>Top P</strong>

          <p>{model.topP}</p>
        </div>

        <div>
          <strong>Frequency Penalty</strong>

          <p>{model.frequencyPenalty}</p>
        </div>

        <div>
          <strong>Presence Penalty</strong>

          <p>{model.presencePenalty}</p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onEdit}>Edit</Button>

          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
