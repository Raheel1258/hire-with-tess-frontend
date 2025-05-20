import { useRecordingStore } from "@/store/candidate/Recording.store";
import { useRef, useState } from "react";

const useMediaRecorder = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);

  const setupMediaRecorder = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const videoBlob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const screenURL = URL.createObjectURL(videoBlob);
      setRecordedBlobUrl(screenURL);
      useRecordingStore.getState().setScreenURL(screenURL);
      recordedChunksRef.current = []; // Clear chunks
    };

    recorder.start();
  };

  const stopMediaRecorder = () => {
    mediaRecorderRef.current?.stop();
  };

  return {
    setupMediaRecorder,
    stopMediaRecorder,
    recordedBlobUrl,
    mediaRecorderRef,
    recordedChunksRef,
  };
};

export default useMediaRecorder;
