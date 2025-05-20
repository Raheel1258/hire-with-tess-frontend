
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(baseUrl)

export const APIEndpoint={
    GENERATE_JOB_DETAILS:`${baseUrl}/api/v1/generate-job-details/`,
    GENERATE_QUESTION:`${baseUrl}/api/v1/generate-questions/{job_id}`,
    
}