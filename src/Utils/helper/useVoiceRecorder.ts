import { useRef, useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useAudioStore } from '@/store/candidate/audio.store';
import { toast } from 'sonner';

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

export const useVoiceRecorder = (): UseVoiceRecorderResult => {
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

  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/mpeg'
    ];
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return null;
  };

  const startSpeechRecognition = async () => {
    await SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  const stopSpeechRecognition = async () => {
    await SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const startVoiceRecording = async () => {
    setIsRecording(true);
    setError(null);
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          channelCount: 1
        } 
      });
      
      mediaStreamRef.current = stream;
      
      const mimeType = getSupportedMimeType();
      if (!mimeType) {
        throw new Error('No supported MIME type found');
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      timerRef.current = setInterval(() => setSeconds(prev => prev + 1), 1000);

      mediaRecorderRef.current.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { 
          type: mimeType 
        });
        const url = URL.createObjectURL(recordedBlob);
        setAudioURL(url);
        recordedChunksRef.current = [];
        if (timerRef.current) clearInterval(timerRef.current);
      };

      mediaRecorderRef.current.start(1000); // Collect data every second
    } catch (error) {
      console.error('Recording error:', error);
      setError(error instanceof Error ? error : new Error('Recording failed'));
      toast.error('Error starting voice recording');
      resetRecording();
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
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

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    recordedChunksRef.current = [];
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetRecording();
    };
  }, []);

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
