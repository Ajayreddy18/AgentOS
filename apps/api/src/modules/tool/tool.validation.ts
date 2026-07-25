import { z } from "zod";

export const createToolSchema = z.object({
  name: z.string().min(3).max(255),

  description: z.string().optional(),

  type: z.string().min(1).max(100),

  configuration: z.string().optional(),
});

export const updateToolSchema = createToolSchema.partial();

export type CreateToolInput = z.infer<typeof createToolSchema>;

export type UpdateToolInput = z.infer<typeof updateToolSchema>;
