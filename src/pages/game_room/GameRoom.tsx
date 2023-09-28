import useTitle from '../../hooks/useTitle';
import PlayerCount from '../../components/player_count/PlayerCount';
import Play from '../../container/play/Play';
import QuestionCount from '../../components/question_count/QuestionCount';
// import Result from '../../container/result/Result';

const GameRoom: React.FC = () => {
  useTitle('Game Room');
  return (
    <div className="relative">
      <div className="fixed h-24 top-0 left-0 w-full p-4 flex items-center justify-between bg-secondary-500">
        <QuestionCount />
        <PlayerCount textColor="text-white" />
      </div>
      <div className="pt-28 pb-12 px-4">
        <Play />
        {/* <Result /> */}
      </div>

      <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white text-center p-4">Waiting for players to connect...</div>
    </div>
  );
};

export default GameRoom;
