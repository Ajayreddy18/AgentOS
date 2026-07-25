import { z } from "zod";

export const createMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system", "tool"]),
  content: z.string().min(1),
});

export const updateMessageSchema = createMessageSchema.partial();

export type CreateMessageInput = z.infer<typeof createMessageSchema>;

export type UpdateMessageInput = z.infer<typeof updateMessageSchema>;
