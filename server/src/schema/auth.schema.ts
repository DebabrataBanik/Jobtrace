import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z
    .string('Please enter a username')
    .trim()
    .min(2, 'Username must be atleast 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.email('Please provide a valid email address').trim(),
  password: z
    .string('Please enter a password')
    .min(6, 'Password must be atleast 6 characters'),
});

export const LoginSchema = z.object({
  email: z.email('Please provide a valid email address').trim(),
  password: z.string('Please enter your password'),
});

export const UpdateProfileSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  about: z.string().max(500).optional(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
