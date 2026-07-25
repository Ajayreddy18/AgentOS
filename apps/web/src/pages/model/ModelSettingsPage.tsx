import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { Button } from "@/components/ui";

import { ModelForm } from "./components/ModelForm";

import { ModelSettingsCard } from "./components/ModelSettingsCard";

import { useModels } from "./hooks/useModels";

import { useCreateModel } from "./hooks/useCreateModel";

import { useUpdateModel } from "./hooks/useUpdateModel";

import { useDeleteModel } from "./hooks/useDeleteModel";

export function ModelSettingsPage() {
  const { agentId } = useParams();

  const { data = [] } = useModels(agentId ?? "");

  const createModel = useCreateModel();

  const updateModel = useUpdateModel();

  const deleteModel = useDeleteModel();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    provider: "groq",
    modelName: "llama-3.3-70b-versatile",
    temperature: 0.7,
    maxTokens: 4096,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && data.length) {
      initialized.current = true;

      setForm(data[0]);
    }
  }, [data]);

  function handleSave() {
    if (data.length === 0) {
      createModel.mutate({
        agentId: agentId!,

        data: form,
      });
    } else {
      updateModel.mutate({
        agentId: agentId!,

        modelId: data[0].id,

        data: form,
      });
    }

    setEditing(false);
  }

  if (data.length && !editing) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Agent Settings</h1>

          <p className="text-muted-foreground">
            Manage the model configuration for this agent.
          </p>
        </div>

        <ModelSettingsCard
          model={data[0]}

          onEdit={() => setEditing(true)}

          onDelete={() =>
            deleteModel.mutate({
              agentId: agentId!,

              modelId: data[0].id,
            })
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Settings</h1>

          <p className="text-muted-foreground">
            Configure the model used by this agent.
          </p>
        </div>

        {data.length === 0 && <Button>Configure Model</Button>}
      </div>

      <ModelForm
        value={form}

        onChange={setForm}
      />

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
