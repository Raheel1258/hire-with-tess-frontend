export default interface JobInterviewProps {
    id: string;
    candidate_name: string;
    email: string;
    phone: string;
    resume: string;
    status: string;
    ai_score: number;
    job_id:number;
    created_at:string;
    job_title:string;
    answers:CandidateAnswersProps[];
  
  }

  export interface CandidateAnswersProps{
    question:string;
    answer:string;
    status:string;
    submission_type:string;
    transcription:string;
    type:string;
    url:string
  }