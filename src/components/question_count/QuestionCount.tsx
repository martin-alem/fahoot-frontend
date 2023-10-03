import { DocumentIcon } from '@heroicons/react/24/outline';
import { IQuestionCountProps } from '../../utils/types';

const QuestionCount: React.FC<IQuestionCountProps> = ({ currentQuestion, totalQuestions }) => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2 text-white sm:text-4xl">
        <DocumentIcon className="w-12" />
        <span className="text-4xl">
          {currentQuestion + 1} / {totalQuestions}
        </span>
      </h1>
    </>
  );
};

export default QuestionCount;
