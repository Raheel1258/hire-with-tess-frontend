import {z} from "zod"

export const formSchema= z.object({
    jobDescription: z.string().min(3,{message:"write descriptive message"}),
    jobTitle: z.string().min(1,{message:'write Job Title here'}),
    jobType: z.string().min(1,{message:"Write Job Type here"}),
    companyName: z.string().min(2,{message:"Company name here"}),
    location:z.string().min(3,{message:'enter valid location'}),
    salary:z.string().min(1,{message:"must be a valid salary"})
})

export type FormValidator = z.infer<typeof formSchema>;