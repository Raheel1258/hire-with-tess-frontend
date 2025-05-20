import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface ResponseData {
  transcript: string;
  type: 'audio' | 'video' | 'screen';
  url: string;
  question: string;
}

interface RecordingState {
  isListening: boolean;
  isRecording: boolean;
  isPlaying: boolean;

  // Recorded URLs
  audioURL: string;
  videoURL: string;
  screenURL: string;

  // Recording info
  hasRecorded: boolean;
  audioData: number[];
  activeType: 'audio' | 'video' | 'screen';

  // Stored answers by question
  storedResponses: { questionId: string; response: ResponseData }[];
  interviewId: string;
  currentquestion: string;

  // Actions
  setIsListening: (val: boolean) => void;
  setIsRecording: (val: boolean) => void;
  setIsPlaying: (val: boolean) => void;

  setAudioURL: (url: string) => void;
  setVideoURL: (url: string) => void;
  setScreenURL: (url: string) => void;

  setHasRecorded: (val: boolean) => void;
  setAudioData: (data: number[]) => void;

  setInterviewId: (id: string) => void;

  setActiveType: (type: 'audio' | 'video' | 'screen') => void;
  saveResponse: (questionId: string, response: ResponseData) => void;
  setCurrentQuestion: (questionId: string) => void;
}

export const useRecordingStore = create<RecordingState>()(
  devtools(
    persist(
      (set) => ({
        isListening: false,
        isRecording: false,
        isPlaying: false,

        audioURL: '',
        videoURL: '',
        screenURL: '',

        hasRecorded: false,
        audioData: [],
        activeType: 'audio',

        storedResponses: [],
        interviewId: '',
        currentquestion: '',

        setIsListening: (val) => set({ isListening: val }),
        setIsRecording: (val) => set({ isRecording: val }),
        setIsPlaying: (val) => set({ isPlaying: val }),

        setAudioURL: (url) => set({ audioURL: url }),
        setVideoURL: (url) => set({ videoURL: url }),
        setScreenURL: (url) => set({ screenURL: url }),

        setHasRecorded: (val) => set({ hasRecorded: val }),
        setAudioData: (data) => set({ audioData: data }),
        setActiveType: (type) => set({ activeType: type }),

        setInterviewId: (id: string) => set({ interviewId: id }),
        setCurrentQuestion: (questionId: string) => set({ currentquestion: questionId }),

        saveResponse: (questionId, response) => {
          set((state) => ({
            storedResponses: [
              ...state.storedResponses.filter(
                (response) => response.questionId !== questionId,
              ),
              { questionId, response },
            ],
          }));
        },
      }),
      {
        name: 'Recording-storage',
        storage: createJSONStorage(() => localStorage),

        // Only persist Responses
        partialize: (state) => ({
          storedResponses: state.storedResponses,
          interviewId: state.interviewId,
          currentquestion: state.currentquestion,
        }),
      },
    ),
  ),
);
