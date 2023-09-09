import { IQuizContainerProps } from "../../utils/types";
import QuizListView from "../quiz_list_view/QuizListView";

const QuizListContainer: React.FC<IQuizContainerProps> = ({ quizzes }) => {
  return (
    <>
      <div className="w-ful flex flex-col space-y-4">
        {quizzes.map((quiz) => {
          return <QuizListView quiz={quiz} />;
        })}
      </div>
    </>
  );
};

export default QuizListContainer;
