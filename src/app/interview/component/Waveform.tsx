'use client'
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CirclePause, CirclePlay } from 'lucide-react';
import DialogueStore from '@/store/EmployeeDashboard/dashboard/overview/dialoguewave';

interface WaveformProps {
  recordedVoiceURL: string;
  seconds?: number;
  peaks?: number[][];
  onDecoded?: (peaks: number[][], duration: number) => void;
  onReady?: () => void;
}

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Keep track of all active wavesurfer instances
const activeWavesurfers = new Map<string, WaveSurfer>();

const Waveform: React.FC<WaveformProps> = ({
  recordedVoiceURL = '',
  seconds,
  peaks,
  onDecoded,
  onReady,
}) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  // Seed the display with the duration measured during recording, so the time
  // shows correctly even when wavesurfer can't read it from the audio file.
  const [duration, setDuration] = useState(seconds ?? 0);

  const {
    isPlaying,
    currentlyPlayingId,
    setIsPlaying,
    setCurrentlyPlayingId,
  } = DialogueStore();

  useEffect(() => {
    if (!recordedVoiceURL || !waveformRef.current) return;

    const hasPeaks = Array.isArray(peaks) && peaks.length > 0;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      cursorWidth: 1,
      cursorColor: 'transparent',
      // When we already have peaks, use the MediaElement backend so playback
      // streams the URL directly (no decode/CORS needed). Without peaks (record
      // page, local blob) use WebAudio so we can decode and export the peaks.
      backend: hasPeaks ? 'MediaElement' : 'WebAudio',
      height: 40,
      waveColor: '#C4C4C4',
      progressColor: '#1e4b8e',
      url: recordedVoiceURL,
      normalize: true,
      // Render from precomputed peaks instead of decoding the remote file.
      ...(hasPeaks ? { peaks, duration: seconds } : {}),
    });

    wavesurferRef.current = wavesurfer;
    activeWavesurfers.set(recordedVoiceURL, wavesurfer);

    // Show clip duration. MediaRecorder blobs often lack duration metadata, so
    // getDuration() can return 0 or Infinity — in that case keep the measured
    // `seconds` fallback instead of overwriting it with a bad value.
    wavesurfer.on('ready', () => {
      const wsDuration = wavesurfer.getDuration();
      if (Number.isFinite(wsDuration) && wsDuration > 0) {
        setDuration(wsDuration);
      }
      // On the record page (no incoming peaks) export the freshly decoded peaks
      // so the caller can persist them for the review page.
      if (!hasPeaks && onDecoded) {
        try {
          const exported = wavesurfer.exportPeaks({ channels: 1, maxLength: 200 });
          const dur =
            Number.isFinite(wsDuration) && wsDuration > 0 ? wsDuration : seconds ?? 0;
          onDecoded(exported, dur);
        } catch {
          // exportPeaks unsupported / decode failed — keep the seconds fallback
        }
      }
      onReady?.();
    });
    wavesurfer.on('audioprocess', () => {
      setDuration(wavesurfer.getCurrentTime());
    });

    wavesurfer.on('play', () => {
      // Stop all other wavesurfers
      activeWavesurfers.forEach((ws, url) => {
        if (url !== recordedVoiceURL && ws.isPlaying()) {
          ws.pause();
        }
      });
      setIsPlaying(true);
      setCurrentlyPlayingId(recordedVoiceURL);
    });
    wavesurfer.on('pause', () => {
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
    });
    wavesurfer.on('finish', () => {
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
    });

    return () => {
      wavesurfer.destroy();
      wavesurferRef.current = null;
      activeWavesurfers.delete(recordedVoiceURL);
    };
  }, [recordedVoiceURL, peaks, seconds, onDecoded, setIsPlaying, setDuration, setCurrentlyPlayingId, onReady]);

  const togglePlayback = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;

    // If another audio is playing, stop it first
    if (currentlyPlayingId && currentlyPlayingId !== recordedVoiceURL) {
      const currentWavesurfer = activeWavesurfers.get(currentlyPlayingId);
      if (currentWavesurfer) {
        currentWavesurfer.pause();
      }
    }

    ws.playPause();
  };

  const isThisAudioPlaying = currentlyPlayingId === recordedVoiceURL && isPlaying;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        <div ref={waveformRef} className="flex-1 min-w-0" />
        <span className="text-[#1e4b8e] min-w-[50px] text-center">
          {duration ? formatTime(duration) : '00:00'}
        </span>
        <button
          onClick={togglePlayback}
          className="p-1"
          aria-label={isThisAudioPlaying ? 'Pause' : 'Play'}
        >
          {isThisAudioPlaying ? (
            <CirclePause className="w-10 h-8" color="#1e4b8e" />
          ) : (
            <CirclePlay className="w-10 h-8" color="#1e4b8e" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Waveform;
