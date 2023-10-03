import { useEffect, useRef, useState } from 'react';

const usePlayAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.addEventListener('play', () => setIsPlaying(true));
      currentAudioRef.addEventListener('pause', () => setIsPlaying(false));
    }
    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener('play', () => {});
        currentAudioRef.removeEventListener('pause', () => {});
      }
    };
  }, []);

  return { audioRef, togglePlayPause, isPlaying };
};

export default usePlayAudio;
