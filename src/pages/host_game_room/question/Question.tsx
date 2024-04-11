import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import usePlayAudio from '../../../hooks/usePlayAudio';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Play from '../../../container/play/Play';
import { QuizMode, GameStage, Events, PLAY_NAMESPACE } from '../../../utils/constant';
import { IEventData, IGameQuestionProps } from '../../../utils/types';
import useSocketEvents from '../../../hooks/useSocketEvents';
import React from "react";

const Question: React.FC<IGameQuestionProps> = ({ socket, connected, setGameStage }) => {
  const play = useSelector((state: RootState) => state.playState.play);
  const currentQuestion = useSelector((state: RootState) => state.playState.currentQuestion);
  const { audioRef } = usePlayAudio();

  useSocketEvents(Events.PLAYER_ANSWER, socket, (payload: IEventData) => () => handlePlayerAnswer(payload));

  const handlePlayerAnswer = (payload: IEventData) => {
    console.log(payload);
  };

  const handleOptionSelection = () => {};

  const handleTimeOut = () => {
    const payload = {
      event: Events.QUESTION_TIME_OUT,
      data: null,
      room: play?._id,
      recipient: null,
      timestamp: new Date().toUTCString(),
      namespace: PLAY_NAMESPACE,
    };
    socket?.emit(Events.QUESTION_TIME_OUT, payload);
    setGameStage(GameStage.RESULT);
  };
  return (
    <>
      {play && (
        <>
          <div className="min-h-screen flex items-center justify-center">
            <Play mode={QuizMode.LIVE} handleOptionSelection={handleOptionSelection} handleTimeOut={handleTimeOut} question={play.quiz.questions[currentQuestion]} />
          </div>
          <audio ref={audioRef} autoPlay src={play.quiz.settings.gameMusic} loop />
          <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white flex justify-center items-center p-4">
            {connected ? <SignalIcon className="w-8 text-green-500" /> : <SignalSlashIcon className="w-8 text-red-500" />}
          </div>
        </>
      )}
    </>
  );
};

export default Question;
