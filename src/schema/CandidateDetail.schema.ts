import { z } from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const CandidateDetailSchema = z.object({
  image: z
    .instanceof(File, {
      message: 'Please select an image file.',
    })
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please upload a valid image file (JPEG, PNG, or WebP).',
    }),

  job_id: z.string().min(1, { message: 'Job ID is required.' }),

  candidate_name: z.string().min(3, { message: 'Please provide your User name.' }),
  email: z
    .string()
    .min(1, { message: 'Email field has to be filled.' })
    .email('This is not a valid email.'),
  phone: z
    .string()
    .min(11, { message: 'Telephone field has to be filled.' })
    .regex(phoneRegex, 'Invalid Number!'),
});

export type CandidateDetailsValidator = z.infer<typeof CandidateDetailSchema>;
