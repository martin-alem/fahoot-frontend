/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreatePlayMutation } from '../../api/play.api';
import { loadPlay } from '../../slices/play.slice';
import { RootState } from '../../store';
import { CREATE_PLAY_ERROR } from '../../utils/error_messages';
import { ICreatePlayPayload } from '../../utils/types';
import { handleServerError } from '../../utils/util';
import Logo from './../../assets/Fahoot Logo.svg';
import useTitle from '../../hooks/useTitle';

const CreatePlay: React.FC = () => {
  useTitle('Creating Play');
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const play = useSelector((state: RootState) => state.playState.play);

  const [createPlay, { isSuccess: createPlayIsSuccess, isError: createPlayIsError, error: createPlayError, data: createPlayData }] = useCreatePlayMutation();
  useEffect(() => {
    if (quizId && !play) {
      const payload: ICreatePlayPayload = { quizId: quizId };
      createPlay(payload);
      return;
    }

    navigate(`/dashboard`);
  }, []);

  useEffect(() => {
    if (createPlayIsSuccess) {
      if (createPlayData) {
        dispatch(loadPlay(createPlayData));
        navigate(`/lobby/${createPlayData._id}`);
      }
    }
  }, [createPlayIsSuccess]);

  useEffect(() => {
    if (createPlayIsError && createPlayError) {
      if ('status' in createPlayError) {
        const errorMessage = handleServerError(createPlayError.status, CREATE_PLAY_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
      navigate(`/dashboard`);
    }
  }, [createPlayIsError, createPlayError]);
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-secondary-500">
        <img className="mx-auto h-24 w-auto animate-bounce" src={Logo} alt="Fahoot" />
        <p className="text-white font-bold">Creating...</p>
      </div>
    </>
  );
};

export default CreatePlay;
