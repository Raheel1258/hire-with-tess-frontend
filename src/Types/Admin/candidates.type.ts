
interface SuperAdminCandidate {
    id: string;
    candidate_name: string;
    job_title: string;
    created_at: string;
    status: string;
    ai_score?: number | null;
  }

  export default SuperAdminCandidate;