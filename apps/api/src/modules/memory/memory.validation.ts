import { z } from "zod";

export const createMemorySchema = z.object({
  name: z.string().min(3).max(255),

  content: z.string().min(1),
});

export const updateMemorySchema = createMemorySchema.partial();

export type CreateMemoryInput = z.infer<typeof createMemorySchema>;

export type UpdateMemoryInput = z.infer<typeof updateMemorySchema>;
