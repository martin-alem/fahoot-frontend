import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { AppreciationMessages, Events, GameStage, LOGO } from '../../../utils/constant';
import { IEventData, IResponsePendingProps } from '../../../utils/types';
import useSocketEvents from '../../../hooks/useSocketEvents';

const ResponsePending: React.FC<IResponsePendingProps> = ({ connected, socket, setGameStage }) => {
  const randomIndex = useRef<number>(Math.floor(Math.random() * AppreciationMessages.length));

  useSocketEvents(Events.QUESTION_TIME_OUT, socket, (payload: IEventData) => () => handleQuestionTimeOut(payload));

  const handleQuestionTimeOut = (payload: IEventData) => {
    console.log(payload);
    setGameStage(GameStage.RESULT);
  };
  return (
    <>
      <div className="min-h-screen bg-primary-500 text-white flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl mb-4 capitalize">{AppreciationMessages[randomIndex.current]}</h1>
            <div className="text-9xl w-60 h-60 bg-secondary-500 text-primary-500 rounded-full flex justify-center items-center">
              <img className="mx-auto hidden md:block h-20 w-auto animate-bounce" src={LOGO} alt="Fahoot" />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white flex justify-center items-center p-4">
        {connected ? <SignalIcon className="w-8 text-green-500" /> : <SignalSlashIcon className="w-8 text-red-500" />}
      </div>
    </>
  );
};

export default ResponsePending;
