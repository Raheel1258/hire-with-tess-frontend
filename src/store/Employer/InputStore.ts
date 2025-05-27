import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SkillState {
  skills: string[];
  responsbility: string;
  requirment: string;
  newSkill: string;
  showNewSkillInput: boolean;

  isEditDescription: boolean;
  isEditable: boolean;
  isEditSkill: boolean;
  questions: string[];
  editableQuestionIndex: number | null;
  cancel: boolean;

  setIseditableSkill: (value: string[]) => void;
  setIseditableResponsibility: (value: string) => void;
  setIseditableRequirment: (value: string) => void;

  setCancel: (value: boolean) => void;
  setIsEditableDescription: (value: boolean) => void;
  setIsEditable: (value: boolean) => void;
  setIsEditableSkill: (value: boolean) => void;

  setSkills: (value: string[]) => void;
  setNewSkill: (value: string) => void;
  setShowNewSkillInput: (value: boolean) => void;
  removeSkills: (index: number) => void;

  setQuestions: (value: string[]) => void;
  setEditableQuestionIndex: (index: number | null) => void;
  updateQuestion: (index: number, value: string) => void;
}

export const useSkillStore = create<SkillState>()(
  devtools(
    persist((set) => ({
      skills: [],
      newSkill: "",
      showNewSkillInput: false,
      requirment: "",
      responsbility: "",

      isEditable: false,
      isEditSkill: false,
      isEditDescription: false,

      questions: [],
      editableQuestionIndex: null,
      cancel: false,

      setIseditableRequirment: (value) => ({ requirment: value }),
      setIseditableResponsibility: (value) => ({ responsbility: value }),
      setIseditableSkill: (value) => ({ skills: value }),

      setCancel: (value) => set({ cancel: value }),
      setIsEditableDescription: (value) => set({ isEditDescription: value }),
      setIsEditable: (value) => set({ isEditable: value }),
      setIsEditableSkill: (value) => set({ isEditSkill: value }),

      setSkills: (value) => set({ skills: value }),
      setNewSkill: (value) => set({ newSkill: value }),
      setShowNewSkillInput: (value) => set({ showNewSkillInput: value }),
      removeSkills: (indexToRemove) =>
        set((state) => ({
          skills: state.skills.filter((_, index) => index !== indexToRemove),
        })),
      setQuestions: (value) => set({ questions: value }),
      setEditableQuestionIndex: (index) =>
        set({ editableQuestionIndex: index }),
      updateQuestion: (index, value) =>
        set((state) => ({
          questions: state.questions.map((cq, i) => (i === index ? value : cq)),
        })),
    })),
    {
      name: "skill-storage",
    }
  )
);
