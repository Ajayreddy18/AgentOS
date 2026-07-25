export interface Model {
  id: string;

  agentId: string;

  provider: string;

  modelName: string;

  temperature: number;

  maxTokens: number;

  topP: number;

  frequencyPenalty: number;

  presencePenalty: number;

  createdAt: string;

  updatedAt: string;
}

export interface CreateModelDto {
  provider: string;

  modelName: string;

  temperature: number;

  maxTokens: number;

  topP: number;

  frequencyPenalty: number;

  presencePenalty: number;
}

export type UpdateModelDto = Partial<CreateModelDto>;
