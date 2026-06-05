import { z } from 'zod'

export const ApplicationSchema = z.object({
  company: z.string('Please enter a company name').trim(),
  title: z.string('Please enter the job title').trim(),
  status: z.enum(['Applied', 'OA', 'Interview', 'Offer', 'Rejected'], 'Please select a valid status'),
  appliedDate: z.coerce.date('Please enter your application date'),
  url: z.url().optional(),
  description: z.string().optional(),
  notes: z.string().optional()
})

export type ApplicationInput = z.infer<typeof ApplicationSchema>