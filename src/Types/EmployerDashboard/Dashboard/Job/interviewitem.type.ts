export default interface InterviewItem {
    id: string;
    candidate_name: string;
    job_title: string;
    created_at: string;
    status: string;
    interview_link?: string;
    ai_score: number | null;
    interview_metadata?: {
      interview_source: string;
    };
  }
  