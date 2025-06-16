export default interface postedJobDetailsProps{
    id: string;
    job_description: string;
    company_name: string;
    job_title: string;
    currency: string;
    location:string;
    salary:string;
    salary_type:string;
    status: string;
    job_type: string;

    responsibilities:string[];
    requirements:string[];
    skills:string[];
    interview_questions:string[];

    interview_link?: string;
    total_interviews?: number;
}