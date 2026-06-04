import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().trim().min(2, 'Name must be atleast 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.email('Please provide a valid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be atleast 6 characters')
})