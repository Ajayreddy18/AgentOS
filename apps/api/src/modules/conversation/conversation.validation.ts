import { z } from "zod";

export const createConversationSchema = z.object({
  title: z.string().min(2).max(255),
});

export const updateConversationSchema = createConversationSchema.partial();

export type CreateConversationInput = z.infer<typeof createConversationSchema>;

export type UpdateConversationInput = z.infer<typeof updateConversationSchema>;
