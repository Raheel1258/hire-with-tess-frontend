import EmployeeAuthStore from "@/store/Auth/auth.store";

export const setAuthToken = (token: string, role:string) => {
  localStorage.setItem('accessToken', token);
  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
  document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
  EmployeeAuthStore.getState().setAccessToken(token);
  EmployeeAuthStore.getState().setUserRole(role)
};


export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
  document.cookie = 'accessToken=; path=/; max-age=0';
  document.cookie = 'userRole=; path=/; max-age=0';
  EmployeeAuthStore.getState().clearAccessToken();
  EmployeeAuthStore.getState().clearUserRole();
};

export const getAuthToken = () =>
  localStorage.getItem('accessToken') ||
  EmployeeAuthStore.getState().accessToken;

export const getAuthCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
  return match?.[1] ?? '';
};

export const getAuthHeader = () => {
  const token = getAuthToken() || getAuthCookie();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
