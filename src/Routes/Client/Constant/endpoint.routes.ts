export const APIEndpoint = {
  // JOB Management
  GENERATE_JOB_DETAILS: `/api/v1/generate-job-details/`,
  GENERATE_QUESTION: (job_id: string) => `/api/v1/generate-questions/${job_id}`,

  GET_JOB_DETAILS: (job_id: string) => `/api/v1/job/${job_id}`,
  GET_INTERVIEW_LINK: (job_id: string) => `/api/v1/generate-interview-link/${job_id}`,

  // Update Job Details
  UPDATE_JOB_DETAILS: (job_id: string) => `/api/v1/generate-job-details/${job_id}`,
  UPDATE_JOB_QUESTIONS: (job_id: string) => `/api/v1/update-questions/${job_id}`,
  UPDATE_RES_REQ: (job_id: string) => `/api/v1/job/${job_id}`,

  // Interview Management
  INTERVIEW: (job_id: string) => `/api/v1/interview/${job_id}`,
  INTERVIEW_ANALYZER: (interview_id: string) => `/api/v1/analyze/${interview_id}`,

  UPLOAD_FILE: (interview_id: string) => `/api/v1/upload-files/${interview_id}`,
  SUBMIT_INTERVIEW: (interview_id: string) => `/api/v1/submit-answers-dashboard/${interview_id}`,

  REGISTER_CANDIDATE: `/api/v1/candidate-form/`,

  // Authentication
  SIGNUP: `/api/v1/auth/signup`,
  LOGIN: `/api/v1/auth/login`,
  GOOGLE_LOGIN: `/api/v1/auth/google-login`,
};

export default APIEndpoint;
