import AnswerCount from './answer_count/AnswerCount';
import QuestionOption from '../../components/question_option/QuestionOption';
import Question from './question/Question';
import { LOGO } from './../../utils/constant';
import Timer from './timer/Timer';
import { IPlayProps } from '../../utils/types';

const Play: React.FC<IPlayProps> = ({ handleOptionSelection, handleTimeOut, mode, question }) => {
  return (
    <>
      {question && (
        <div className="w-full h-full flex-col">
          <div className="w-full flex justify-between items-center">
            <Timer duration={question.duration} onTimeout={handleTimeOut} />
            <img className="mx-auto hidden md:block h-20 w-auto animate-bounce" src={LOGO} alt="Fahoot" />
            <AnswerCount />
          </div>
          <div className="mx-auto mt-4 w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col gap-4">
              <Question questionText={question.title} />
              <div className="w-full flex justify-center items-center">
                {question.mediaUrl && <img src={question.mediaUrl} alt="" className="pointer-events-none max-h-48 object-cover group-hover:opacity-75" />}
              </div>
              <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {question.options.map((option) => (
                  <QuestionOption key={option._id} mode={mode} handleCurrentQuestionOptionUpdate={handleOptionSelection} option={option} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Play;
