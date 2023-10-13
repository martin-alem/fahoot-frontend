/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOnRectangleIcon, BookmarkSlashIcon, Cog6ToothIcon, ExclamationTriangleIcon, EyeIcon, LightBulbIcon, PencilIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { LOGO } from './../../utils/constant';
import Button from '../../components/button/Button';
import useTitle from '../../hooks/useTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal/Modal';
import { useGetQuizQuery, useUpdateQuizMutation } from '../../api/quiz.api';
import { getValueFromObject, handleServerError, updateQuestionOptions, updateQuizAndDispatch } from '../../utils/util';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinner/Spinner';
import Input from '../../components/input/input';
import { useDispatch, useSelector } from 'react-redux';
import { clearQuiz, loadQuiz, saveQuiz, updateCurrentQuestion } from '../../slices/quiz.slice';
import { RootState } from '../../store';
import QuestionManager from './questions_manager/QuestionManager';
import QuestionSettings from './question_settings/QuestionSettings';
import { IOption, IPair, IQuestion, IQuiz, ModalHandle } from '../../utils/types';
import QuestionOptions from './question_options/QuestionOptions';
import QuestionMediaUpload from './question_media_upload/QuestionMediaUpload';
import { hasCorrectQuestionTypeBaseOnOptionCount, mustHaveExactlyOneTrueOption, validateQuestion, validateQuestionOption, validateQuiz, validateQuizSettings } from '../../utils/input_validation';
import { ColorList, PointsList, QuestionType, QuestionTypeList, QuizStatus, TimeLimitList } from '../../utils/constant';
import QuizSetting from './quiz_settings/QuizSettings';
import ObjectID from 'bson-objectid';
import QuestionInput from './question_input/QuestionInput';
import { isEqual } from 'lodash';

const Editor: React.FC = () => {
  useTitle('Editor');

  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: RootState) => state.quizState.modifiedQuiz);
  const baseQuiz = useSelector((state: RootState) => state.quizState.baseQuiz);
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);

  const [unSavedChanges, setUnSavedChanges] = useState<boolean>(false);

  const modalRef = useRef<ModalHandle>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  useEffect(() => {
    setUnSavedChanges(!isEqual(baseQuiz, quiz));
  }, [quiz]);

  const [updateQuiz, { isLoading: isLoadingUpdateQuiz, isSuccess: isSuccessUpdateQuiz, isError: isErrorUpdateQuiz, error: errorUpdateQuiz }] = useUpdateQuizMutation();

  const {
    isLoading: isLoadingGetQuiz,
    isSuccess: isSuccessGetQuiz,
    isError: isErrorGetQuiz,
    error: errorGetQuiz,
    data: dataGetQuiz,
  } = useGetQuizQuery(quizId ?? '', {
    skip: quizId === undefined, //Halt automatic fetching until a valid quizId is available.
  });

  const handleEditCurrentQuestionTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentQuestion || !quiz) return;

    const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

    if (questionIndex === -1) return;

    const updatedQuestion: IQuestion = {
      ...quiz.questions[questionIndex],
      title: e.target.value,
    };

    updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
  };

  const handleSaveQuizSettings = (title: string, lobbyMusic: string, gameMusic: string, podiumMusic: string, colorLabel: string) => {
    if (!quiz) return;
    const { settings } = quiz;
    const updatedSettings = {
      ...settings,
      lobbyMusic,
      podiumMusic,
      gameMusic,
      colorLabel,
    };
    const updateQuiz: IQuiz = {
      ...quiz,
      title,
      settings: updatedSettings,
    };
    dispatch(saveQuiz(updateQuiz));
  };

  const handleUpdateQuizQuestion = useCallback(() => {
    if (quiz) {
      const { questions } = quiz;

      const newQuestion: IQuestion = {
        _id: new ObjectID().toHexString(),
        title: 'Fahoot Is The Best Online Quiz Game',
        questionType: QuestionType.BOOLEAN,
        points: 100,
        duration: 30,
        mediaUrl: null,
        options: [
          {
            isCorrect: false,
            option: 'True',
            _id: new ObjectID().toHexString(),
            colorLabel: ColorList[0].value,
          },
          {
            isCorrect: false,
            option: 'False',
            _id: new ObjectID().toHexString(),
            colorLabel: ColorList[1].value,
          },
        ],
      };

      const updatedQuestions = [...questions, newQuestion];
      const updatedQuiz = { ...quiz, questions: updatedQuestions };
      dispatch(saveQuiz(updatedQuiz));
    }
  }, [quiz, dispatch]);

  const handleRemoveQuizQuestion = useCallback(
    (questionId: string) => {
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
    },
    [quiz, currentQuestion, dispatch],
  );

  const handleDuplicateQuizQuestion = useCallback(
    (questionId: string) => {
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
    },
    [quiz, currentQuestion, dispatch],
  );

  const handleChangeCurrentQuestion = useCallback(
    (question: IQuestion) => {
      dispatch(updateCurrentQuestion(question));
    },
    [quiz, currentQuestion, dispatch],
  );

  const handleUpdateQuestionMediaUrl = useCallback(
    (mediaUrl: string | null) => {
      if (!currentQuestion || !quiz) return;
      const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

      if (questionIndex === -1) return;

      const updatedQuestion: IQuestion = {
        ...quiz.questions[questionIndex],
        mediaUrl: mediaUrl,
      };

      updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
    },
    [quiz, currentQuestion, dispatch],
  );

  const handleUpdateQuestionSettings = useCallback(
    (questionType: IPair | null, points: IPair | null, duration: IPair | null) => {
      if (!currentQuestion || !quiz) return;

      const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

      if (questionIndex === -1) return;

      let updatedQuestion: IQuestion = quiz.questions[questionIndex];

      if (questionType) {
        updatedQuestion = {
          ...quiz.questions[questionIndex],
          questionType: (questionType.value as QuestionType) ?? quiz.questions[questionIndex].questionType,
          options: updateQuestionOptions(questionType.value as QuestionType, quiz.questions[questionIndex].questionType, quiz.questions[questionIndex].options),
        };
      }

      if (points) {
        updatedQuestion = {
          ...quiz.questions[questionIndex],
          points: parseInt(points.value) ?? quiz.questions[questionIndex].points,
        };
      }

      if (duration) {
        updatedQuestion = {
          ...quiz.questions[questionIndex],
          duration: parseInt(duration.value) ?? quiz.questions[questionIndex].duration,
        };
      }

      updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
    },
    [quiz, currentQuestion, dispatch],
  );

  const handleEditCurrentQuestionOption = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, optionId: string, isTextChange: boolean) => {
      if (!currentQuestion || !quiz) return;

      const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

      if (questionIndex === -1) return;

      const optionIndex = currentQuestion.options.findIndex((option) => option._id === optionId);

      if (optionIndex === -1) return;

      const updatedOption: IOption = {
        ...currentQuestion.options[optionIndex],
        option: isTextChange ? (e.target as HTMLTextAreaElement).value : currentQuestion.options[optionIndex].option,
        isCorrect: isTextChange ? currentQuestion.options[optionIndex].isCorrect : (e.target as HTMLInputElement).checked,
      };

      let currentOptions: IOption[] = [...currentQuestion.options];

      if (!isTextChange) {
        currentOptions = currentOptions.map((option) => ({
          ...option,
          isCorrect: false,
        }));
      }

      currentOptions[optionIndex] = updatedOption;

      const updatedQuestion: IQuestion = {
        ...quiz.questions[questionIndex],
        options: currentOptions,
      };

      updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
    },
    [quiz, currentQuestion, dispatch],
  );

  useEffect(() => {
    if (isSuccessGetQuiz) {
      dispatch(loadQuiz(dataGetQuiz));
      dispatch(updateCurrentQuestion(dataGetQuiz.questions[0]));
    }
  }, [isSuccessGetQuiz]);

  useEffect(() => {
    if (isErrorGetQuiz && errorGetQuiz) {
      const { statusCode, message } = handleServerError(errorGetQuiz);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
      if (statusCode === 400) navigate('/dashboard');
    }
  }, [isErrorGetQuiz, errorGetQuiz]);

  useEffect(() => {
    if (isSuccessUpdateQuiz) {
      dispatch(clearQuiz());
      navigate('/dashboard');
    }
  }, [isSuccessUpdateQuiz]);

  useEffect(() => {
    if (isErrorUpdateQuiz && errorUpdateQuiz) {
      const { message } = handleServerError(errorUpdateQuiz);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorUpdateQuiz, errorUpdateQuiz]);

  const showError = (errorMessage: string) => {
    toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
  };

  const isValidQuiz = () => {
    if (!quiz) return false;

    if (!validateQuiz(quiz)) {
      showError('Please make sure you have a title for the quiz');
      return false;
    }
    if (!validateQuizSettings(quiz.settings)) {
      showError('Please make sure you have valid settings for the quiz');
      return false;
    }

    for (const question of quiz.questions) {
      if (!validateQuestion(question) || !hasCorrectQuestionTypeBaseOnOptionCount(question) || !mustHaveExactlyOneTrueOption(question.options)) {
        showError('Please make sure all questions are valid. They must have a title, valid options, question type and exactly one right option');
        return false;
      }

      for (const option of question.options) {
        if (!validateQuestionOption(option)) {
          showError('Please make sure all options for each question are valid.');
          return false;
        }
      }
    }

    return true;
  };

  const handleChangeQuizStatus = async (status: QuizStatus) => {
    if (!isValidQuiz() || !quiz) return;
    await updateQuiz({ _id: quiz._id, status: status });
  };

  const handleSaveQuizAndExit = async () => {
    if (!isValidQuiz() || !quiz) return;
    if (unSavedChanges) return await updateQuiz(quiz);
    dispatch(clearQuiz());
    navigate('/dashboard');
  };

  return (
    <>
      {isLoadingGetQuiz || !quiz || !currentQuestion ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="block md:hidden border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">For a better user experience, use a desktop or a screen with a wider width to work with the editor.</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white shadow-md flex flex-col md:flex md:flex-row items-center justify-between p-2">
            <div className="w-full md:w-1/3 flex items-center gap-2">
              <div>
                <img className="mx-auto h-12 w-auto" src={LOGO} alt="Fahoot" />
              </div>
              <div className="w-full">
                <Input
                  id="quiz_title"
                  type="text"
                  value={quiz?.title ?? 'Untitled'}
                  disabled={true}
                  handleOnBlur={() => null}
                  handleOnChange={() => null}
                  name="quiz_title"
                  placeholder="Title"
                  capitalize={true}
                  prefixIcon={<PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>
              <Cog6ToothIcon className="w-12 cursor-pointer" onClick={openModal} />
            </div>
            {unSavedChanges && (
              <div className="flex w-full justify-center items-center gap-2 text-red-500 text-sm">
                <BookmarkSlashIcon className="w-4" />
                You have unsaved changes. Click done to save and exit.
              </div>
            )}

            <div className="mt-4 flex sm:mt-0 items-center gap-4">
              <div>
                <Button
                  label="Done"
                  loading={isLoadingUpdateQuiz}
                  disabled={isLoadingGetQuiz}
                  type="primary"
                  suffixIcon={<ArrowLeftOnRectangleIcon className="w-6" />}
                  handleClick={handleSaveQuizAndExit}
                />
              </div>
              <div>
                {quiz && quiz.status === QuizStatus.DRAFT ? (
                  <Button
                    label="Publish"
                    type="secondary"
                    disabled={isLoadingUpdateQuiz}
                    loading={isLoadingUpdateQuiz}
                    handleClick={() => handleChangeQuizStatus(QuizStatus.PUBLISHED)}
                    suffixIcon={<RocketLaunchIcon className="w-6" />}
                  />
                ) : (
                  <Button
                    label="Draft"
                    type="secondary"
                    disabled={isLoadingUpdateQuiz}
                    loading={isLoadingUpdateQuiz}
                    handleClick={() => handleChangeQuizStatus(QuizStatus.DRAFT)}
                    suffixIcon={<LightBulbIcon className="w-6" />}
                  />
                )}
              </div>
              <div>
                <Button label="Preview" type="primary" handleClick={() => navigate('/preview')} suffixIcon={<EyeIcon className="w-6" />} />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex md:flex-row">
            <QuestionManager
              questions={quiz.questions}
              currentQuestion={currentQuestion}
              handleUpdateQuizQuestion={handleUpdateQuizQuestion}
              handleRemoveQuizQuestion={handleRemoveQuizQuestion}
              handleDuplicateQuizQuestion={handleDuplicateQuizQuestion}
              handleChangeCurrentQuestion={handleChangeCurrentQuestion}
            />
            <div className="w-full h-screen bg-gray-200 p-8 flex flex-col gap-4 overflow-y-auto">
              <QuestionInput questionTitle={currentQuestion.title} handleEditCurrentQuestionTitle={handleEditCurrentQuestionTitle} />
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <QuestionMediaUpload questionMediaUrl={currentQuestion.mediaUrl} handleUploadQuestionMediaUrl={handleUpdateQuestionMediaUrl} />
              </div>

              <form className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuestionOptions options={currentQuestion.options} handleCurrentQuestionOptionUpdate={handleEditCurrentQuestionOption} />
              </form>
            </div>
            <div className="w-full md:w-1/4 md:h-screen p-4 space-y-10">
              <QuestionSettings
                questionType={getValueFromObject(QuestionTypeList, currentQuestion.questionType)}
                points={getValueFromObject(PointsList, currentQuestion.points.toString())}
                duration={getValueFromObject(TimeLimitList, currentQuestion.duration.toString())}
                handleQuestionSettingUpdate={handleUpdateQuestionSettings}
              />
            </div>
          </div>

          {/* Modal */}
          <Modal ref={modalRef}>
            <QuizSetting
              cancelSetting={closeModal}
              quizTitle={quiz.title}
              colorLabel={quiz.settings.colorLabel}
              gameMusic={quiz.settings.gameMusic}
              lobbyMusic={quiz.settings.lobbyMusic}
              podiumMusic={quiz.settings.podiumMusic}
              updateSettings={handleSaveQuizSettings}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Editor;
