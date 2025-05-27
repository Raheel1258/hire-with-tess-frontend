import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SkillState {
  skills: string[];
  isEditDescription: boolean;
  isEditable: boolean;
  isEditSkill: boolean;
  questions: string[];
  editableQuestionIndex: number | null;
  cancel: boolean;

  setCancel: (value: boolean) => void;
  setIsEditableDescription: (value: boolean) => void;
  setIsEditable: (value: boolean) => void;
  setIsEditableSkill: (value: boolean) => void;

  setSkills: (value: string[]) => void;
  removeSkills: (index: number) => void;

  setQuestions: (value: string[]) => void;
  setEditableQuestionIndex: (index: number | null) => void;
  updateQuestion: (index: number, value: string) => void;
}

export const useSkillStore = create<SkillState>()(
  devtools(
    persist((set) => ({
      skills: [],
      isEditable: false,
      isEditSkill: false,
      isEditDescription: false,

      questions: [],
      editableQuestionIndex: null,
      cancel: false,

      setCancel: (value: boolean) => set({ cancel: value }),
      setIsEditableDescription: (value) => set({ isEditDescription: value }),
      setIsEditable: (value) => set({ isEditable: value }),
      setIsEditableSkill: (value) => set({ isEditSkill: value }),

      setSkills: (value) => set({ skills: value }),
      removeSkills: (indexToRemove) =>
        set((state) => ({
          skills: state.skills.filter((_, index) => index !== indexToRemove),
        })),
      setQuestions: (value) => set({ questions: value }),
      setEditableQuestionIndex: (index) => set({ editableQuestionIndex: index }),
      updateQuestion: (index, value) =>
        set((state) => ({
          questions: state.questions.map((cq, i) => (i === index ? value : cq)),
        })),
    })),
    {
      name: 'skill-storage',
    }
  ),
);
