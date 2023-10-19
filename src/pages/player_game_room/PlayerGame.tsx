import { useState } from 'react';
import { GameStage } from '../../utils/constant';
import GamePin from './game_pin/GamePin';
import PlayerNickName from './player_nickname/PlayerNickName';
import GameEntrance from './player_entrance/PlayerEntrance';

const PlayerGameRoom: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.GAME_PIN);

  return (
    <>
      {gameStage === GameStage.GAME_PIN && <GamePin setGameStage={setGameStage} />}
      {gameStage === GameStage.PLAYER_NICKNAME && <PlayerNickName setGameStage={setGameStage} />}
      {gameStage === GameStage.PLAYER_ENTRANCE && <GameEntrance />}
    </>
  );
};

export default PlayerGameRoom;
