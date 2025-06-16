interface CandidateItem {
    id: string;
    candidate_name: string;
    job_title: string;
    created_at: string;
    status: string;
    interview_link: string;
    interview_metadata: {
      platform: string;
      interview_id: string;
      interview_link: string;
      interview_date: string;
      interview_time: string;
    };
    ai_score: number;
    final_report: string;
    interview_id: string;
  }
  export default CandidateItem;