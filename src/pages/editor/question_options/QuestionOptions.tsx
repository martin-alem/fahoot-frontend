import QuestionOption from '../../../components/question_option/QuestionOption';
import { QuizMode } from '../../../utils/constant';
import { IOption, IQuestionOptionsProps } from '../../../utils/types';

const QuestionOptions: React.FC<IQuestionOptionsProps> = ({ options, handleCurrentQuestionOptionUpdate }) => {
  return (
    <>
      {options.map((option: IOption) => (
        <QuestionOption mode={QuizMode.EDIT} option={option} key={option._id} handleCurrentQuestionOptionUpdate={handleCurrentQuestionOptionUpdate} />
      ))}
    </>
  );
};

export default QuestionOptions;
