export default interface postedJobProps{
    id: string;
    job_title: string;
    status: string;
    shortlisted_stats: {
      shortlisted: number;
      shortlist_ratio: number;
    };
    job_type: string;
    created_at: string;
    expiry_date: string;
}