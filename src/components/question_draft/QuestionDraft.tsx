import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuiz, updateCurrentQuestion } from '../../slices/quiz.slice';
import { IQuestion, IQuestionDraftProps } from '../../utils/types';
import { getBorderColor, getValueFromObject } from '../../utils/util';
import { QuestionType, questionType } from '../../utils/constant';
import { toast } from 'react-toastify';
import ObjectID from 'bson-objectid';

const QuestionDraft: React.FC<IQuestionDraftProps> = ({ question, index }) => {
  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);
  const dispatch = useDispatch();

  const removeQuestion = (questionId: string) => {
    if (!quiz) return;
    if (quiz.questions.length <= 1) {
      toast.info('You must have at least one question in a quiz', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const { questions } = quiz;
    const updateQuestions = questions.filter((question) => question._id !== questionId);
    const updatedQuiz = { ...quiz, questions: updateQuestions };
    dispatch(saveQuiz(updatedQuiz));
    dispatch(updateCurrentQuestion(updateQuestions[0]));
  };

  const duplicateQuestion = (questionId: string) => {
    if (!quiz) return;
    const { questions } = quiz;
    const foundQuestion = questions.find((question) => question._id === questionId);

    if (!foundQuestion) return;

    const clonedQuestion = {
      ...foundQuestion,
      _id: new ObjectID().toHexString(),
      options: foundQuestion.options.map((option) => ({
        ...option,
        _id: new ObjectID().toHexString(),
        isCorrect: false,
      })),
    };
    const updatedQuestions = [...questions, clonedQuestion];

    const updatedQuiz = { ...quiz, questions: updatedQuestions };

    dispatch(saveQuiz(updatedQuiz));
  };

  const handleChangeCurrentQuestion = (question: IQuestion) => {
    if (question._id === currentQuestion?._id) return;
    dispatch(updateCurrentQuestion(question));
  };

  return (
    <>
      <div className="w-full flex-shrink-0">
        <div className="flex items-center justify-between">
          <p>
            {index + 1}. {getValueFromObject(questionType, question.questionType).label}
          </p>
          <div className="flex items-center gap-2">
            <DocumentDuplicateIcon className="w-4 cursor-pointer" onClick={() => duplicateQuestion(question._id)} />
            <TrashIcon className="w-4 cursor-pointer" onClick={() => removeQuestion(question._id)} />
          </div>
        </div>
        <div
          onClick={() => handleChangeCurrentQuestion(question)}
          className={`w-full h-40 bg-white shadow-md flex flex-col justify-center items-center cursor-pointer gap-2 ${getBorderColor(question, currentQuestion)}`}
        >
          <div className="w-full flex gap-4 justify-center items-center">
            <div className="w-16 h-16 shadow-md text-slate-400 rounded-full flex justify-center items-center">{question.duration}s</div>
            <div className="w-16 h-16 shadow-md text-slate-400 rounded-full flex justify-center items-center">{question.points}p</div>
          </div>
          <p className="w-44 text-slate-400 text-xl truncate">{question.title}</p>
          <>
            {question.questionType === QuestionType.BOOLEAN ? (
              <div className="flex gap-2 items-center justify-center">
                <div className="w-24 h-2 bg-slate-200"></div>
                <div className="w-24 h-2 bg-slate-200"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 items-center justify-center">
                <div className="w-24 h-2 bg-slate-200"></div>
                <div className="w-24 h-2 bg-slate-200"></div>
                <div className="w-24 h-2 bg-slate-200"></div>
                <div className="w-24 h-2 bg-slate-200"></div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default QuestionDraft;
