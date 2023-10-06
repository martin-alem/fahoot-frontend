/* eslint-disable react-hooks/exhaustive-deps */
import { LockOpenIcon } from '@heroicons/react/20/solid';
import Button from '../../components/button/Button';
import Player from '../../components/player/Player';
import useTitle from '../../hooks/useTitle';
import PlayerCount from '../../components/player_count/PlayerCount';
import LobbyMusic from './../../assets/audio/lobby/Verano Sensual.mp3';
import { ChevronDoubleRightIcon, LockClosedIcon, PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import usePlayAudio from '../../hooks/usePlayAudio';
import { useGetPlayQuery } from '../../api/play.api';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleServerError } from '../../utils/util';
import { CREATE_PLAY_ERROR } from '../../utils/error_messages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { loadPlay } from '../../slices/play.slice';

const Lobby: React.FC = () => {
  useTitle('Lobby');
  const { playId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const play = useSelector((state: RootState) => state.playState.play);
  const { audioRef, togglePlayPause, isPlaying } = usePlayAudio();

  const {
    isLoading: getPlayIsLoading,
    isSuccess: getPlayIsSuccess,
    isError: getPlayIsError,
    error: getPlayError,
    data: getPlayData,
  } = useGetPlayQuery(
    { playId: playId ?? '' },
    {
      skip: playId === undefined,
    },
  );

  useEffect(() => {
    if (getPlayIsSuccess && getPlayData) {
      dispatch(loadPlay(getPlayData));
    }
  }, [getPlayIsSuccess]);

  useEffect(() => {
    if (getPlayIsError && getPlayError) {
      if ('status' in getPlayError) {
        const errorMessage = handleServerError(getPlayError.status, CREATE_PLAY_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
      navigate(`/dashboard`);
    }
  }, [getPlayIsError, getPlayError]);
  return (
    <>
      <div className="relative">
        <div className="fixed h-36 top-0 left-0 w-full p-4 flex flex-col items-center bg-secondary-500">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">PIN: {getPlayIsLoading || !play ? 'Loading...' : play.code}</h1>
          <p className="mt-6 text-lg leading-8 text-white">
            Go to: <span className="text-primary-500 underline">https://fahoot.com/join</span>
          </p>
        </div>
        <div className="w-full flex justify-between items-center pt-40 px-4">
          <PlayerCount />
          <div className="flex justify-between gap-2 items-center">
            <Button type="secondary" label="Music" prefixIcon={isPlaying ? <PauseCircleIcon className="w-6" /> : <PlayCircleIcon className="w-6" />} handleClick={togglePlayPause} />
            <Button
              type="primary"
              disabled={!play || getPlayIsLoading}
              loading={!play || getPlayIsLoading}
              label="Lock"
              prefixIcon={play && play.isOpen ? <LockClosedIcon className="w-6" /> : <LockOpenIcon className="w-6" />}
            />
            <Button type="primary" disabled={!play || getPlayIsLoading} loading={!play || getPlayIsLoading} label="Start" prefixIcon={<ChevronDoubleRightIcon className="w-6" />} />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ul role="list" className="overflow-y-auto w-full mt-3 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6 lg:grid-cols-4">
              <Player />
            </ul>
          </div>
        </div>
        <audio ref={audioRef} autoPlay src={LobbyMusic} loop />
        <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white text-center p-4">Waiting for players to connect...</div>
      </div>
    </>
  );
};

export default Lobby;
