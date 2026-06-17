import { z } from 'zod';

export const salaryRangeSchema = z
  .string()
  .trim()
  .min(1, { message: 'Salary is required.' })
  .refine(
    (val) => {
      const parts = val.split('-');
      if (parts.length !== 2) return false;
      const [min, max] = parts;
      return Boolean(min && max && /^\d+$/.test(min) && /^\d+$/.test(max));
    },
    { message: 'Please enter a valid salary range with min and max amounts.' },
  )
  .refine(
    (val) => {
      const [min, max] = val.split('-').map(Number);
      return min > 0 && max >= min;
    },
    { message: 'Max salary must be greater than or equal to min salary.' },
  );

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
  salary: salaryRangeSchema,
  salaryType: z.enum(['per_hour', 'per_month', 'per_year']),
  currency: z.enum(['USD', 'PKR', 'EUR']),

  questions: z.array(z.string()).optional(),
});

export type FormValidator = z.infer<typeof customformSchema>;
