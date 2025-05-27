export interface Analysis {
  id: string;
  interview_id: string;
  final_report: Record<string, any>;
  created_at: string;
}

export interface AnalysisResponse {
  total_job_postings: number;
  active_employers: number;
  subscription_revenue: string;
  total_candidates: number;
  shortlisted_candidates: number;
  candidate_success_rate: number;
  total_interviews: number;
  jobs_without_applicants: number;
}
