import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import usePlayAudio from '../../../hooks/usePlayAudio';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Play from '../../../container/play/Play';
import { QuizMode, GameStage, Events } from '../../../utils/constant';
import { IEventData, IGameQuestionProps } from '../../../utils/types';
import useSocketEvents from '../../../hooks/useSocketEvents';

const Question: React.FC<IGameQuestionProps> = ({ socket, connected, setGameStage }) => {
  const play = useSelector((state: RootState) => state.playState.play);
  const currentQuestion = useSelector((state: RootState) => state.playState.currentQuestion);
  const { audioRef } = usePlayAudio();

  useSocketEvents(Events.PLAYER_ANSWER, socket, (payload: IEventData) => () => handlePlayerAnswer(payload));
  useSocketEvents(Events.QUESTION_TIME_OUT, socket, () => handleQuestionTimeOut);

  const handlePlayerAnswer = (payload: IEventData) => {
    console.log(payload);
  };

  const handleQuestionTimeOut = () => {
    setGameStage(GameStage.RESULT);
  };

  const handleOptionSelection = () => {};

  return (
    <>
      {play && (
        <>
          <div className="min-h-screen flex items-center justify-center">
            <Play mode={QuizMode.LIVE} handleOptionSelection={handleOptionSelection} handleTimeOut={handleQuestionTimeOut} question={play?.quiz.questions[currentQuestion]} />
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
