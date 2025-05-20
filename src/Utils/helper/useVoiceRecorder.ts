import { useRecordingStore } from '@/store/candidate/Recording.store';
import { useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface UseVoiceRecorderResult {
  isRecording: boolean;
  recordedVoiceURL: string | null;
  seconds: number;
  transcript: string;
  listening: boolean;
  startVoiceRecording: () => Promise<void>;
  stopVoiceRecording: () => void;
  resetRecording: () => void;
  error: Error | null;
  startSpeechRecognition: () => Promise<void>;
  stopSpeechRecognition: () => Promise<void>;
}

const useVoiceRecorder = (): UseVoiceRecorderResult => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [error, setError] = useState<Error | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [recordedVoiceURL, setIsRecordedVoiceURL] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const startSpeechRecognition = async () => {
    await SpeechRecognition.startListening({ continuous: true });
  };
  const stopSpeechRecognition = async () => {
    await SpeechRecognition.stopListening();
  };

  const startVoiceRecording = async () => {
    setIsVoiceRecording(true);
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      const timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      mediaRecorderRef.current.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(recordedBlob);
        setIsRecordedVoiceURL(url);
        useRecordingStore.getState().setAudioURL(url);
        recordedChunksRef.current = [];
        clearTimeout(timer);
      };
      mediaRecorderRef.current.start();
    } catch (error) {
      console.log(error);
    }
  };
  const stopVoiceRecording = () => {
    setIsVoiceRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
  };

  const resetRecording = () => {
    resetTranscript();
    stopVoiceRecording();
    if (recordedVoiceURL) {
      URL.revokeObjectURL(recordedVoiceURL);
    }
    setIsRecordedVoiceURL('');
    setSeconds(0);
    setError(null);
    resetTranscript();
    stopVoiceRecording();
  };

  return {
    isRecording,
    recordedVoiceURL,
    seconds,
    transcript,
    listening,
    startVoiceRecording,
    stopVoiceRecording,
    resetRecording,
    startSpeechRecognition,
    stopSpeechRecognition,
    error,
  };
};

export default useVoiceRecorder;
