import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  about: z.string().max(500).optional(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
