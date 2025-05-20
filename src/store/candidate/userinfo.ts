import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface CandidateInfoState {
  candidate_name: string;
  email: string;
  phone: string;
  image: File | null;
  job_id: string;

  setCandidateName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setImage: (image: File | null) => void;
  setJobId: (job_id: string) => void;
}

const useCandidateInfoStore = create<CandidateInfoState>()(
  devtools(
    persist(
      (set) => ({
        candidate_name: '',
        email: '',
        phone: '',
        image: null,
        job_id: '',
        setCandidateName: (name: string) => set({ candidate_name: name }),
        setEmail: (email: string) => set({ email }),
        setPhone: (phone: string) => set({ phone }),
        setImage: (image: File | null) => set({ image }),
        setJobId: (job_id: string) => set({ job_id }),
      }),
      {
        name: 'candidate-info',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
export default useCandidateInfoStore;
