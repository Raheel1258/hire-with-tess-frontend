'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, MonitorUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import EnhancedButton from '@/app/interview/component/SpeechButton';
import RecordingControls from '@/app/interview/component/RecordingControls';
import Waveform from './Waveform';
import useVoiceRecorder from '@/Utils/helper/useVoiceRecorder';
import useUploadFileMutation from '@/Routes/Client/hook/POST/UploadFilehook';
import { useResponseStore } from '@/store/candidate/responsestore';
import { startScreenShare } from '@/Utils/helper/useScreenSharing';

type SpeechRecordingInputProps = {
  placeholder?: string;

  onSaveAndContinue: (
    transcript: string,
    currentquestion: string,
    audioURL: string | null,
  ) => void;
};

const SpeechRecordingInput: React.FC<SpeechRecordingInputProps> = ({
  placeholder = 'Your response will appear here as you speak...',
  onSaveAndContinue,
}) => {
  const { hasRecorded, setIsPlaying } = useRecordingStore();

  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [ScreenShareUrl, setScreenShareUrl] = useState<string | null>(null);
  const [AudioUrl, setAudioUrl] = useState('');

  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeTool, setActiveTool] = useState<'mic' | 'screen' | null>(null);

  const audioStream = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const mediaStreamRef = useRef<MediaStream | null>(null);

  const { mutate: uploadFile } = useUploadFileMutation();

  const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { transcript, startSpeechRecognition, stopSpeechRecognition, listening,resetRecording } =
    useVoiceRecorder();

  const [inputTranscript, setInputTranscript] = useState('');

  const startVoiceRecording = async () => {
    setIsVoiceRecording(true);
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioStream.current = new MediaRecorder(stream);
      audioStream.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      const timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      audioStream.current.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(recordedBlob);
        setAudioUrl(url);
        useRecordingStore.getState().setAudioURL(url);
        recordedChunksRef.current = [];
        clearTimeout(timer);
      };
      audioStream.current.start();
    } catch (error) {
      toast.error('Error starting voice recording');
    }
  };
  const stopVoiceRecording = () => {
    setIsVoiceRecording(false);
    if (audioStream.current) {
      audioStream.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleSpeechRecognition = async () => {
    if (listening) {
      stopVoiceRecording();
      await stopSpeechRecognition();
      setActiveTool(null);
    } else {
      resetTranscript();
      setInputTranscript('');
      await startSpeechRecognition();
      startVoiceRecording();
      setActiveTool('mic');
    }
  };

  const setupMediaRecorder = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    audioStream.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const screenURL = URL.createObjectURL(videoBlob);
      setScreenShareUrl(screenURL);
      useRecordingStore.getState().setScreenURL(screenURL);
      setIsRecordingStream(false);
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

    recordedChunksRef.current = [];
    setupMediaRecorder(screenStream);
    setIsRecordingStream(true);
  };

  const handleSaveAndContinue = async () => {
    const { activeType, audioURL, screenURL, currentquestion, interviewId } =
      useRecordingStore.getState();

    let fileUrl = '';
    if (activeType === 'audio') fileUrl = audioURL;
    else if (activeType === 'screen') fileUrl = screenURL;

    if (!fileUrl || !currentquestion || !interviewId) {
      toast.error('Missing required data');
      return;
    }

    const blob = await fetch(fileUrl).then((res) => res.blob());

    const formData = new FormData();
    formData.append('question_text', currentquestion);
    formData.append('answer_file', blob, `${activeType}-answer.webm`);

    uploadFile(
      { interview_id: interviewId, data: formData },
      {
        onSuccess: (response) => {
          const newEntry = {
            question_text: currentquestion,
            temp_url: response?.temp_url || fileUrl,
            content_type: blob.type,
          };
          setInputTranscript('');
          useResponseStore.getState().addResponse(newEntry);
          onSaveAndContinue(currentquestion, fileUrl, transcript || '');
        },
      },
    );
  };

  useEffect(() => {
    if (transcript) {
      setInputTranscript(transcript);
    }
  }, [transcript]);

  const setActiveType = useRecordingStore.getState().setActiveType;

  const resetAllState = () => {
    if (listening) {
      stopSpeechRecognition();
    }
    stopVoiceRecording();

    setAudioUrl('');
    setScreenShareUrl(null);

    setSeconds(0);
    setIsPlaying(false);
    setIsVoiceRecording(false);
    setIsRecordingStream(false);
    setActiveTool(null);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    recordedChunksRef.current = [];
    resetTranscript();
    setInputTranscript('');
    useResponseStore.getState().clearResponses();
  };

  const handleRestartRecording = async () => {
    if (audioStream.current) {
      audioStream.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
    resetRecording();
    setInputTranscript('');
    setAudioUrl('');
    setScreenShareUrl(null);
    setSeconds(0);
    setIsPlaying(false);
    setIsVoiceRecording(false);
    setIsRecordingStream(false);
    setActiveTool(null);
    recordedChunksRef.current = [];
    resetTranscript();
    stopSpeechRecognition();
    setInputTranscript('');            
  };

  const getRecordAgainLabel = () => {
    if (ScreenShareUrl) return 'Share Again';
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
      disabled: isVoiceRecording,
      disabledTitle: 'Recording...',
      disabledIcon: <MicOff className="w-4 h-4" />,
      disabledColor: 'bg-gray-200',
      disabledTextColor: 'text-gray-500',
      disabledBorderColor: 'border-gray-200',
      disabledBorderWidth: 'border-2',
      disabledBorderRadius: 'rounded-full',
      disabledBorderStyle: 'solid',
      disabledBorderOpacity: 'opacity-50',
      disabledBorderShadow: 'shadow-none',
      disabledBorderShadowColor: 'shadow-gray-200',
      icon: <Mic />,
      title: 'Listening...',
    },
    {
      key: 'screen',
      condition: isRecordingStream,
      onClick: () => {
        setActiveType('screen');
        startScreenRecording();
      },
      icon: <MonitorUp />,
      disabled: isRecordingStream,
      disabledTitle: 'Recording...',
      disabledIcon: <MonitorUp className="w-4 h-4" />,
      disabledColor: 'bg-gray-200',
      disabledTextColor: 'text-gray-500',
      disabledBorderColor: 'border-gray-200',
      disabledBorderWidth: 'border-2',
      disabledBorderRadius: 'rounded-full',
      disabledBorderStyle: 'solid',
      disabledBorderOpacity: 'opacity-50',
      disabledBorderShadow: 'shadow-none',
      disabledBorderShadowColor: 'shadow-gray-200',
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
        value={inputTranscript}
        disabled
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeholder}
        onChange={(e) => {
          console.log("e.target.value",e.target.value)
          setInputTranscript(e.target.value);
          if (e.target.value === '') {
            resetTranscript();
            startSpeechRecognition();
          }
          if (listening) {
            stopSpeechRecognition();
            resetTranscript();
            startSpeechRecognition();
          }
        }}
        className="w-full rounded-2xl"
        readOnly
      />

      {/* Media Player Section - Audio, Video, or Screen Recording */}
      {(AudioUrl || ScreenShareUrl) && (
        <div className="space-y-4">
          {/* Audio Player */}
          {AudioUrl && (
            <div className="rounded-full p-3 border shadow-xl">
              <div className="flex items-center gap-2 w-full">
                <Waveform recordedVoiceURL={AudioUrl} seconds={seconds} />
              </div>
            </div>
          )}

          {/* Screen Recording Player */}
          {ScreenShareUrl && (
            <video
              src={ScreenShareUrl}
              className="w-full h-auto rounded-xl"
              controls
              autoPlay
              playsInline
            />
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
      {!hasRecorded && !AudioUrl && !ScreenShareUrl && activeTool !== 'screen' && (
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
    </div>
  );
};
export default SpeechRecordingInput;
