import { z } from "zod";

export const createModelSchema = z.object({
  provider: z.string().min(2).max(100),

  modelName: z.string().min(2).max(255),

  temperature: z.number().min(0).max(2).default(0.7),

  maxTokens: z.number().int().positive().default(4096),

  topP: z.number().min(0).max(1).default(1),

  frequencyPenalty: z.number().min(-2).max(2).default(0),

  presencePenalty: z.number().min(-2).max(2).default(0),
});

export const updateModelSchema = createModelSchema.partial();

export type CreateModelInput = z.infer<typeof createModelSchema>;

export type UpdateModelInput = z.infer<typeof updateModelSchema>;
