// routes/api-endpoints.ts
import { getRolePrefix } from '@/Utils/helper/roleprefix';

export const API = {
  // AUTH
  LOGIN: `/api/v1/auth/login`,

  // JOBS
  JOB_DETAILS: () => `/api/v1/${getRolePrefix()}/jobs`,
  JOB_DETAIL_BYID: (job_id: string) => `/api/v1/${getRolePrefix()}/jobs/${job_id}`,
  DELETE_JOB_BYID: (job_id: string) => `/api/v1/${getRolePrefix()}/jobs/${job_id}`,
  UPDATE_JOB_BYID: (job_id: string) => `/api/v1/${getRolePrefix()}/jobs/${job_id}`,
  UPDATE_JOBSTATUS_BYID: (job_id: string) => `/api/v1/${getRolePrefix()}/jobs/${job_id}/status`,

  // INTERVIEWS
  INTERVIEW_DETAILS: () => `/api/v1/${getRolePrefix()}/interviews`,
  JOB_INTERVIEW_BYID: (job_id: string) => `/api/v1/${getRolePrefix()}/jobs/${job_id}/interviews`,
  INTERVIEW_DETAIL_BYID: (interview_id: string) => `/api/v1/${getRolePrefix()}/interview/${interview_id}`,
  UPDATE_INTERVIEW_STATUS_BYID: (interview_id: string) => `/api/v1/${getRolePrefix()}/interview/${interview_id}/status`,

  // STATS
  DASHBOARD_CARD_STATS: () => `/api/v1/${getRolePrefix()}/dashboard-stats`,
  CANDIDATE_CARD_STATS: () => `/api/v1/${getRolePrefix()}/candidates-stats`,
  JOB_CARD_STATS: () => `/api/v1/${getRolePrefix()}/jobs-stats`,

  // PROFILE
  GET_PROFILE: () => `/api/v1/${getRolePrefix()}/profile`,
  UPDATE_PROFILE: () => `/api/v1/${getRolePrefix()}/profile`,
  DELETE_PROFILE: () => `/api/v1/${getRolePrefix()}/delete-profile`,

  // NOTIFICATIONS
  GET_NOTIFICATIONS: () => `/api/v1/${getRolePrefix()}/notifications`,
  NOTIFICATION_SETTINGS: () => `/api/v1/${getRolePrefix()}/notification-settings`,
  UPDATE_NOTIFICATION: (type: string) => `/api/v1/${getRolePrefix()}/notification-settings/${type}`,

  // ANALYSIS
  ANALYZE_INTERVIEW: (id: string) => `/api/v1/analyze/${id}`,

  // SUBSCRIPTION (superadmin only)
  EMPLOYER_SUBSCRIPTIONS: () => `/api/v1/superadmin/employer-subscriptions`,
  SUBSCRIPTION_STATS: () => `/api/v1/superadmin/subscription-stats`,
  SUBSCRIPTION_FILTER: () => `/api/v1/superadmin/subscription-filter`,

  // SUPERADMIN USERS
  SUPERADMIN_GET_EMPLOYEES: () => `/api/v1/superadmin/users`,
  SUPERADMIN_GET_EMPLOYEES_BY_ID: (id: string) => `/api/v1/superadmin/users/${id}`,
  SUPERADMIN_DELETE_USER: (id: string) => `/api/v1/superadmin/users/${id}`,
};
