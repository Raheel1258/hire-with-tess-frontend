import { useRef } from "react";
import useVideoRecording from "@/Utils/helper/useVideoRecording";
import useVoiceRecorder from "@/Utils/helper/useVoiceRecorder";
import { useRecordingStore } from "@/store/candidate/Recording.store";

const handleReset = () => {
      const previewVideoRef = useRef<HTMLVideoElement | null>(null);
      const userCameraRef = useRef<HTMLVideoElement | null>(null);
      const mediaStreamRef = useRef<MediaStream | null>(null);
      const recordedChunksRef = useRef<Blob[]>([]);
      const setIsRecordedVoiceURL = useRecordingStore.getState().setIsRecordedVoiceURL;
      const setRecordedVideoURL = useRecordingStore.getState().setRecordedVideoURL;
      const setRecordedBlobUrl = useRecordingStore.getState().setRecordedBlobUrl;
      const setSeconds = useRecordingStore.getState().setSeconds;
      const setIsPlaying = useRecordingStore.getState().setIsPlaying;
      const setIsVoiceRecording = useRecordingStore.getState().setIsVoiceRecording;
      const setIsRecordingStream = useRecordingStore.getState().setIsRecordingStream;
      const setActiveTool = useRecordingStore.getState().setActiveTool;
      const resetTranscript = useVoiceRecorder.getState().resetTranscript;
      const listening = useVoiceRecorder.getState().listening;
      const stopSpeechRecognition = useVoiceRecorder.getState().stopSpeechRecognition;
      const stopVoiceRecording = useVoiceRecorder.getState().stopVoiceRecording;
      const stopVideoRecording = useVideoRecording.getState().stopVideoRecording;
      const stopUserCamera = useVideoRecording.getState().stopUserCamera;
      
    const resetAllState = () => {
        if (listening) {
          stopSpeechRecognition();
        }
        stopVoiceRecording();
        stopVideoRecording();
        stopUserCamera();
    
        setIsRecordedVoiceURL('');
        setRecordedVideoURL(null);
        setRecordedBlobUrl(null);
    
        setSeconds(0);
        setIsPlaying(false);
        setIsVoiceRecording(false);
        setIsRecordingStream(false);
        setActiveTool(null);
    
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }
    
        if (previewVideoRef.current) {
          previewVideoRef.current.srcObject = null;
          previewVideoRef.current.src = '';
        }
    
        if (userCameraRef.current) {
          userCameraRef.current.srcObject = null;
        }
    
        recordedChunksRef.current = [];
        resetTranscript();
      };
}