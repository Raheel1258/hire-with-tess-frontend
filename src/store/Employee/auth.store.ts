import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface EmployeeAuthState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

const EmployeeAuthStore = create<EmployeeAuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: '',
        setAccessToken: (token) => set({ accessToken: token }),
        clearAccessToken: () => set({ accessToken: '' }),
      }),
      {
        name: 'Employee-auth-storage',
      },
    ),
  ),
);

export default EmployeeAuthStore;
