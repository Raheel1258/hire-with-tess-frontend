import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DialogueProps {
  isPlaying: boolean;
  duration: number;

  setIsPlaying: (value: boolean) => void;
  setDuration: (value: number) => void;
}
const DialogueStore = create<DialogueProps>()(
  devtools((set) => ({
    isPlaying: false,
    duration: 0,
    currentlyPlayingId: null,

    setIsPlaying: (value) => set({ isPlaying: value }),
    setDuration: (value) => set({ duration: value }),

  }))
);

export default DialogueStore;
