import { useRecordingStore } from '@/store/candidate/Recording.store';
import { useState, useRef, RefObject } from 'react';
import { toast } from 'sonner';

interface UseVideoRecorderResult {
  isRecordingStream: boolean;
  recordedVideoURL: string | null;
  startUserCamera: () => void;
  stopUserCamera: () => void;
  userCameraRef: RefObject<HTMLVideoElement | null>;
  previewVideoRef: RefObject<HTMLVideoElement | null>;
  stopVideoRecording: () => Promise<void>;
  startVideoRecording: () => Promise<void>;
}

const useVideoRecording = (): UseVideoRecorderResult => {
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const [isRecordingStream, setIsRecordingStream] = useState(false);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const userCameraRef = useRef<HTMLVideoElement | null>(null);

  const startUserCamera = async (): Promise<MediaStream | null> => {
    try {
      console.log('Starting user camera...');
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      };

      const userStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (userCameraRef.current) {
        userCameraRef.current.srcObject = userStream;
      }
      mediaStreamRef.current = userStream;
      setIsRecordingStream(true);
      return userStream;
    } catch (error) {
      console.error('Camera access error:', error);
      toast.error('Could not access camera/microphone');
      return null;
    }
  };

  const stopUserCamera = (): void => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }

    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null;
    }

    if (userCameraRef.current) {
      userCameraRef.current.srcObject = null;
    }

    setIsRecordingStream(false);
  };

    const startVideoRecording = async () => {
      if (!mediaStreamRef.current) {
        toast.error('Camera is not started');
        return;
      }
  
      recordedChunksRef.current = [];
  
      try {
        mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {
          mimeType: 'video/webm; codecs=vp9',
        });
  
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };
  
        mediaRecorderRef.current.onstop = () => {
          const videoBlob = new Blob(recordedChunksRef.current, {
            type: 'video/webm',
          });
          const videoURL = URL.createObjectURL(videoBlob);
          setRecordedVideoURL(videoURL);
          useRecordingStore.getState().setVideoURL(videoURL);
          console.log('Recording complete. Video URL:', videoURL);
        };
  
        mediaRecorderRef.current.start();
      } catch (error) {
        console.log(error);
        toast.error('Error starting video recording');
      }
    };

  const stopVideoRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };
  return {
    isRecordingStream,
    recordedVideoURL,
    startUserCamera,
    stopUserCamera,
    previewVideoRef,
    userCameraRef,
    stopVideoRecording,
    startVideoRecording,
  };
};

export default useVideoRecording;
