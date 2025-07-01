import { toast } from 'sonner';

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
    toast.error('Error starting screen share');
    console.error('Error starting screen share:', error);
    return null;
  }
};

export { startScreenShare };
