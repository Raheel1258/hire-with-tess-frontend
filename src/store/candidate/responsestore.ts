import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface SavedResponse {
  question_text: string;
  temp_url: string;
  content_type: string;
}

interface RecordingState {
  question_text: string;
  temp_url: string;
  content_type: string;
  savedResponses: SavedResponse[];

  setQuestionText: (val: string) => void;
  setTempUrl: (val: string) => void;
  setContent_type: (val: string) => void;
  addResponse: (response: SavedResponse) => void;
  getResponseByQuestion: (question: string) => SavedResponse | undefined;
}

export const useResponseStore = create<RecordingState>()(
  devtools(
    persist(
      (set, get) => ({
        question_text: '',
        temp_url: '',
        content_type: '',
        savedResponses: [],

        setQuestionText: (val) => set({ question_text: val }),
        setTempUrl: (val) => set({ temp_url: val }),
        setContent_type: (val) => set({ content_type: val }),

        addResponse: (response) => {
          const existing = get().savedResponses.filter(
            (r) => r.question_text !== response.question_text
          );
          set({ savedResponses: [...existing, response] });
        },

        getResponseByQuestion: (question) => {
          return get().savedResponses.find((r) => r.question_text === question);
        },
      }),
      {
        name: 'S3-Storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
