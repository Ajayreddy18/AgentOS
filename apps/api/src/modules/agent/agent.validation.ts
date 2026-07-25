import { z } from "zod";

export const createAgentSchema = z.object({
  name: z.string().min(3).max(255),

  description: z.string().optional(),
});

export const updateAgentSchema = createAgentSchema.partial();

export type CreateAgentInput = z.infer<typeof createAgentSchema>;

export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
