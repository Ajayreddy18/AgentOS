import { z } from "zod";

export const createEnvironmentSchema = z.object({
  name: z.string().min(3).max(255),

  description: z.string().optional(),
});

export const updateEnvironmentSchema = createEnvironmentSchema.partial();

export type CreateEnvironmentInput = z.infer<typeof createEnvironmentSchema>;

export type UpdateEnvironmentInput = z.infer<typeof updateEnvironmentSchema>;
