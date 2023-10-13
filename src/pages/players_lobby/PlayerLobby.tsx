/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../../components/button/Button';
import Player from '../../components/player/Player';
import useTitle from '../../hooks/useTitle';
import PlayerCount from '../../components/player_count/PlayerCount';
import { PauseCircleIcon, PlayCircleIcon, SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import usePlayAudio from '../../hooks/usePlayAudio';
import { useExitGameMutation, useGetPlayQuery } from '../../api/play.api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addPlayer, loadPlay, loadPlayer, loadPlayers, removePlayer } from '../../slices/play.slice';
import useSocketEvents from '../../hooks/useSocketEvents';
import { useSocket } from '../../hooks/useSocket';
import { Events, PLAY_NAMESPACE } from '../../utils/constant';
import LoadingSpinner from '../../components/spinner/Spinner';
import { IEventData, IPlay, IPlayer } from '../../utils/types';
import { handleServerError } from '../../utils/util';
import { useNavigate } from 'react-router-dom';
import { useGetPlayerQuery, useGetPlayersQuery } from '../../api/player.api';

const PlayerLobby: React.FC = () => {
  useTitle('Lobby');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const play = useSelector((state: RootState) => state.playState.play);
  const currentPlayer = useSelector((state: RootState) => state.playState.player);
  const players = useSelector((state: RootState) => state.playState.players);
  const { audioRef, togglePlayPause, isPlaying } = usePlayAudio();
  const [connected, setConnected] = useState(false);

  const { isLoading: getPlayIsLoading, isSuccess: getPlayIsSuccess, isError: getPlayIsError, error: getPlayError, data: getPlayData } = useGetPlayQuery();

  const { isLoading: getPlayersIsLoading, isSuccess: getPlayersIsSuccess, isError: getPlayersIsError, error: getPlayersError, data: getPlayersData } = useGetPlayersQuery();

  const { isSuccess: getPlayerIsSuccess, isError: getPlayerIsError, error: getPlayerError, data: getPlayerData } = useGetPlayerQuery();

  const [exitGame, { isSuccess: exitGameIsSuccess, isError: exitGameIsError, error: exitGameError }] = useExitGameMutation();

  const handlePlayerRemoved = (player: IPlayer) => {
    dispatch(removePlayer(player));
    if (player._id === currentPlayer?._id) {
      exitGame();
    }
  };

  const socket = useSocket();
  useSocketEvents(Events.ERROR, socket);
  useSocketEvents(Events.CONNECTED, socket, () => setConnected(true));
  useSocketEvents(Events.DISCONNECTED, socket, () => setConnected(false));
  useSocketEvents(Events.LOCK_GAME, socket, (payload: IEventData) => dispatch(loadPlay(payload.data as IPlay)));
  useSocketEvents(Events.REMOVE_PLAYER, socket, (payload: IEventData) => handlePlayerRemoved(payload.data as IPlayer));
  useSocketEvents(Events.PLAYER_JOINED, socket, (payload: IEventData) => dispatch(addPlayer(payload.data as IPlayer)));

  useEffect(() => {
    if (exitGameIsSuccess) {
      navigate('/join');
    }
  }, [exitGameIsSuccess]);

  useEffect(() => {
    if (exitGameIsError && exitGameError) {
      const { message } = handleServerError(exitGameError);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [exitGameIsError, exitGameError]);

  useEffect(() => {
    if (getPlayIsSuccess && getPlayData) {
      dispatch(loadPlay(getPlayData));
      const message: IEventData = {
        event: Events.PLAYER_JOINED,
        room: getPlayData._id,
        data: currentPlayer,
        namespace: PLAY_NAMESPACE,
        recipient: null,
        timestamp: new Date().toUTCString(),
      };
      socket?.emit(Events.PLAYER_JOINED, message);
    }
  }, [getPlayIsSuccess]);

  useEffect(() => {
    if (getPlayIsError && getPlayError) {
      const { message } = handleServerError(getPlayError);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [getPlayIsError, getPlayError]);

  useEffect(() => {
    if (getPlayersIsSuccess && getPlayersData) {
      dispatch(loadPlayers(getPlayersData));
    }
  }, [getPlayersIsSuccess, getPlayersData]);

  useEffect(() => {
    if (getPlayersIsError && getPlayersError) {
      const { message } = handleServerError(getPlayersError);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [getPlayersIsError, getPlayersError]);

  useEffect(() => {
    if (getPlayerIsSuccess && getPlayerData) {
      dispatch(loadPlayer(getPlayerData));
    }
  }, [getPlayerIsSuccess, getPlayerData]);

  useEffect(() => {
    if (getPlayerIsError && getPlayerError) {
      const { message } = handleServerError(getPlayerError);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [getPlayerIsError, getPlayerError]);

  return (
    <>
      <div className="relative">
        <div className="fixed h-36 top-0 left-0 w-full p-4 flex flex-col items-center bg-secondary-500">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">PIN: {!play || getPlayIsLoading ? 'Loading...' : play.code}</h1>
          <p className="mt-6 text-lg leading-8 text-white">
            Go to: <span className="text-primary-500 underline">https://fahoot.com/join</span>
          </p>
        </div>
        <div className="w-full flex justify-between items-center pt-40 px-4">
          <PlayerCount count={players?.length ?? 0} />
          <div className="flex justify-between gap-2 items-center">
            <Button type="secondary" label="Music" prefixIcon={isPlaying ? <PauseCircleIcon className="w-6" /> : <PlayCircleIcon className="w-6" />} handleClick={togglePlayPause} />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <>
              {!players || players.length === 0 || getPlayersIsLoading ? (
                <LoadingSpinner />
              ) : (
                <ul role="list" className="overflow-y-auto w-full mt-3 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6 lg:grid-cols-4">
                  {players.map((player) => (
                    <Player key={player._id} player={player} isRemovable={false} />
                  ))}
                </ul>
              )}
            </>
          </div>
        </div>
        <audio ref={audioRef} autoPlay src={play?.quiz && typeof play.quiz !== 'string' ? play.quiz.settings.lobbyMusic : undefined} loop />
        <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white flex justify-center items-center p-4">
          {connected ? <SignalIcon className="w-8 text-green-500" /> : <SignalSlashIcon className="w-8 text-red-500" />}
        </div>
      </div>
    </>
  );
};

export default PlayerLobby;
