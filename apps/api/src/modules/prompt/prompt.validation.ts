import { z } from "zod";

export const createPromptSchema = z.object({
  name: z.string().min(3).max(255),

  content: z.string().min(1),
});

export const updatePromptSchema = createPromptSchema.partial();

export type CreatePromptInput = z.infer<typeof createPromptSchema>;

export type UpdatePromptInput = z.infer<typeof updatePromptSchema>;
