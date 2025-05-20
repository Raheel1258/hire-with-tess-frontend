'use client';
import React, { useRef, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MonitorUp, Video } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import EnhancedButton from '@/app/interview/component/SpeechButton';
import RecordingControls from '@/app/interview/component/RecordingControls';
import Waveform from './Waveform';
import useVoiceRecorder from '@/Utils/helper/useVoiceRecorder';
import useScreenSharing from '@/Utils/helper/useScreenSharing';
import useVideoRecording from '@/Utils/helper/useVideoRecording';
import useMediaRecorder from '@/Utils/helper/mediarecorder';
import useUploadFileMutation from '@/Routes/Client/hook/POST/UploadFilehook';
import { useResponseStore } from '@/store/candidate/responsestore';

type SpeechRecordingInputProps = {
  placeholder?: string;
  jobId: string;
  index: number;
  onSaveAndContinue: (transcript: string, currentquestion: string, audioURL: string | null,) => void;
};

const SpeechRecordingInput: React.FC<SpeechRecordingInputProps> = ({
  placeholder = 'Your response will appear here as you speak...',
  onSaveAndContinue, 
}) => {
  const { hasRecorded, setIsPlaying } = useRecordingStore();

  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [recordedVoiceURL, setIsRecordedVoiceURL] = useState('');
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeTool, setActiveTool] = useState<'mic' | 'video' | 'screen' | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const userCameraRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const { mutate: uploadFile } = useUploadFileMutation();

  const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { transcript, startSpeechRecognition, stopSpeechRecognition, listening } = useVoiceRecorder();
  // const { startScreenShare } = useScreenSharing();
  const { stopVideoRecording } = useVideoRecording();


  
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
      toast.error("Error starting voice recording");
    }
  };
  const stopVoiceRecording = () => {
    setIsVoiceRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleSpeechRecognition = async () => {
    if (listening) {
      stopVoiceRecording();
      await stopSpeechRecognition();
      setActiveTool(null);
    } else {
      await startSpeechRecognition();
      startVoiceRecording();
      setActiveTool('mic');
    }
  };

  const startUserCamera = async (): Promise<MediaStream | null> => {
    try {
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
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      toast.error('Error starting video recording');
    }
  };

  const toggleUserCamera = async () => {
    if (isRecordingStream) {
      await stopVideoRecording();
      stopUserCamera();
      setActiveTool(null);
    } else {
      setActiveTool('video');
      const stream = await startUserCamera() as MediaStream | null;
      if (stream) {
        await startVideoRecording();
      }
    }
  };
  const screenShareOptions = {
    video: {
      displaySurface: 'browser',
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      suppressLocalAudioPlayback: true,
    },
    preferCurrentTab: false,
    selfBrowserSurface: 'exclude',
    systemAudio: 'include',
    surfaceSwitching: 'include',
    monitorTypeSurfaces: 'include',
  };
  const startScreenShare = async (): Promise<MediaStream | null> => {
    try {
      return await navigator.mediaDevices.getDisplayMedia(screenShareOptions);
    } catch (error) {
      return null;
    }
  };
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
      recordedChunksRef.current = [];
    };

    recorder.start();
  };
  const startScreenRecording = async () => {
    const screenStream = await startScreenShare();

    if (!screenStream) {
      resetAllState();
      return;
    }
    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = screenStream;
    }

    recordedChunksRef.current = [];
    setupMediaRecorder(screenStream);
    setIsRecordingStream(true);
  };


  const handleSaveAndContinue = async () => {
    const { activeType, audioURL, videoURL, screenURL, currentquestion, interviewId } = useRecordingStore.getState();

    let fileUrl = '';
    if (activeType === 'audio') fileUrl = audioURL;
    else if (activeType === 'video') fileUrl = videoURL;
    else if (activeType === 'screen') fileUrl = screenURL;

    if (!fileUrl || !currentquestion || !interviewId) {
      toast.error('Missing required data');
      return;
    }

    const blob = await fetch(fileUrl).then((res) => res.blob());

    const formData = new FormData();
    formData.append('question_text', currentquestion);
    formData.append('answer_file', blob, `${activeType}-answer.webm`);

    uploadFile({ interview_id: interviewId, data: formData },
      {
        onSuccess: (response) => {
          const savedResponses = JSON.parse(localStorage.getItem('savedResponses') || '[]');
          const newEntry = {
            question_text: currentquestion,
            temp_url: response?.temp_url || fileUrl,
            content_type: blob.type,
          };
          useResponseStore.getState().addResponse(newEntry);
          onSaveAndContinue(currentquestion, fileUrl, transcript || '');

        },
      }
    );

  };


  const setActiveType = useRecordingStore.getState().setActiveType;

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

  const handleRestartRecording = async () => {
    resetAllState();
  };

  const getRecordAgainLabel = () => {
    if (recordedBlobUrl) return 'Share Again';
    return 'Record Again';
  };

  const tools = [
    {
      key: 'mic',
      condition: listening,
      onClick: () => {
        setActiveType('audio');
        toggleSpeechRecognition();
      },
      icon: <Mic />,
      title: 'Listening...',
    },
    {
      key: 'video',
      condition: isRecordingStream,
      onClick: () => {
        setActiveType('video');
        toggleUserCamera();
      },
      icon: <Video />,
      title: 'Recording...',
    },
    {
      key: 'screen',
      condition: isRecordingStream,
      onClick: () => {
        setActiveType('screen');
        startScreenRecording();
      },
      icon: <MonitorUp />,
      title: 'Sharing...',
    },
  ];

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="w-full">
        <div>
          <Skeleton className="w-full h-10 mb-4" />
        </div>
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className=" flex flex-col mt-8 items-center justify-center">
          <Skeleton className="w-20 h-20 rounded-full z-10 relative" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full space-y-4">
      {/* Transcript Textarea */}
      <Textarea
        rows={6}
        value={transcript}
        placeholder={placeholder}
        className="w-full rounded-2xl"
        readOnly
      />

      {/* Media Player Section - Audio, Video, or Screen Recording */}
      {(recordedVoiceURL || recordedVideoURL || recordedBlobUrl) && (
        <div className="space-y-4">
          {/* Audio Player */}
          {recordedVoiceURL && (
            <div className="rounded-full p-3 border shadow-xl">
              <div className="flex items-center gap-2 w-full">
                <Waveform recordedVoiceURL={recordedVoiceURL} seconds={seconds} />
              </div>
            </div>
          )}

          {/* Video Player */}
          {recordedVideoURL && (
            <video src={recordedVideoURL} controls className="w-full h-auto rounded-xl" />
          )}

          {/* Screen Recording Player */}
          {recordedBlobUrl && (
            <video src={recordedBlobUrl} controls className="w-full h-auto rounded-xl" />
          )}

          {/* Common Recording Controls */}
          <RecordingControls
            onRecordAgain={handleRestartRecording}
            onSaveAndContinue={handleSaveAndContinue}
            recordAgainLabel={getRecordAgainLabel()}
          />
        </div>
      )}

      {/* Recording Tool Buttons */}
      {!hasRecorded &&
        !recordedVoiceURL &&
        !recordedBlobUrl &&
        !recordedVideoURL &&
        activeTool !== 'screen' && (
          <div className="flex justify-center gap-2 mt-12">
            {activeTool
              ? tools
                .filter((tool) => tool.key === activeTool)
                .map((tool) => (
                  <EnhancedButton
                    key={tool.key}
                    action={tool.condition}
                    onClick={tool.onClick}
                    icon={tool.icon}
                    defaultTitle=""
                    onpressTitle={tool.title}
                  />
                ))
              : tools.map((tool) => (
                <EnhancedButton
                  key={tool.key}
                  action={false}
                  onClick={tool.onClick}
                  icon={tool.icon}
                  defaultTitle=""
                  onpressTitle={tool.title}
                />
              ))}
          </div>
        )}

      {activeTool === 'video' && (
        <div className=" z-10 transition-all duration-300 ease-in-out">
          <div className="relative group">
            <div className="w-70% h-50% rounded-xl overflow-hidden shadow-2xl border-2 bg-transparent">
              <video
                ref={userCameraRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 pointer-events-none" />
              {isRecordingStream && (
                <div className="absolute top-3 left-3 flex items-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  <span className="ml-2 text-xs font-medium text-white">REC</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SpeechRecordingInput;
