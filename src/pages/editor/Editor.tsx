/* eslint-disable react-hooks/exhaustive-deps */
import { Cog6ToothIcon, ExclamationTriangleIcon, PencilIcon, PhotoIcon, RocketLaunchIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './../../assets/Fahoot Logo.svg';
import Button from '../../components/button/Button';
import useTitle from '../../hooks/useTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import QuizSetting from '../../components/quiz_setting/QuizSetting';
import { useGetQuizQuery } from '../../api/quiz.api';
import { serverErrors, updateQuizAndDispatch } from '../../utils/util';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinner/Spinner';
import Input from '../../components/input/input';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuiz, updateCurrentQuestion } from '../../slices/quiz.slice';
import { RootState } from '../../store';
import QuestionManager from './questions_manager/QuestionManager';
import QuestionSettings from './question_settings/QuestionSettings';
import { IQuestion } from '../../utils/types';
import QuestionOptions from './question_options/QuestionOptions';

const Editor: React.FC = () => {
  useTitle('Editor');

  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [quizTitle, setQuizTitle] = useState<string>('');

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

  useEffect(() => {
    setQuizTitle(currentQuestion?.title ?? 'Untitled');
  }, [currentQuestion]);

  useEffect(() => {
    if (isSuccessGetQuiz) {
      dispatch(saveQuiz(dataGetQuiz));
      dispatch(updateCurrentQuestion(dataGetQuiz.questions[0]));
    }
  }, [isSuccessGetQuiz]);

  useEffect(() => {
    if (isErrorGetQuiz) {
      const statusCode = errorGetQuiz && 'status' in errorGetQuiz ? errorGetQuiz.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      navigate('/dashboard');
    }
  }, [isErrorGetQuiz, errorGetQuiz]);
  return (
    <>
      {isLoadingGetQuiz ? (
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
                <img className="mx-auto h-12 w-auto" src={Logo} alt="Fahoot" />
              </div>
              <div className="w-full">
                <Input
                  id="quiz_title"
                  type="text"
                  value={quiz?.title ?? 'Untitled'}
                  disabled={true}
                  name="quiz_title"
                  placeholder="Title"
                  prefixIcon={<PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>
              <Cog6ToothIcon className="w-12 cursor-pointer" onClick={() => setIsSettingsOpen(true)} />
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Button label="Exit" type="primary" suffixIcon={<XMarkIcon className="w-6" />} handleClick={() => navigate('/dashboard')} />
              </div>
              <div>
                <Button label="Publish" type="secondary" suffixIcon={<RocketLaunchIcon className="w-6" />} />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex md:flex-row">
            <QuestionManager />
            <div className="w-full h-screen bg-gray-200 p-8 flex flex-col gap-4 overflow-y-auto">
              <div>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    value={quizTitle}
                    onChange={handleEditCurrentQuestionTitle}
                    className="block w-full rounded-md border-0 py-4 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white sm:text-4xl"
                    placeholder="Type your question here"
                    style={{ resize: 'none' }}
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer mx-auto rounded-md bg-white font-semibold text-secondary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary-600 focus-within:ring-offset-2 hover:text-secondary-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              <form className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuestionOptions />
              </form>
            </div>
            <div className="w-full md:w-1/4 md:h-screen p-4 space-y-10">
              <QuestionSettings />
            </div>
          </div>

          {/* Modal */}
          <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
            <QuizSetting cancelSetting={() => setIsSettingsOpen(false)} />
          </Modal>
        </>
      )}
    </>
  );
};

export default Editor;
