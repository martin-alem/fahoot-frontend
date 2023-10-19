import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import LeaderBoard from '../../../components/leader_board/LeaderBoard';
import PlaySummary from '../../../components/play_summary/PlaySummary';
import StatusCircle from '../../../components/status_circle/StatusCircle';
import { Events, GameStage } from '../../../utils/constant';
import { IEventData, IResultProps } from '../../../utils/types';
import useSocketEvents from '../../../hooks/useSocketEvents';
import { loadCurrentQuestion } from '../../../slices/play.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useExitGameMutation } from '../../../api/play.api';

const Result: React.FC<IResultProps> = ({ connected, socket, setGameStage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [exitGame, { isSuccess }] = useExitGameMutation();

  const handleNextQuestion = (payload: IEventData) => {
    const { question } = payload.data as { question: number };
    dispatch(loadCurrentQuestion(question));
    setGameStage(GameStage.WAIT_PERIOD);
  };

  const handleEndGame = () => {
    dispatch(loadCurrentQuestion(0));
    exitGame();
  };

  useSocketEvents(Events.NEXT_QUESTION, socket, handleNextQuestion);
  useSocketEvents(Events.END_GAME, socket, handleEndGame);

  useEffect(() => {
    if (isSuccess) {
      navigate('/podium', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex justify-center">
          <StatusCircle status={false} />
        </div>
        <div className="mt-4 mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold">Leadership board</h1>
          <LeaderBoard />
          <div className="mt-4">
            <PlaySummary />
          </div>
        </div>
      </div>
      <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white flex justify-center items-center p-4">
        {connected ? <SignalIcon className="w-8 text-green-500" /> : <SignalSlashIcon className="w-8 text-red-500" />}
      </div>
    </>
  );
};

export default Result;
