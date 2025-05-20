import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CirclePause, CirclePlay } from 'lucide-react';

interface WaveformProps {
  recordedVoiceURL: string;
  seconds?: number;
}

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Waveform: React.FC<WaveformProps> = ({ recordedVoiceURL, seconds = 0 }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(seconds);

  useEffect(() => {
    if (!recordedVoiceURL || !waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      cursorWidth: 1,
      backend: 'WebAudio',
      height: 40,
      waveColor: '#1e4b8e',
      progressColor: '#C4C4C4',
      cursorColor: 'transparent',
      url: recordedVoiceURL,
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.on('ready', () => {
      setDuration(wavesurfer.getDuration());
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));
    wavesurfer.on('finish', () => setIsPlaying(false));

    return () => {
      wavesurfer.destroy();
      wavesurferRef.current = null;
    };
  }, [recordedVoiceURL]);

  const togglePlayback = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;

    ws.playPause();
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div ref={waveformRef} className="flex-1" />
      <span className="text-[#1e4b8e] min-w-[50px] text-center">
        {formatTime(duration)}
      </span>
      <button
        onClick={togglePlayback}
        className="p-1"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <CirclePause className="w-10 h-8" color="#1e4b8e" />
        ) : (
          <CirclePlay className="w-10 h-8" color="#1e4b8e" />
        )}
      </button>
    </div>
  );
};

export default Waveform;
