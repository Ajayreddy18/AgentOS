import { z } from "zod";

export const searchKnowledgeSchema = z.object({
  query: z.string().min(1),

  limit: z.number().int().min(1).max(20).optional().default(5),
});

export type SearchKnowledgeInput = z.infer<typeof searchKnowledgeSchema>;
