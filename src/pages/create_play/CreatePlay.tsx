/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreatePlayMutation } from '../../api/play.api';
import { RootState } from '../../store';
import { ICreatePlayPayload } from '../../utils/types';
import { LOGO } from './../../utils/constant';
import useTitle from '../../hooks/useTitle';
import { handleServerError } from '../../utils/util';
import { useGetQuizQuery } from '../../api/quiz.api';
import { loadQuiz, updateCurrentQuestion } from '../../slices/quiz.slice';
import GameMode from '../../components/game_mode/GameMode';

const CreatePlay: React.FC = () => {
  useTitle('Creating Play');
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = useSelector((state: RootState) => state.quizState.modifiedQuiz);
  const [createPlay, { isSuccess: createPlayIsSuccess, isError: createPlayIsError, error: createPlayError, data: createPlayData }] = useCreatePlayMutation();

  const {
    isLoading: isLoadingGetQuiz,
    isSuccess: isSuccessGetQuiz,
    isError: isErrorGetQuiz,
    error: errorGetQuiz,
    data: dataGetQuiz,
  } = useGetQuizQuery(quizId ?? '', {
    skip: quizId === undefined, //Halt automatic fetching until a valid quizId is available.
  });

  const handleCreatePlay = () => {
    if (quizId) {
      const payload: ICreatePlayPayload = { quizId: quizId };
      createPlay(payload);
    }
  };

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
    if (createPlayIsSuccess) {
      if (createPlayData) {
        navigate(`/lobby/${createPlayData._id}`);
      }
    }
  }, [createPlayIsSuccess]);

  useEffect(() => {
    if (createPlayIsError && createPlayError) {
      const { message } = handleServerError(createPlayError);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [createPlayIsError, createPlayError]);
  return (
    <>
      <div className="w-full h-screen flex flex-col bg-secondary-500">
        <img className="mx-auto h-24 w-auto" src={LOGO} alt="Fahoot" />
        {isLoadingGetQuiz || !quiz ? (
          <p className="text-white font-bold w-full h-full flex justify-center items-center">Creating Please wait...</p>
        ) : (
          <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8">
              <div className="w-full rounded-lg shadow-lg text-center">
                <div className="w-full p-4 bg-white text-6xl text-primary-500 font-bold capitalize">{quiz.title}</div>
                <div className="w-full p-4 bg-primary-500 text-4xl text-white font-bold">Select a mode</div>
              </div>
              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <GameMode imageSrc="https://fahoot-spaces.nyc3.cdn.digitaloceanspaces.com/uploads/assets/images/classic_mode.jpg" onClick={handleCreatePlay} text="Classic Mode" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreatePlay;
