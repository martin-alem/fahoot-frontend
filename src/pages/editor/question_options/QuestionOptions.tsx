import QuestionOption from '../../../components/question_option/QuestionOption';
import { IOption, IQuestionOptionsProps } from '../../../utils/types';

const QuestionOptions: React.FC<IQuestionOptionsProps> = ({ options, handleCurrentQuestionOptionUpdate}) => {
  return (
    <>
      {options.map((option: IOption) => (
        <QuestionOption option={option} key={option._id} handleCurrentQuestionOptionUpdate={handleCurrentQuestionOptionUpdate} />
      ))}
    </>
  );
};

export default QuestionOptions;
