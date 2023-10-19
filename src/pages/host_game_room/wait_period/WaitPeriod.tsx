import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { GameStage } from '../../../utils/constant';
import { IWaitPeriodProps } from '../../../utils/types';
import useTitle from '../../../hooks/useTitle';

const WaitPeriod: React.FC<IWaitPeriodProps> = ({ connected, duration, setGameStage }) => {
  const play = useSelector((state: RootState) => state.playState.play);
  const [counter, setCounter] = useState<number>(duration);
  useTitle(play?.quiz.title ?? 'Game');

  useEffect(() => {
    if (counter > 0) {
      const timerId = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setGameStage(GameStage.QUESTION);
    }
  }, [counter, setGameStage]);
  return (
    <>
      {play && (
        <>
          <div className="min-h-screen bg-primary-500 text-white flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-7xl mb-4 capitalize">{play?.quiz.title}</h1>
                <div className="text-9xl w-60 h-60 bg-secondary-500 text-primary-500 rounded-full flex justify-center items-center">
                  <span className="animate-ping">{counter}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white flex justify-center items-center p-4">
            {connected ? <SignalIcon className="w-8 text-green-500" /> : <SignalSlashIcon className="w-8 text-red-500" />}
          </div>
        </>
      )}
    </>
  );
};

export default WaitPeriod;
