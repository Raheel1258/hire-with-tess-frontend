import { useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useAudioStore } from '@/store/candidate/audio.store';

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

  const {
    audioURL,
    setAudioURL,
    isRecording,
    setIsRecording,
    seconds,
    setSeconds,
    setIsListening,
  } = useAudioStore();

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSpeechRecognition = async () => {
    await SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  const stopSpeechRecognition = async () => {
    await SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const startVoiceRecording = async () => {
    try {
      setSeconds(0);
      setIsRecording(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start();

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error as Error);
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    resetTranscript();
    stopVoiceRecording();

    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    setAudioURL('');
    setSeconds(0);
    setError(null);
  };

  return {
    isRecording,
    recordedVoiceURL: audioURL,
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
