import { IQuizContainerProps } from '../../utils/types';
import QuizGridView from '../quiz_grid_view/QuizGridView';

const QuizGridContainer: React.FC<IQuizContainerProps> = ({ quizzes }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          return <QuizGridView quiz={quiz} key={quiz._id} />;
        })}
      </div>
    </>
  );
};

export default QuizGridContainer;
