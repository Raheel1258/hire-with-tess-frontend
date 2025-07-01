export interface InterviewQuestion {
  text: string;
  type: string;
}
export interface UserJobResponse {
  job_description: string;
  job_title: string;
  job_type: string;
  company_name: string;
  location: string;
  salary: string;
  currency: string;
  salary_type: string;
  responsibilities: string[];
  requirements:string[];
  interview_questions: InterviewQuestion[];
  skills:[];
  id: string;
}
