import axios from 'axios';
import { APIEndpoint } from '@/Routes/Client/Constant/endpoint.routes';
import { SubmitInterviewPayload } from '@/Types/EmployerDashboard/useresponse';
import TypeInterviewLink from '@/Types/EmployerDashboard/interviewlink.type';
import EmployeeAuthStore from '@/store/Auth/auth.store';
import { getAuthToken } from '@/Utils/Providers/auth';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import TypeUploadFile from '@/Types/Candidate/uploadfile';
import AiResponse from '@/Types/EmployerDashboard/airesponse';
import UpdateResponse from '@/Types/Employer/Updateresponse';
import JobDetails from '@/Types/Employer/jobdetails.type';
import QuestionType from '@/Types/Employer/question.type';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const GenerateJobDetails = async (data: AiResponse) => {
  const token = getAuthToken();
  const response = await api.post(APIEndpoint.GENERATE_JOB_DETAILS, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
};

export const GetJobDetails = async (job_id: string) => {
  const response = await api.get(APIEndpoint.GET_JOB_DETAILS(job_id));
  return response.data;
};

export const updateJobDetails = async (job_id: string, data: JobDetails) => {
  const response = await api.put(APIEndpoint.UPDATE_JOB_DETAILS(job_id), data);
  return response.data;
};

export const GetQuestionById = async (job_id: string) => {
  const response = await api.get(APIEndpoint.INTERVIEW(job_id));
  return response.data;
};

export const GenerateQuestion = async (job_id: string) => {
  const response = await api.post(APIEndpoint.GENERATE_QUESTION(job_id), {
    job_id,
  });
  return response.data.questions;
};

export const RegenerateQuestion = async (job_id: string, questions: QuestionType[]) => {
  const response = await api.post(APIEndpoint.REGENERATE_QUESTION(job_id), {
    questions,
  });
  return response.data.questions;
};

export const updateJobQuestions = async (job_id: string, questions: QuestionType[]) => {
  const response = await api.put(APIEndpoint.UPDATE_JOB_QUESTIONS(job_id), {
    questions,
  });
  return response.data;
};

//Update Req ,Res & Skill
export const updateResReq = async (job_id: string, data: UpdateResponse) => {
  const response = await api.put(APIEndpoint.UPDATE_RES_REQ(job_id), data);
  return response.data;
};

//Sign UP
export const SignUp = async (data: {
  first_name: string;
  last_name: string;
  organization_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: 'admin';
}) => {
  const response = await api.post(APIEndpoint.SIGNUP, data);
  return response.data;
};

//googleLogin
export const GoogleLoginIn = async (code: string) => {
  const response = await api.post(APIEndpoint.GOOGLE_LOGIN, {
    code: code,
  });
  console.log(response, 'response fro backend');
  console.log(response.data, 'response.data from backend');
  return response.data;
};

//Get Generate Interview link
export const GenerateInterviewLink = async (
  job_id: string,
): Promise<TypeInterviewLink> => {
  const { accessToken } = EmployeeAuthStore.getState();
  if (!accessToken) throw new Error('No access token available');
  const response = await api.post(
    APIEndpoint.GET_INTERVIEW_LINK(job_id),
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const RegisterCandidate = async (data: FormData) => {
  const response = await api.post(APIEndpoint.REGISTER_CANDIDATE, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const setInterviewId = useRecordingStore.getState().setInterviewId;
  setInterviewId(response.data.interview_id);

  return response;
};

export const UploadFile = async (interview_id: string, data: FormData) => {
  const response = await api.post<TypeUploadFile>(
    APIEndpoint.UPLOAD_FILE(interview_id),
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return response.data;
};

export const SubmitInterview = async (
  interview_id: string,
  data: SubmitInterviewPayload,
) => {
  const payload = { Question_data: data };
  const response = await api.post(APIEndpoint.SUBMIT_INTERVIEW(interview_id), payload);
  return response.data;
};

//TWILLIO call
export const TwillioStartCall = async (
  job_id: string,
  interview_id: string,
  phone_number: string,
) => {
  const url = APIEndpoint.TWILLIO_START_CALL(job_id, interview_id);
  const response = await api.post(url, null, {
    params: {
      phone_number,
    },
  });
  return response.data;
};