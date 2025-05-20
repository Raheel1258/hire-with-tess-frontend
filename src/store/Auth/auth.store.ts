import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface EmployeeAuthState {
  accessToken: string;
  userRole: string;

  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;

  setUserRole: (role: string) => void;
  clearUserRole: () => void;
}

const EmployeeAuthStore = create<EmployeeAuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: '',
        userRole: '',

        setAccessToken: (token) => set({ accessToken: token }),
        clearAccessToken: () => set({ accessToken: '' }),

        setUserRole: (role) => set({ userRole: role }),
        clearUserRole: () => set({ userRole: '' }),
      }),
      {
        name: 'Employee-auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default EmployeeAuthStore;
