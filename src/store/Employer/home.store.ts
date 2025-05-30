import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface HomeState {
  jobId: string;
  jobDescription: string;
  jobTitle: string;
  jobType: string;
  companyName: string;
  location: string;
  salary: string;
  salaryType: string;
  currency: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];

  setJobId: (value: string) => void;
  setJobDescription: (value: string) => void;
  setJobTitle: (value: string) => void;
  setJobType: (value: string) => void;
  setCompanyName: (value: string) => void;
  setLocation: (value: string) => void;
  setSalary: (value: string) => void;
  setSalaryType: (value: string) => void;
  setCurrency: (value: string) => void;
  setSkills: (value: string[]) => void;
  setResponsibilities: (value: string[]) => void;
  setRequirements: (value: string[]) => void;
}

const useHomeStore = create<HomeState>()(
  devtools(
    persist(
      (set) => ({
        jobId: '',
        jobDescription: '',
        jobTitle: '',
        jobType: '',
        companyName: '',
        location: '',
        salary: '',
        salaryType: '',
        currency: '',
        skills: [],
        responsibilities: [],
        requirements: [],

        setJobId: (value) => set({ jobId: value }),
        setJobDescription: (value) => set({ jobDescription: value }),
        setJobTitle: (value) => set({ jobTitle: value }),
        setJobType: (value) => set({ jobType: value }),
        setCompanyName: (value) => set({ companyName: value }),
        setLocation: (value) => set({ location: value }),
        setSalary: (value) => set({ salary: value }),
        setSalaryType: (value) => set({ salaryType: value }),
        setCurrency: (value) => set({ currency: value }),

        setSkills: (value) => set({ skills: value }),
        setResponsibilities: (value) => set({ responsibilities: value }),
        setRequirements: (value) => set({ requirements: value }),

        resetAIResponse: () =>
          set({
            jobId: '',
            jobDescription: '',
            jobTitle: '',
            jobType: '',
            companyName: '',
            location: '',
            salary: '',
            currency: '',
            skills: [],
            responsibilities: [],
            requirements: [],
          }),
      }),
      {
        name: 'Ai-Response',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useHomeStore;
