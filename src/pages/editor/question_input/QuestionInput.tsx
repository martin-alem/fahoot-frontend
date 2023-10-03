import { useCallback } from 'react';
import { IQuestionInputProps } from '../../../utils/types';

const QuestionInput: React.FC<IQuestionInputProps> = ({ questionTitle, handleEditCurrentQuestionTitle }) => {
  const editCurrentQuestionTitle = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleEditCurrentQuestionTitle(e);
    },
    [handleEditCurrentQuestionTitle],
  );
  return (
    <>
      <div>
        <div className="mt-2">
          <textarea
            rows={2}
            name="comment"
            id="comment"
            value={questionTitle}
            onChange={editCurrentQuestionTitle}
            className="block w-full rounded-md border-0 py-4 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white sm:text-4xl"
            placeholder="Type your question here"
            style={{ resize: 'none' }}
          />
        </div>
      </div>
    </>
  );
};

export default QuestionInput;
