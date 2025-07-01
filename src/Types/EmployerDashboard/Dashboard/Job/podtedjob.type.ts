export default interface postedJobProps{
    id: string;
    company_name: string;
    job_title: string;
    currency: string;
    status: string;
    shortlisted_stats: {
      shortlisted: number;
      shortlist_ratio: number;
    };
    job_type: string;
    created_at: string;
    expiry_date: string;

    interview_link?: string;
    total_interviews?: number;
}