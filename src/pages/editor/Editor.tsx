/* eslint-disable react-hooks/exhaustive-deps */
import {
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PhotoIcon,
  PlusIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Logo from './../../assets/Fahoot Logo.svg';
import Button from '../../components/button/Button';
import useTitle from '../../hooks/useTitle';
import { useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../../components/select_input/SelectInput';
import QuestionDraft from '../../components/question_draft/QuestionDraft';
import { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import QuizSetting from '../../components/quiz_setting/QuizSetting';
import QuestionOption from '../../components/question_option/QuestionOption';
import { useGetQuizQuery } from '../../api/quiz.api';
import { IPair } from '../../utils/types';
import { getValueFromObject, serverErrors } from '../../utils/util';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinner/Spinner';
import { ERROR_MESSAGES, points, questionType, timeLimit } from '../../utils/constant';
import Input from '../../components/input/input';
import { validateTitle } from '../../utils/input_validation';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuiz } from '../../slices/quiz.slice';
import { RootState } from '../../store';

const Editor: React.FC = () => {
  useTitle('Editor');
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: RootState) => state.quizState.quiz);

  const [isOpen, setIsOpen] = useState(false);
  const [qType, setQType] = useState<IPair>(questionType[0]);
  const [tLimit, setTLimit] = useState<IPair>(timeLimit[5]);
  const [qPoints, setQPoints] = useState<IPair>(points[5]);

  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [validQuestionTitle, setValidQuestionTitle] = useState<boolean>(false);

  useEffect(() => {
    const result = questionTitle !== '';
    setValidQuestionTitle(result);
  }, [questionTitle]);

  const {
    isLoading: isLoadingGetQuiz,
    isSuccess: isSuccessGetQuiz,
    isError: isErrorGetQuiz,
    error: errorGetQuiz,
    data: dataGetQuiz,
  } = useGetQuizQuery(quizId ?? '', {
    skip: quizId === undefined,
  });

  useEffect(() => {
    if (isSuccessGetQuiz) {
      dispatch(saveQuiz(dataGetQuiz));
    }
  }, [isSuccessGetQuiz]);

  useEffect(() => {
    if (!quiz) return;
    setQType(getValueFromObject(questionType, quiz.questions[0].questionType));
    setTLimit(getValueFromObject(timeLimit, quiz.questions[0].duration.toString()));
    setQPoints(getValueFromObject(points, quiz.questions[0].points.toString()));
    setQuestionTitle(quiz?.questions[0].title ?? 'Untitled');
  }, [quiz]);

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
                <p className="text-sm text-yellow-700">
                  For a better user experience, use a desktop or a screen with a wider width to work
                  with the editor.
                </p>
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
                  handleOnChange={() => null}
                  handleOnBlur={() => null}
                  disabled={true}
                  name="quiz_title"
                  placeholder="Title"
                  prefixIcon={<PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>
              <Cog6ToothIcon className="w-12 cursor-pointer" onClick={() => setIsOpen(true)} />
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Button
                  label="Exit"
                  type="primary"
                  suffixIcon={<XMarkIcon className="w-6" />}
                  handleClick={() => navigate('/dashboard')}
                />
              </div>
              <div>
                <Button
                  label="Publish"
                  type="secondary"
                  suffixIcon={<RocketLaunchIcon className="w-6" />}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex md:flex-row">
            <div className="w-full md:w-1/4 md:h-screen p-4">
              <div className="flex flex-row md:flex-col gap-4 items-center md:h-full overflow-auto">
                <QuestionDraft />
                <Button label="Question" type="primary" suffixIcon={<PlusIcon className="w-6" />} />
              </div>
            </div>
            <div className="w-full h-screen bg-gray-200 p-8 flex flex-col gap-4 overflow-y-auto">
              {/* Question Input */}
              <div>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    value={questionTitle}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setQuestionTitle(e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-4 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white sm:text-4xl"
                    placeholder="Type your question here"
                    style={{ resize: 'none' }}
                  />
                </div>
              </div>

              {/* Upload image */}
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

              <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuestionOption bgColor="bg-red-600" />
                <QuestionOption bgColor="bg-blue-600" />
                <QuestionOption bgColor="bg-green-600" />
                <QuestionOption bgColor="bg-yellow-600" />
              </div>
            </div>
            <div className="w-full md:w-1/4 md:h-screen p-4 space-y-10">
              <div className="w-full">
                <h3 className="font-bold">Question Type</h3>
                <SelectInput options={questionType} selected={qType} setSelected={setQType} />
              </div>

              <div className="w-full">
                <h3 className="font-bold">Time Limit</h3>
                <SelectInput options={timeLimit} selected={tLimit} setSelected={setTLimit} />
              </div>

              <div className="w-full">
                <h3 className="font-bold">Points</h3>
                <SelectInput options={points} selected={qPoints} setSelected={setQPoints} />
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <QuizSetting cancelSetting={() => setIsOpen(false)} />
          </Modal>
        </>
      )}
    </>
  );
};

export default Editor;
