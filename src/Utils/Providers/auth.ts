import EmployeeAuthStore from '@/store/Auth/auth.store';
import { signOut } from 'next-auth/react';

export const setAuthToken = (token: string, role: string) => {
  localStorage.setItem('accessToken', token);
  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
  document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
  EmployeeAuthStore.getState().setAccessToken(token);
  EmployeeAuthStore.getState().setUserRole(role);
};

export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
  document.cookie = 'accessToken=; path=/; max-age=0';
  document.cookie = 'userRole=; path=/; max-age=0';
  EmployeeAuthStore.getState().clearAccessToken();
  EmployeeAuthStore.getState().clearUserRole();
  signOut();
};

export const getAuthToken = () =>
  localStorage.getItem('accessToken') ||
  EmployeeAuthStore.getState().accessToken ||
  getAuthCookie();

export const getAuthRole = () => {
  const role =
    localStorage.getItem('userRole') ||
    EmployeeAuthStore.getState().userRole ||
    getAuthCookie();
  return role;
};

export const getAuthCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
  return match?.[1] ?? '';
};

export const getAuthHeader = () => {
  const token = getAuthToken() || getAuthCookie();
  const role = getAuthRole();
  return token ? { Authorization: `Bearer ${token}`, role } : { role };
};
