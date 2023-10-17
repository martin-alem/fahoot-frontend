import { ChevronRightIcon, SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import LeaderBoard from '../../../components/leader_board/LeaderBoard';
import PlaySummary from '../../../components/play_summary/PlaySummary';
import StatusCircle from '../../../components/status_circle/StatusCircle';
import { Events, GameStage, PLAY_NAMESPACE } from '../../../utils/constant';
import { IResultProps } from '../../../utils/types';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentQuestion } from '../../../slices/play.slice';
import { useExitGameMutation } from '../../../api/play.api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Result: React.FC<IResultProps> = ({ connected, socket, setGameStage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const play = useSelector((state: RootState) => state.playState.play);
  const currentQuestion = useSelector((state: RootState) => state.playState.currentQuestion);

  const [exitGame, { isSuccess }] = useExitGameMutation();

  const handleEndGame = () => {
    const payload = {
      event: Events.END_GAME,
      data: null,
      room: play?._id,
      recipient: null,
      timestamp: new Date().toUTCString(),
      namespace: PLAY_NAMESPACE,
    };
    socket?.emit(Events.END_GAME, payload);
    dispatch(loadCurrentQuestion(0));
    exitGame();
  };

  const handleOnNext = () => {
    if (!play) return;

    if (currentQuestion + 1 >= play?.quiz.questions.length) {
      handleEndGame();
      return;
    }

    const payload = {
      event: Events.NEXT_QUESTION,
      data: { question: currentQuestion + 1 },
      room: play?._id,
      recipient: null,
      timestamp: new Date().toUTCString(),
      namespace: PLAY_NAMESPACE,
    };
    socket?.emit(Events.NEXT_QUESTION, payload);
    dispatch(loadCurrentQuestion(currentQuestion + 1));
    setGameStage(GameStage.WAIT_PERIOD);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/podium');
    }
  }, [isSuccess, navigate]);
  return (
    <>
      <div className="flex justify-end">
        <div className="mt-6 p-2">
          <Button handleClick={handleOnNext} type="primary" label="Next" suffixIcon={<ChevronRightIcon className="w-6" />} />
        </div>
      </div>
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
