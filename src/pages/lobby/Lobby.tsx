/* eslint-disable react-hooks/exhaustive-deps */
import { LockOpenIcon } from '@heroicons/react/20/solid';
import Button from '../../components/button/Button';
import Player from '../../components/player/Player';
import useTitle from '../../hooks/useTitle';
import PlayerCount from '../../components/player_count/PlayerCount';
import { ChevronDoubleRightIcon, LockClosedIcon, PauseCircleIcon, PlayCircleIcon, SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import usePlayAudio from '../../hooks/usePlayAudio';
import { useGetPlayQuery } from '../../api/play.api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addPlayer, loadPlay, loadPlayers, removePlayer } from '../../slices/play.slice';
import useSocketEvents from '../../hooks/useSocketEvents';
import { useSocket } from '../../hooks/useSocket';
import { Events, PLAY_NAMESPACE } from '../../utils/constant';
import { IEventData, IPlay, IPlayer } from '../../utils/types';
import { handleServerError } from '../../utils/util';
import { useGetPlayersQuery } from '../../api/player.api';

const Lobby: React.FC = () => {
  useTitle('Lobby');
  const { playId } = useParams();
  const dispatch = useDispatch();
  const play = useSelector((state: RootState) => state.playState.play);
  const players = useSelector((state: RootState) => state.playState.players);
  const { audioRef, togglePlayPause, isPlaying } = usePlayAudio();
  const [connected, setConnected] = useState(false);

  const { isLoading: getPlayIsLoading, isSuccess: getPlayIsSuccess, isError: getPlayIsError, error: getPlayError, data: getPlayData } = useGetPlayQuery();

  const { isLoading: getPlayersIsLoading, isSuccess: getPlayersIsSuccess, isError: getPlayersIsError, error: getPlayersError, data: getPlayersData } = useGetPlayersQuery();

  const socket = useSocket();
  useSocketEvents(Events.ERROR, socket);
  useSocketEvents(Events.CONNECTED, socket, () => setConnected(true));
  useSocketEvents(Events.DISCONNECTED, socket, () => setConnected(false));
  useSocketEvents(Events.PLAYER_JOINED, socket, (payload: IEventData) => dispatch(addPlayer(payload.data as IPlayer)));
  useSocketEvents(Events.LOCK_GAME, socket, (payload: IEventData) => dispatch(loadPlay(payload.data as IPlay)));
  useSocketEvents(Events.REMOVE_PLAYER, socket, (payload: IEventData) => dispatch(removePlayer(payload.data as IPlayer)));

  const handleLockGame = () => {
    const payload = {
      event: Events.LOCK_GAME,
      data: { isOpen: !play?.isOpen },
      room: playId,
      recipient: null,
      timestamp: new Date().toUTCString(),
      namespace: PLAY_NAMESPACE,
    };
    socket?.emit(Events.LOCK_GAME, payload);
  };

  const handleRemovePlayer = (playerId: string) => {
    const payload = {
      event: Events.REMOVE_PLAYER,
      data: playerId,
      room: playId,
      recipient: null,
      timestamp: new Date().toUTCString(),
      namespace: PLAY_NAMESPACE,
    };
    socket?.emit(Events.REMOVE_PLAYER, payload);
  };

  useEffect(() => {
    if (getPlayIsSuccess && getPlayData) {
      dispatch(loadPlay(getPlayData));
    }
  }, [getPlayIsSuccess, getPlayData]);

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
          <PlayerCount count={players?.length ?? 0} />
          <div className="flex justify-between gap-2 items-center">
            <Button type="secondary" label="Music" prefixIcon={isPlaying ? <PauseCircleIcon className="w-6" /> : <PlayCircleIcon className="w-6" />} handleClick={togglePlayPause} />
            <Button
              type="primary"
              disabled={!play || getPlayIsLoading}
              loading={!play || getPlayIsLoading}
              label={play && play.isOpen ? 'Lock' : 'Open'}
              prefixIcon={play && play.isOpen ? <LockOpenIcon className="w-6" /> : <LockClosedIcon className="w-6" />}
              handleClick={handleLockGame}
            />
            <Button type="primary" disabled={!play || getPlayIsLoading} loading={!play || getPlayIsLoading} label="Start" prefixIcon={<ChevronDoubleRightIcon className="w-6" />} />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <>
              {!players || players.length === 0 || getPlayersIsLoading ? (
                <div className="w-full h-full flex justify-center items-center text-primary-500 text-2xl">Waiting for players...</div>
              ) : (
                <ul role="list" className="overflow-y-auto w-full mt-3 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6 lg:grid-cols-4">
                  {players.map((player) => (
                    <Player key={player._id} player={player} removePlayer={handleRemovePlayer} isRemovable />
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

export default Lobby;
