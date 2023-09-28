/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IOption, IQuestion, IQuestionOptionProps } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentQuestion, saveQuiz } from '../../slices/quiz.slice';
import { RootState } from '../../store';
import { updateQuizAndDispatch } from '../../utils/util';

const QuestionOption: React.FC<IQuestionOptionProps> = ({ option }) => {
  const [optionText, setOptionText] = useState<string>(option?.option ?? '');
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>(option?.isCorrect ?? undefined);

  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);
  const dispatch = useDispatch();

  const handleEditCurrentQuestionOptionText = (e: React.ChangeEvent<HTMLTextAreaElement>, optionId: string | undefined) => {
    setOptionText(e.target.value);

    if (!currentQuestion || !quiz) return;
    const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

    if (questionIndex === -1) return;

    const currentEditingQuestion = quiz.questions[questionIndex];

    const optionIndex = currentEditingQuestion.options.findIndex((option) => option._id === optionId);

    if (optionIndex === -1) return;

    const updatedOption: IOption = {
      ...currentQuestion.options[optionIndex],
      option: e.target.value,
    };

    const currentOptions: IOption[] = [...currentEditingQuestion.options];
    currentOptions[optionIndex] = updatedOption;

    const updatedQuestion: IQuestion = {
      ...quiz.questions[questionIndex],
      options: currentOptions,
    };

    updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
  };

  const handleEditCurrentQuestionOptionCorrect = (e: React.ChangeEvent<HTMLInputElement>, optionId: string | undefined) => {
    setSelectedOption(e.target.checked);

    if (!currentQuestion || !quiz) return;

    const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

    if (questionIndex === -1) return;

    const currentEditingQuestion = quiz.questions[questionIndex];

    const optionIndex = currentEditingQuestion.options.findIndex((option) => option._id === optionId);

    if (optionIndex === -1) return;

    const updatedOption: IOption = {
      ...currentQuestion.options[optionIndex],
      isCorrect: e.target.checked,
    };

    //Mark all options as false before updating the current option. This ensure that previously set options are set to default values false.
    //QuestionOption are independent of each other but are mutually exclusive when rendered together.
    const currentOptions: IOption[] = [...currentEditingQuestion.options].map((option) => ({
      ...option,
      isCorrect: false,
    }));
    currentOptions[optionIndex] = updatedOption;

    const updatedQuestion: IQuestion = {
      ...quiz.questions[questionIndex],
      options: currentOptions,
    };

    updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
  };

  useEffect(() => {
    setOptionText(option?.option ?? '');
    setSelectedOption(option?.isCorrect ?? undefined);
  }, [quiz, currentQuestion]);

  return (
    <div className="flex flex-col">
      <div className={`w-full h-1 ${option?.colorLabel}`}></div>
      <div className="w-full bg-white text-white flex flex-col md:flex-row justify-between items-center gap-8 p-6 cursor-pointer shadow-lg hover:opacity-80 transition-all duration-300 ease-linear">
        <div className="flex-shrink-0 rounded-full bg-secondary-500 flex items-center justify-center">
          <input
            id={option?._id}
            name={`question_option`} // make it unique if you have multiple sets of radio buttons
            type="radio"
            value="true"
            onChange={(e) => handleEditCurrentQuestionOptionCorrect(e, option?._id)}
            defaultChecked={selectedOption}
            className="h-12 w-12 border-gray-300 text-secondary-600 focus:ring-secondary-600"
          />
        </div>
        <textarea
          rows={1}
          name={`option_${option?._id}`}
          id={`option_${option?._id}`}
          onChange={(e) => handleEditCurrentQuestionOptionText(e, option?._id)}
          value={optionText}
          className="block w-full rounded-md border-0 py-4 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white sm:text-2xl"
          placeholder="Type answer here"
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  );
};

export default QuestionOption;
