import { z } from 'zod';

export const ApplicationSchema = z.object({
  company: z.string('Please enter a company name').trim(),
  title: z.string('Please enter the job title').trim(),
  status: z.literal('Applied'),
  appliedDate: z.coerce.date('Please enter your application date'),
  url: z.url().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateApplicationSchema = z.object({
  company: z.string().trim().min(2).optional(),
  title: z.string().trim().min(2).optional(),
  status: z
    .enum(
      ['OA', 'Interview', 'Offer', 'Rejected'],
      'Please select one of: OA | Interview | Offer | Rejected',
    )
    .optional(),
  appliedDate: z.coerce.date().optional(),
  url: z
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
    })
    .optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof UpdateApplicationSchema>;
