import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(3).max(255),

  slug: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-z0-9]+$/),

  description: z.string().optional(),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;

export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
