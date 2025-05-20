import { z } from 'zod';

export const AccountDetailformSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters long.' }),
  lastname: z.string().min(1, { message: 'Last name is required.' }),
  organization: z.string().min(1, { message: 'Please enter your organization name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type AccountFormValidator = z.infer<typeof AccountDetailformSchema>;
