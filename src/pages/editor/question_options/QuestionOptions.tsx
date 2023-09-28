import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import QuestionOption from '../../../components/question_option/QuestionOption';
import { IOption } from '../../../utils/types';

const QuestionOptions: React.FC = () => {
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);
  return (
    <>
      {currentQuestion?.options.map((option: IOption) => (
        <QuestionOption option={option} key={option._id} />
      ))}
    </>
  );
};

export default QuestionOptions;
