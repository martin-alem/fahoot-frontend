import { useState } from 'react';
import Pin from './Pin';
import GameNickName from './NickName';
import useTitle from '../../hooks/useTitle';

const JoinGame: React.FC = () => {
  useTitle('Join Game');
  const [page, setPage] = useState<string>('pin');

  return (
    <>
      {page === 'pin' && <Pin setPage={setPage} />}
      {page === 'nick_name' && <GameNickName />}
    </>
  );
};

export default JoinGame;
