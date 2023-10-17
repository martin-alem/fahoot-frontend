import { useState } from 'react';
import { Events, GameStage } from '../../utils/constant';
import Lobby from './lobby/Lobby';
import WaitPeriod from './wait_period/WaitPeriod';
import Question from './question/Question';
import Result from './result/Result';
import { useSocket } from '../../hooks/useSocket';
import useSocketEvents from '../../hooks/useSocketEvents';

const Game: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.LOBBY);
  const [connected, setConnected] = useState(false);

  const socket = useSocket();
  useSocketEvents(Events.ERROR, socket);
  useSocketEvents(Events.CONNECTED, socket, () => setConnected(true));
  useSocketEvents(Events.DISCONNECTED, socket, () => setConnected(false));

  return (
    <>
      {gameStage === GameStage.LOBBY && <Lobby socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.WAIT_PERIOD && <WaitPeriod connected={connected} setGameStage={setGameStage} duration={5} />}
      {gameStage === GameStage.QUESTION && <Question socket={socket} connected={connected} setGameStage={setGameStage} />}
      {gameStage === GameStage.RESULT && <Result socket={socket} connected={connected} setGameStage={setGameStage} />}
    </>
  );
};

export default Game;
