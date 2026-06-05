'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, MonitorUp } from 'lucide-react';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import EnhancedButton from '@/app/interview/component/SpeechButton';
import RecordingControls from '@/app/interview/component/RecordingControls';
import Waveform from './Waveform';
import useVoiceRecorder from '@/Utils/helper/useVoiceRecorder';
import useUploadFileMutation from '@/Routes/Client/hook/POST/UploadFilehook';
import { useResponseStore } from '@/store/candidate/responsestore';
// import { startScreenShare } from '@/Utils/helper/useScreenSharing';
import RecordingSkelton from './recordingskelton';

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

  // States
  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [ScreenShareUrl, setScreenShareUrl] = useState<string | null>(null);
  const [AudioUrl, setAudioUrl] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeTool, setActiveTool] = useState<'mic' | 'screen' | null>(null);
  const [inputTranscript, setInputTranscript] = useState('');
  const [recordedPeaks, setRecordedPeaks] = useState<number[][] | undefined>(undefined);


  const handleDecoded = useCallback((peaks: number[][], dur: number) => {
    setRecordedPeaks(peaks);
    if (Number.isFinite(dur) && dur > 0) {
      setSeconds(Math.round(dur));
    }
  }, []);

  // Refs
  const audioStream = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Hooks
  const { hasRecorded, setIsPlaying, setActiveType, } = useRecordingStore();
  const { mutate: uploadFile, isPending: isUploading } = useUploadFileMutation();
  const { resetTranscript } = useSpeechRecognition();
  const { transcript, startSpeechRecognition, stopSpeechRecognition, listening, resetRecording } = useVoiceRecorder();



  useEffect(() => {
    resetTranscript();
    setInputTranscript('');
  }, [resetTranscript]);

  // Update transcript
  useEffect(() => {
    if (transcript) {
      setInputTranscript(transcript);
    }
  }, [transcript]);


  const startVoiceRecording = async () => {
    setIsVoiceRecording(true);
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 48000,
          sampleSize: 16,
        },
      });
      mediaStreamRef.current = stream;

      const preferredMimeType = 'audio/webm;codecs=opus';
      const recorderOptions: MediaRecorderOptions = { audioBitsPerSecond: 128000 };
      if (
        typeof MediaRecorder !== 'undefined' &&
        MediaRecorder.isTypeSupported?.(preferredMimeType)
      ) {
        recorderOptions.mimeType = preferredMimeType;
      }

      audioStream.current = new MediaRecorder(stream, recorderOptions);
      audioStream.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      const timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      audioStream.current.onstop = () => {
        const blobType = audioStream.current?.mimeType || 'audio/webm';
        const recordedBlob = new Blob(recordedChunksRef.current, { type: blobType });
        const url = URL.createObjectURL(recordedBlob);
        setAudioUrl(url);
        useRecordingStore.getState().setAudioURL(url);
        recordedChunksRef.current = [];
        clearTimeout(timer);
      };
      audioStream.current.start();
    } catch (error) {
      toast.error('Error starting voice recording', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
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



  // const setupMediaRecorder = (stream: MediaStream) => {
  //   const recorder = new MediaRecorder(stream, {
  //     mimeType: 'video/webm;codecs=vp9',
  //     videoBitsPerSecond: 2500000
  //   });
  //   audioStream.current = recorder;

  //   recorder.ondataavailable = (event) => {
  //     if (event.data.size > 0) {
  //       recordedChunksRef.current.push(event.data);
  //     }
  //   };

  //   recorder.onstop = () => {
  //     const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
  //     const screenURL = URL.createObjectURL(videoBlob);
  //     setScreenShareUrl(screenURL);
  //     useRecordingStore.getState().setScreenURL(screenURL);
  //     setIsRecordingStream(false);
  //     recordedChunksRef.current = [];
  //   };

  //   recorder.start();
  // };

  // const startScreenRecording = async () => {
  //   const screenStream = await startScreenShare();

  //   if (!screenStream) {
  //     resetAllState();
  //     return;
  //   }

  //   recordedChunksRef.current = [];
  //   setupMediaRecorder(screenStream);
  //   setIsRecordingStream(true);
  // };

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
    const fileType = activeType === 'audio' ? 'audio/mp3' : 'video/webm';
    const fileExtension = activeType === 'audio' ? 'mp3' : 'webm';

    const formData = new FormData();
    formData.append('question_text', currentquestion);
    formData.append('answer_file', blob, `${activeType}-answer.${fileExtension}`);

    uploadFile(
      { interview_id: interviewId, data: formData },

      {
        onSuccess: (response) => {
          const newEntry = {
            question_text: currentquestion,
            temp_url: response?.temp_url || fileUrl,
            content_type: fileType,
            seconds,
            peaks: recordedPeaks,
          };

          setInputTranscript('');
          useResponseStore.getState().addResponse(newEntry);
          onSaveAndContinue(currentquestion, fileUrl, transcript || '');
        },
      },
    );
  };


  // const resetAllState = () => {
  //   if (listening) {
  //     stopSpeechRecognition();
  //   }
  //   stopVoiceRecording();

  //   setAudioUrl('');
  //   setScreenShareUrl(null);
  //   setRecordedPeaks(undefined);

  //   setSeconds(0);
  //   setIsPlaying(false);
  //   setIsVoiceRecording(false);
  //   setIsRecordingStream(false);
  //   setActiveTool(null);

  //   if (mediaStreamRef.current) {
  //     mediaStreamRef.current.getTracks().forEach((track) => track.stop());
  //     mediaStreamRef.current = null;
  //   }

  //   recordedChunksRef.current = [];
  //   resetTranscript();
  //   setInputTranscript('');
  // };

  const handleRestartRecording = async () => {
    if (audioStream.current) {
      audioStream.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
    resetRecording();
    setInputTranscript('');
    setAudioUrl('');
    setScreenShareUrl(null);
    setRecordedPeaks(undefined);
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
      icon: <Mic />,
      title: 'Stop Recording',
    },
    // {
    //   key: 'screen',
    //   condition: isRecordingStream,
    //   onClick: () => {
    //     setActiveType('screen');
    //     startScreenRecording();
    //   },
    //   icon: <MonitorUp />,
    //   title: 'Sharing...',
    // },
  ];

  RecordingSkelton();

  return (
    <div className="relative w-full space-y-4">
      {/* Transcript Textarea */}
      <Textarea
        rows={6}
        value={inputTranscript}
        disabled
        autoFocus
        placeholder={placeholder}
        onChange={(e) => {
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

      {/* Media Player Section - Audio, or Screen Recording */}
      {(AudioUrl || ScreenShareUrl) && (
        <div className="space-y-4">
          {/* Audio Player */}
          {AudioUrl && (
            <div className="rounded-2xl sm:rounded-full p-2 sm:p-3 border shadow-xl">
              <div className="flex items-center gap-2 w-full">
                <Waveform
                  recordedVoiceURL={AudioUrl}
                  seconds={seconds}
                  onDecoded={handleDecoded}
                />
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
            isSubmitting={isUploading}
          />
        </div>
      )}

      {/* Recording  Buttons */}
      {!hasRecorded && !AudioUrl && !ScreenShareUrl && activeTool !== 'screen' && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 w-full">
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
