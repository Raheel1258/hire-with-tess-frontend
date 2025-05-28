import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ToggleProps {
  showPassword: boolean;
  showConfirmPassword: boolean;
  copied: string;
  showShareOptions: boolean;
  showQrSharedOptions: boolean;
  interviewLink: string;
  qrCode: string;

  setInterviewLink: (value: string) => void;
  setShowQrSharedOptions: () => void;
  setCopied: (value: string) => void;
  setShowShareOptions: () => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  setQrCode: (value: string) => void;
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
        interviewLink: '',
        qrCode: '',

        setQrCode: (value: string) => set({ qrCode: value }),
        setInterviewLink: (value: string) => set({ interviewLink: value }),
        setShowQrSharedOptions: () =>
          set((state) => ({ showQrSharedOptions: !state.showQrSharedOptions })),
        setCopied: (value: string) => set({ copied: value }),
        setShowShareOptions: () =>
          set((state) => ({ showShareOptions: !state.showShareOptions })),

        toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
        toggleShowConfirmPassword: () =>
          set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

        resetInterviewLink: () =>
          set({
            showPassword: false,
            showConfirmPassword: false,
            copied: '',
            showShareOptions: false,
            showQrSharedOptions: false,
            interviewLink: '',
            qrCode: '',
          }),
      }),
      {
        name: 'Basic-store',
      },
    ),
  ),
);
