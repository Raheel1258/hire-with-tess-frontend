import axios from 'axios';
import { EMPLOYERAPI } from '../Constant/employer-endpoint.route';
import { toast } from 'sonner';
import { clearAuthToken } from '@/Utils/Providers/auth';
import { ProfileInfoType } from '@/Types/Employer/profileinfo';
import { JobFilterType } from '@/Types/Employer/jobfilter';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem('accessToken');
  // const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    const isLoginRequest =
      originalRequest?.url?.includes(EMPLOYERAPI.EMPLOYER_LOGIN) &&
      originalRequest?.method === 'post';

    if (error.response && error.response.status === 401 && !isLoginRequest) {
      clearAuthToken();

      if (error.response?.status === 403) {
        toast.error('Unauthorized access');
      } else if (error.response?.status === 500) {
        toast.error('Server error');
      } else {
        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);


//Get All Jobs
export const GetAllJob = async () => {
  const response = await api.get(EMPLOYERAPI.JOB_DETAILS);
  return response.data;
};

//Get Job Details BYID
export const UserJobByID = async (job_id: string) => {
  const response = await api.get(EMPLOYERAPI.JOB_DETAIL_BYID(job_id));
  return response.data;
};

//Delete Job Details BYID
export const DeleteJobByID = async (job_id: string) => {
  await api.delete(EMPLOYERAPI.DELETE_JOB_BYID(job_id));
  return job_id;
};



//Update Job Details BYID
export const UpdateJobByID = async (
  job_id: string,
  data: {
    job_description: string;
    job_title: string;
    job_type: string;
    company_name: string;
    location: string;
    salary: string;
    currency: string;
  },
) => {
  const response = await api.put(EMPLOYERAPI.UPDATE_JOB_BYID(job_id), data);
  return response.data;
};

//Update Job Status BYID
export const UpdateJobStatusByID = async (job_id: string, status: string) => {
  const response = await api.put(EMPLOYERAPI.UPDATE_JOBSTATUS_BYID(job_id), { status });
  return response.data;
};

//Get All Interviews
export const GetAllInterview = async () => {
  const response = await api.get(EMPLOYERAPI.INTERVIEW_DETAILS);
  return response.data;
};

//Get Job Interviews BYID
export const JobeInterById = async (job_id: string) => {
  const response = await api.get(EMPLOYERAPI.JOB_INTERVIEW_BYID(job_id));
  return response.data;
};

//Get Interview Details BYID
export const GetInterviewById = async (interview_id: string) => {
  const response = await api.get(EMPLOYERAPI.INTERVIEW_DETAIL_BYID(interview_id));
  return response.data;
};

//Update Interview Status BYID
export const UpdateInterviewStatusByID = async (interview_id: string, status: string) => {
  const response = await api.put(EMPLOYERAPI.UPDATE_INTERVIEW_STATUS_BYID(interview_id), {
    status,
  });
  return response.data;
};

//Dashboard Card Stats
export const DashboardCardStats = async () => {
  const response = await api.get(EMPLOYERAPI.DASHBOARD_CARD_STATS);
  return response.data;
};

//Candidate Card stats
export const CandidateCardStats = async () => {
  const response = await api.get(EMPLOYERAPI.CANDIDATE_CARD_STATS);
  return response.data;
};

//Job card stats
export const JobCardStats = async () => {
  const response = await api.get(EMPLOYERAPI.JOB_CARD_STATS);
  return response.data;
};

//Filtered Job
export const FilteredJob = async (data:JobFilterType) => {
  const response = await api.get(EMPLOYERAPI.FILTER_JOBS,{ params: data });
  return response.data;
};

//Filter Interview
export const FilterInterview = async () => {
  const response = await api.get(EMPLOYERAPI.FILTER_INTERVIEW);
  return response.data;
};

//Profile Info
export const ProfileInfo = async () => {
  const response = await api.get(EMPLOYERAPI.ADMIN_PROFILE);
  return response.data;
};

//update profile
export const UpdateProfile = async (data: ProfileInfoType) => {
  const response = await api.put(EMPLOYERAPI.UPDATE_PROFILE, data);
  return response.data;
};

//Delete Profile
export const DeleteProfile = async () => await api.delete(EMPLOYERAPI.DELETE_PROFILE);

//Admin Notification
export const AdminNotification = async () => {
  const response = await api.get(EMPLOYERAPI.NOTIFICATION);
  return response.data;
};

//Admin Notificaation Setting
export const ProfileNotificationPermission = async () => {
  const response = await api.get(EMPLOYERAPI.PROFILE_PERMISSION_NOTIFICATION_SETTING);
  return response.data;
};

//Update Notification Setting
export const UpdateNotificationType = async (notification_type: string) => {
  const response = await api.put(
    EMPLOYERAPI.UPDATE_PROFILE_NOTIFICATION(notification_type),
  );
  return response.data;
};



export const AnalyzeInterview = async(interview_id:string)=>{
  const response = await api.post(EMPLOYERAPI.ANALYZE_INTERVIEW(interview_id));
  return response.data;
}

//Employer Login
export const EmployerLogin = async (data: { email: string; password: string }) => {
  const response = await api.post(EMPLOYERAPI.EMPLOYER_LOGIN, data);
  return response.data;
};
