import { z } from "zod";

export const createKnowledgeSchema = z.object({
  name: z.string().min(3).max(255),

  content: z.string().min(1),
});

export const updateKnowledgeSchema = createKnowledgeSchema.partial();

export type CreateKnowledgeInput = z.infer<typeof createKnowledgeSchema>;

export type UpdateKnowledgeInput = z.infer<typeof updateKnowledgeSchema>;
