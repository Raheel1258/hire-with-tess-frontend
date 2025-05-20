import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ToggleProps {
  showPassword: boolean;
  showConfirmPassword: boolean;
  copied: string;
  showShareOptions: boolean;
  showQrSharedOptions: boolean;

  setShowQrSharedOptions: () => void;
  setCopied: (value: string) => void;
  setShowShareOptions: () => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
}

export const useToggleStore = create<ToggleProps>()(
  devtools(
    persist(
      (set) => ({
        showPassword: false,
        showConfirmPassword: false,
        copied: '',
        showShareOptions: false,
        showQrSharedOptions: false,

        setShowQrSharedOptions: () =>
          set((state) => ({ showQrSharedOptions: !state.showQrSharedOptions })),
        setCopied: (value: string) => set({ copied: value }),
        setShowShareOptions: () =>
          set((state) => ({ showShareOptions: !state.showShareOptions })),

        toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
        toggleShowConfirmPassword: () =>
          set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
      }),
      {
        name: 'Basic-store',
      },
    ),
  ),
);
