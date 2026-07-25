import { z } from "zod";

export const analyticsQuerySchema = z.object({
  organizationId: z.string().uuid().optional(),

  projectId: z.string().uuid().optional(),

  environmentId: z.string().uuid().optional(),

  agentId: z.string().uuid().optional(),
});

export type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>;
