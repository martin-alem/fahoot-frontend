import AnswerCount from "../../components/answer_count/AnswerCount";
import QuestionOption from "../../components/question_option/QuestionOption";
import Question from "../../components/question/Question";
import Timer from "../../components/timer/Timer";

const Play: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Timer />
        <AnswerCount />
      </div>
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Question />
          <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <QuestionOption bgColor="bg-red-600" />
            <QuestionOption bgColor="bg-blue-600" />
            <QuestionOption bgColor="bg-green-600" />
            <QuestionOption bgColor="bg-yellow-600" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Play;
