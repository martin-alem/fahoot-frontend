import { useEffect, useRef, useState } from 'react';

const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      if (isPlaying) {
        currentAudioRef.pause();
      } else {
        currentAudioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Initialize audio events if needed
    if (currentAudioRef) {
      currentAudioRef.addEventListener('play', handlePlay);
      currentAudioRef.addEventListener('pause', handlePause);
    }

    // Cleanup
    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener('play', handlePlay);
        currentAudioRef.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  return { audioRef, togglePlayPause, isPlaying };
};

export default useAudioPlayer;
