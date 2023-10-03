import useTitle from '../../hooks/useTitle';
import PlayerCount from '../../components/player_count/PlayerCount';
import Play from '../../container/play/Play';
import QuestionCount from '../../components/question_count/QuestionCount';
import Result from '../../container/result/Result';
import { QuestionType, QuizMode, QuizState } from '../../utils/constant';
import { useState } from 'react';

const GameRoom: React.FC = () => {
  useTitle('Game Room');
  const [quizState, setQuizState] = useState<QuizState>(QuizState.PLAY);

  const handleOptionSelection = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if ('checked' in e.target) {
      console.log(e.target.checked);
    }
  };

  const handleTimeOut = () => setQuizState(QuizState.RESULT);
  return (
    <div className="relative">
      <div className="fixed h-24 top-0 left-0 w-full p-4 flex items-center justify-between bg-secondary-500">
        <QuestionCount currentQuestion={0} totalQuestions={0} />
        <PlayerCount textColor="text-white" />
      </div>
      <div className="pt-28 pb-12 px-4">
        {quizState === QuizState.PLAY && (
          <Play
            mode={QuizMode.LIVE}
            handleOptionSelection={handleOptionSelection}
            handleTimeOut={handleTimeOut}
            question={{ _id: '1', duration: 30, mediaUrl: null, points: 400, options: [], questionType: QuestionType.BOOLEAN, title: 'what is Fahoot' }}
          />
        )}
        {quizState === QuizState.RESULT && <Result />}
      </div>

      <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white text-center p-4">Waiting for players to connect...</div>
    </div>
  );
};

export default GameRoom;
