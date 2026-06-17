import EmployeeAuthStore from '@/store/Auth/auth.store';

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24;

const getCookieFlags = (maxAge: number) => {
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; secure' : '';
  return `path=/; max-age=${maxAge}; samesite=strict${secure}`;
};

export const setAuthToken = (token: string, role: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', role);
    const flags = getCookieFlags(AUTH_COOKIE_MAX_AGE);
    document.cookie = `accessToken=${token}; ${flags}`;
    document.cookie = `userRole=${role}; ${flags}`;
  }
  EmployeeAuthStore.getState().setAccessToken(token);
  EmployeeAuthStore.getState().setUserRole(role);
};

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('organizationName');
    const flags = getCookieFlags(0);
    document.cookie = `accessToken=; ${flags}`;
    document.cookie = `userRole=; ${flags}`;
  }
  EmployeeAuthStore.getState().clearAccessToken();
  EmployeeAuthStore.getState().clearUserRole();
};

export const setOrganizationName = (name: string) => {
  if (typeof window !== 'undefined' && name.trim()) {
    localStorage.setItem('organizationName', name.trim());
  }
};

export const getOrganizationName = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('organizationName') ?? '';
  }
  return '';
};

const getRoleFromCookie = () => {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)userRole=([^;]*)/);
  return match?.[1] ?? '';
};

export const logoutAndRedirect = () => {
  clearAuthToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
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
      getRoleFromCookie()
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
