import { z } from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
export const CandidateDetailSchema = z.object({
  resume: z
    .any()
    .optional(),
  job_id: z.string().min(1, { message: 'Job ID is required.' }),

  candidate_name: z.string().min(2, { message: 'Please provide your Full Name.' }),
  email: z
    .string()
    .min(1, { message: 'Email field has to be filled.' })
    .email('This is not a valid email.'),
    callback_number: z
    .string()
    .min(11, { message: 'Phone Number field has to be filled.' })
    .regex(phoneRegex, 'Invalid Number!'),
});

export type CandidateDetailsValidator = z.infer<typeof CandidateDetailSchema>;
