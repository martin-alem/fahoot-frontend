/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SelectInput from '../../../components/select_input/SelectInput';
import { questionType, timeLimit, points, QuestionType } from '../../../utils/constant';
import { IPair, IQuestion } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getValueFromObject, updateQuestionOptions, updateQuizAndDispatch } from '../../../utils/util';
import { updateCurrentQuestion, saveQuiz } from '../../../slices/quiz.slice';

const QuestionSettings: React.FC = () => {
  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);
  const dispatch = useDispatch();

  const [qType, setQType] = useState<IPair>(questionType[0]);
  const [qDuration, setQDuration] = useState<IPair>(timeLimit[0]);
  const [qPoints, setQPoints] = useState<IPair>(points[0]);

  useEffect(() => {
    if (!currentQuestion) return;
    setQType(getValueFromObject(questionType, currentQuestion.questionType));
    setQDuration(getValueFromObject(timeLimit, currentQuestion.duration.toString()));
    setQPoints(getValueFromObject(points, currentQuestion.points.toString()));
  }, [currentQuestion]);

  //when QuestionType, QuestionTimeLimit, or QuestionPoints change make an update to currentQuestion.
  //Not a big fan of this approach. We could run this code during an onChange instead.
  useEffect(() => {
    if (!currentQuestion || !quiz) return;
    const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

    if (questionIndex === -1) return;

    const newOptions = updateQuestionOptions(qType.value as QuestionType, quiz.questions[questionIndex].questionType, quiz.questions[questionIndex].options);
    const updatedQuestion: IQuestion = {
      ...quiz.questions[questionIndex],
      questionType: qType.value as QuestionType,
      points: parseInt(qPoints.value),
      duration: parseInt(qDuration.value),
      options: newOptions,
    };

    updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
  }, [qType.value, qDuration.value, qPoints.value]);

  return (
    <>
      <div className="w-full">
        <h3 className="font-bold">Question Type</h3>
        <SelectInput options={questionType} selected={qType} setSelected={setQType} />
      </div>

      <div className="w-full">
        <h3 className="font-bold">Time Limit</h3>
        <SelectInput options={timeLimit} selected={qDuration} setSelected={setQDuration} />
      </div>

      <div className="w-full">
        <h3 className="font-bold">Points</h3>
        <SelectInput options={points} selected={qPoints} setSelected={setQPoints} />
      </div>
    </>
  );
};

export default QuestionSettings;
