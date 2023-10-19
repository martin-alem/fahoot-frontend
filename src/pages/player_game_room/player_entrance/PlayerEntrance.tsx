import { useState } from 'react';
import { Events, GameStage } from '../../../utils/constant';
import PlayerLobby from '../player_lobby/PlayerLobby';
import Question from '../question/Question';
import ResponsePending from '../response_pending/ResponsePending';
import Result from '../result/Result';
import WaitPeriod from '../wait_period/WaitPeriod';
import { useSocket } from '../../../hooks/useSocket';
import useSocketEvents from '../../../hooks/useSocketEvents';

const GameEntrance: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.LOBBY);
  const [connected, setConnected] = useState<boolean>(false);

  const socket = useSocket();
  useSocketEvents(Events.ERROR, socket);
  useSocketEvents(Events.CONNECTED, socket, () => setConnected(true));
  useSocketEvents(Events.DISCONNECTED, socket, () => setConnected(false));
  return (
    <>
      {gameStage === GameStage.LOBBY && <PlayerLobby socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.WAIT_PERIOD && <WaitPeriod duration={5} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.QUESTION && <Question socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.RESPONSE_PENDING && <ResponsePending duration={10} socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.RESULT && <Result socket={socket} connected={connected} setGameStage={setGameStage} />}
    </>
  );
};

export default GameEntrance;
