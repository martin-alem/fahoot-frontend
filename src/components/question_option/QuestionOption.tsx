/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { IQuestionOptionProps } from '../../utils/types';
import { QuizMode } from '../../utils/constant';

const QuestionOption: React.FC<IQuestionOptionProps> = ({ option, handleCurrentQuestionOptionUpdate, mode }) => {
  const [optionText, setOptionText] = useState<string>(option.option);
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>(option.isCorrect);

  const editOptionCorrect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleCurrentQuestionOptionUpdate(e, option._id, false);
      setSelectedOption(e.target.checked);
    },
    [handleCurrentQuestionOptionUpdate],
  );

  const editOptionText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleCurrentQuestionOptionUpdate(e, option._id, true);
      setOptionText(e.target.value);
    },
    [handleCurrentQuestionOptionUpdate],
  );

  return (
    <div className="w-full flex flex-col">
      <div className={`w-full h-1 ${option?.colorLabel}`}></div>
      <div className="w-full bg-white text-white flex flex-col md:flex-row justify-between items-center gap-8 p-6 cursor-pointer shadow-lg hover:opacity-80 transition-all duration-300 ease-linear">
        <div className="flex-shrink-0 rounded-full bg-secondary-500 flex items-center justify-center">
          <input
            id={option._id}
            disabled={mode === QuizMode.PREVIEW}
            name={`question_option_${option._id}`} // make it unique if you have multiple sets of radio buttons
            type="radio"
            value="true"
            onChange={editOptionCorrect}
            defaultChecked={selectedOption}
            className="h-12 w-12 border-gray-300 text-secondary-600 focus:ring-secondary-600 cursor-pointer"
          />
        </div>
        <textarea
          rows={1}
          disabled={mode === QuizMode.LIVE || mode === QuizMode.PREVIEW}
          name={`option_${option._id}`}
          id={`option_${option._id}`}
          onChange={editOptionText}
          value={optionText}
          className="block w-full capitalize border-0 py-4 text-gray-900 text-center ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white sm:text-2xl"
          placeholder="Type answer here"
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  );
};

export default QuestionOption;
