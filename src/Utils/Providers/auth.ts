import EmployeeAuthStore from '@/store/Auth/auth.store';

export const setAuthToken = (token: string, role: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
    document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
  }
  EmployeeAuthStore.getState().setAccessToken(token);
  EmployeeAuthStore.getState().setUserRole(role);
};

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    document.cookie = 'accessToken=; path=/; max-age=0';
    document.cookie = 'userRole=; path=/; max-age=0';
  }
  EmployeeAuthStore.getState().clearAccessToken();
  EmployeeAuthStore.getState().clearUserRole();
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('accessToken') ||
      EmployeeAuthStore.getState().accessToken ||
      getAuthCookie()
    );
  }
  return EmployeeAuthStore.getState().accessToken;
};

export const getAuthRole = () => {
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('userRole') ||
      EmployeeAuthStore.getState().userRole ||
      getAuthCookie()
    );
  }
  return EmployeeAuthStore.getState().userRole;
};

export const getAuthCookie = () => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
    return match?.[1] ?? '';
  }
  return '';
};
