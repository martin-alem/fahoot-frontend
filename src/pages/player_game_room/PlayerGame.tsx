import { useState } from 'react';
import useSocketEvents from '../../hooks/useSocketEvents';
import { GameStage, Events } from '../../utils/constant';
import GamePin from './game_pin/GamePin';
import PlayerNickName from './player_nickname/PlayerNickName';
import PlayerLobby from './player_lobby/PlayerLobby';
import WaitPeriod from './wait_period/WaitPeriod';
import Question from './question/Question';
import ResponsePending from './response_pending/ResponsePending';
import Result from './result/Result';
import { Socket } from 'socket.io-client';

const PlayerGameRoom: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.GAME_PIN);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useSocketEvents(Events.ERROR, socket);
  useSocketEvents(Events.CONNECTED, socket, () => setConnected(true));
  useSocketEvents(Events.DISCONNECTED, socket, () => {
    if (socket) {
      socket.connect();
      setSocket(socket);
    }
  });

  return (
    <>
      {gameStage === GameStage.GAME_PIN && <GamePin setGameStage={setGameStage} />}
      {gameStage === GameStage.PLAYER_NICKNAME && <PlayerNickName setGameStage={setGameStage} />}
      {gameStage === GameStage.LOBBY && <PlayerLobby setSocket={setSocket} setConnected={setConnected} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.WAIT_PERIOD && <WaitPeriod duration={5} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.QUESTION && <Question socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.RESPONSE_PENDING && <ResponsePending duration={10} socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.RESULT && <Result socket={socket} connected={connected} setGameStage={setGameStage} />}
    </>
  );
};

export default PlayerGameRoom;
