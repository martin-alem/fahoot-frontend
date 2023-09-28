/* eslint-disable react-hooks/exhaustive-deps */
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../../components/button/Button';
import QuestionDraft from '../../../components/question_draft/QuestionDraft';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IQuestion } from '../../../utils/types';
import ObjectID from 'bson-objectid';
import { QuestionType, colors } from '../../../utils/constant';
import { saveQuiz } from '../../../slices/quiz.slice';

const QuestionManager: React.FC = () => {
  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const dispatch = useDispatch();

  const addQuestion = () => {
    if (quiz) {
      const { questions } = quiz;

      const newQuestion: IQuestion = {
        _id: new ObjectID().toHexString(),
        title: 'What is Fahoot?',
        questionType: QuestionType.BOOLEAN,
        points: 100,
        duration: 30,
        mediaUrl: null,
        options: [
          {
            isCorrect: false,
            option: 'Kahoot Clone',
            _id: new ObjectID().toHexString(),
            colorLabel: colors[0].value,
          },
          {
            isCorrect: false,
            option: 'Next Online Game Quiz',
            _id: new ObjectID().toHexString(),
            colorLabel: colors[1].value,
          },
        ],
      };

      const updatedQuestions = [...questions, newQuestion];
      const updatedQuiz = { ...quiz, questions: updatedQuestions };
      dispatch(saveQuiz(updatedQuiz));
    }
  };

  return (
    <>
      <div className="w-full md:w-1/4 md:h-screen p-4">
        <div className="flex flex-row md:flex-col gap-4 items-center md:h-full overflow-auto">
          <>
            {quiz?.questions &&
              quiz.questions.map((question, index) => (
                <QuestionDraft key={question._id} question={question} index={index} />
              ))}
          </>

          <Button
            label="Question"
            type="primary"
            handleClick={addQuestion}
            suffixIcon={<PlusIcon className="w-6" />}
          />
        </div>
      </div>
    </>
  );
};

export default QuestionManager;
