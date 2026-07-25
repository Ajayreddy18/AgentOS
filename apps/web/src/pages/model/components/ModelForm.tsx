import { Input } from "@/components/ui";

export interface ModelFormValues {
  provider: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface Props {
  value: ModelFormValues;

  onChange: (value: ModelFormValues) => void;
}

export function ModelForm({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Provider"
        value={value.provider}
        onChange={(e) =>
          onChange({
            ...value,
            provider: e.target.value,
          })
        }
      />

      <Input
        placeholder="Model Name"
        value={value.modelName}
        onChange={(e) =>
          onChange({
            ...value,
            modelName: e.target.value,
          })
        }
      />

      <Input
        type="number"
        placeholder="Temperature"
        value={value.temperature}
        onChange={(e) =>
          onChange({
            ...value,
            temperature: Number(e.target.value),
          })
        }
      />

      <Input
        type="number"
        placeholder="Max Tokens"
        value={value.maxTokens}
        onChange={(e) =>
          onChange({
            ...value,
            maxTokens: Number(e.target.value),
          })
        }
      />

      <Input
        type="number"
        placeholder="Top P"
        value={value.topP}
        onChange={(e) =>
          onChange({
            ...value,
            topP: Number(e.target.value),
          })
        }
      />

      <Input
        type="number"
        placeholder="Frequency Penalty"
        value={value.frequencyPenalty}
        onChange={(e) =>
          onChange({
            ...value,
            frequencyPenalty: Number(e.target.value),
          })
        }
      />

      <Input
        type="number"
        placeholder="Presence Penalty"
        value={value.presencePenalty}
        onChange={(e) =>
          onChange({
            ...value,
            presencePenalty: Number(e.target.value),
          })
        }
      />
    </div>
  );
}
