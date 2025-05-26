import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import QuestionType from "@/Types/Employer/question.type";

interface QuestionStore {
  editedQuestions: QuestionType[];
  manualQuestion: boolean;
  Aiquestions: QuestionType[];
  newQuestionText: string;

  setNewQuestionText: (value: string) => void;
  setManualQuestion: (value: boolean) => void;
  setAiQuestions: (value: QuestionType[]) => void;
  setEditedQuestions: (questions: QuestionType[]) => void;
}

export const useQuestionStore = create<QuestionStore>()(
  devtools(
    persist(
      (set) => ({
        manualQuestion: false,
        editedQuestions: [],
        Aiquestions: [],
        newQuestionText: "",

        setNewQuestionText: (value) => set({ newQuestionText: value }),
        setManualQuestion: (value) => set({ manualQuestion: value }),
        setEditedQuestions: (edited) => set({ editedQuestions: edited }),
        setAiQuestions: (value) => set({ Aiquestions: value }),
      }),
      {
        name: "question-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          questions: state.Aiquestions,
        }),
      }
    )
  )
);
