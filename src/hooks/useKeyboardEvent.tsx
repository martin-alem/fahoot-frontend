import { useEffect } from 'react';

const useKeyboardEvent = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]); // The effect depends on the callback
};

export default useKeyboardEvent;
