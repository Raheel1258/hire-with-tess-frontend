import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DialogueProps {
  isPlaying: boolean;
  duration: number;
  isPause: boolean;
  currentlyPlayingId: string | null;

  setIsPlaying: (value: boolean) => void;
  setIsPause: (value: boolean) => void;
  setDuration: (value: number) => void;
  setCurrentlyPlayingId: (id: string | null) => void;
}

const DialogueStore = create<DialogueProps>()(
  devtools((set) => ({
    isPlaying: false,
    isPause: false,
    duration: 0,
    currentlyPlayingId: null,

    setIsPlaying: (value: boolean) => set({ isPlaying: value }),
    setIsPause: (value: boolean) => set({ isPause: value }),
    setDuration: (value: number) => set({ duration: value }),
    setCurrentlyPlayingId: (id: string | null) => set({ currentlyPlayingId: id }),
  }))
);

export default DialogueStore;
