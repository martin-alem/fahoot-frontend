import { DocumentDuplicateIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IQuestionDraftProps } from '../../utils/types';
import { getBorderColor, getValueFromObject } from '../../utils/util';
import { QuestionTypeList } from '../../utils/constant';
import { memo, useCallback } from 'react';

const QuestionDraft: React.FC<IQuestionDraftProps> = memo(({ question, currentQuestion, index, handleRemoveQuizQuestion, handleDuplicateQuizQuestion, handleChangeCurrentQuestion }) => {
  const duplicateQuestion = useCallback(() => {
    handleDuplicateQuizQuestion(question._id);
  }, [question, handleDuplicateQuizQuestion]);

  const removeQuestion = useCallback(() => {
    handleRemoveQuizQuestion(question._id);
  }, [question, handleRemoveQuizQuestion]);

  const changeCurrentQuestion = useCallback(() => {
    handleChangeCurrentQuestion(question);
  }, [question, handleChangeCurrentQuestion]);
  return (
    <>
      <div className="w-full flex-shrink-0">
        <div className="flex items-center justify-between">
          <p>
            {index + 1}. {getValueFromObject(QuestionTypeList, question.questionType).label}
          </p>
          <div className="flex items-center gap-2">
            <DocumentDuplicateIcon className="w-4 cursor-pointer" onClick={duplicateQuestion} />
            <TrashIcon className="w-4 cursor-pointer" onClick={removeQuestion} />
          </div>
        </div>
        <div onClick={changeCurrentQuestion} className={`w-full h-44 bg-white shadow-md flex flex-col justify-center items-center cursor-pointer gap-2 ${getBorderColor(question, currentQuestion)}`}>
          <div className="w-full flex gap-4 justify-center items-center">
            <div className="w-10 h-10 shadow-md text-slate-400 text-xs rounded-full flex justify-center items-center">{question.duration}s</div>
            <div className="w-10 h-10 shadow-md text-slate-400 text-xs rounded-full flex justify-center items-center">{question.points}p</div>
          </div>
          <>{question.mediaUrl && <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />}</>
          <p className="w-44 text-slate-400 text-xl truncate">{question.title}</p>
          <>
            <div className="grid grid-cols-2 gap-2 items-center justify-center">
              {question.options.map((option) => (
                <div key={option._id} className="w-24 h-2 bg-slate-200 flex justify-end">
                  {option.isCorrect && <div className="w-2 h-2 bg-green-500"></div>}
                </div>
              ))}
            </div>
          </>
        </div>
      </div>
    </>
  );
});

export default QuestionDraft;
