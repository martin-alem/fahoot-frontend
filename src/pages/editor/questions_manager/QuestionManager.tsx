/* eslint-disable react-hooks/exhaustive-deps */
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../../components/button/Button';
import QuestionDraft from '../../../components/question_draft/QuestionDraft';
import { IQuestionManagerProps } from '../../../utils/types';
import { memo } from 'react';

const QuestionManager: React.FC<IQuestionManagerProps> = memo(
  ({ questions, currentQuestion, handleUpdateQuizQuestion, handleDuplicateQuizQuestion, handleRemoveQuizQuestion, handleChangeCurrentQuestion }) => {
    return (
      <>
        <div className="w-full md:w-1/4 md:h-screen p-4">
          <div className="flex flex-row md:flex-col gap-4 items-center md:h-full overflow-auto">
            <>
              {questions.map((question, index) => (
                <QuestionDraft
                  key={question._id}
                  question={question}
                  currentQuestion={currentQuestion}
                  index={index}
                  handleDuplicateQuizQuestion={handleDuplicateQuizQuestion}
                  handleRemoveQuizQuestion={handleRemoveQuizQuestion}
                  handleChangeCurrentQuestion={handleChangeCurrentQuestion}
                />
              ))}
            </>

            <Button label="Question" type="primary" handleClick={handleUpdateQuizQuestion} suffixIcon={<PlusIcon className="w-6" />} />
          </div>
        </div>
      </>
    );
  },
);

export default QuestionManager;
