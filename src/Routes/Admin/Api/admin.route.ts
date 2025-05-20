import axios from 'axios';
import { AdminEndpoint } from '../Constant/admin-endpoint.route';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Super Admin Auth
export const SuperAdminLogin = async (data: { email: string; password: string }) => {
  const response = await api.post(AdminEndpoint.SUPERADMIN_LOGIN, data);
  return response.data;
};

//Super Admin User
export const GetEmployees = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_EMPLOYEES);
  return response.data;
};

export const GetEmployeesById = async (user_id: string) => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_EMPLOYEES_BY_ID(user_id));
  return response.data;
};

export const DeleteUser = async (user_id: string) => {
  const response = await api.delete(AdminEndpoint.SUPERADMIN_DELETE_USER(user_id));
  return response.data;
};

//Super Admin Job
export const GetAllJob = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_ALLJOB);
  return response.data;
};

export const GetAllAnalysis = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_ALLANALYSIS);
  return response.data;
};

export const GetSubscriptionStats = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_SUBSCRIPTION_STATS);
  return response.data;
};

//Super Admin Subscription
export const GetEmployerSubscription = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_EMPLOYERSUBSCRIPTION);
  return response.data;
};

export const GetSubscriptionFilter = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_SUBSCRIPTION_FILTER);
  return response.data;
};

export const GetDashboardStats = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_DASHBOARD_STATS);
  return response.data;
};

//Super Admin Notification
export const GetNotification = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_NOTIFICATION);
  return response.data;
};

export const GetNotificationSetting = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_NOTIFICATION_SETTING);
  return response.data;
};

//Super Admin Profile
export const UpdateNotification = async (notification_type: string) => {
  const response = await api.put(
    AdminEndpoint.SUPERADMIN_UPDATE_NOTIFICATION(notification_type),
  );
  return response.data;
};

export const GetProfile = async () => {
  const response = await api.get(AdminEndpoint.SUPERADMIN_GET_PROFILE);
  return response.data;
};

export const UpdateProfile = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  const response = await api.put(AdminEndpoint.SUPERADMIN_UPDATE_PROFILE, data);
  return response.data;
};
