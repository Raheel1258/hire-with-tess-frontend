import { z } from 'zod';

export const customformSchema = z.object({
  jobDescription: z
    .string()
    .min(3, { message: 'Please provide a detailed job description .' }),
  jobTitle: z.string().min(1, { message: 'Job title is required.' }),
  jobType: z.string().min(1, { message: 'Please select the job type .' }),
  companyName: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters long.' }),
  location: z.string().min(2, { message: 'Please enter a valid location .' }),
  salary: z.string().min(1, { message: 'Please enter a valid salary amount.' }),
  currency: z.string().min(1, { message: 'Please select a currency .' }),
  questions: z.array(z.string()).optional(),
});

export type FormValidator = z.infer<typeof customformSchema>;
