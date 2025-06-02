import { create } from 'zustand';

interface AudioStore {
  audioURL: string;
  setAudioURL: (url: string) => void;

  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;

  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;

  isListening: boolean;
  setIsListening: (isListening: boolean) => void;

  seconds: number;
  setSeconds: (seconds: number) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audioURL: '',
  setAudioURL: (url) => set({ audioURL: url }),

  seconds: 0,
  setSeconds: (seconds) => set({ seconds }),

  isRecording: false,
  setIsRecording: (isRecording) => set({ isRecording }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  isListening: false,
  setIsListening: (isListening) => set({ isListening }),

  ResetAudioStore: () => set({
    audioURL: '',
    seconds: 0,
    isRecording: false,
    isPlaying: false,
    isListening: false,
  }),
}));
