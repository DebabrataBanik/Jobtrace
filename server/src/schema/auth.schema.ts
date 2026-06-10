import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z
    .string('Please enter a username')
    .trim()
    .min(2, 'Userame must be atleast 2 characters')
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

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
