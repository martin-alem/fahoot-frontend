import { IQuizContainerProps } from "../../utils/types";
import QuizGridView from "../quiz_grid_view/QuizGridView";

const QuizGridContainer: React.FC<IQuizContainerProps> = ({ quizzes }) => {
  return (
    <>
      <div className="w-ful space-y-4 md:space-y-0 md:flex md:gap-4">
        {quizzes.map((quiz) => {
          return <QuizGridView quiz={quiz} />;
        })}
      </div>
    </>
  );
};

export default QuizGridContainer;
