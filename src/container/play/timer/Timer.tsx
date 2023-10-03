/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { ITimerProps } from '../../../utils/types';

const Timer: React.FC<ITimerProps> = ({ duration, onTimeout }) => {
  const timerId = useRef<number>(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      timerId.current = setInterval(() => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1), 1000);
    }
    return () => {
      clearInterval(timerId.current);
      timerId.current = 0;
    };
  }, []);

  useEffect(() => {
    setTimeLeft(duration);
  }, [onTimeout]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
    }
  }, [timeLeft]);

  return (
    <div className="relative w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-32 h-32 bg-secondary-500 rounded-full flex items-center justify-center">
        <span className="text-white text-5xl font-bold">{timeLeft}</span>
      </div>
      <div className="hidden md:block absolute top-0 left-72 -rotate-12  w-fit p-4 bg-white shadow-lg text-secondary-500">Timer</div>
    </div>
  );
};

export default Timer;
