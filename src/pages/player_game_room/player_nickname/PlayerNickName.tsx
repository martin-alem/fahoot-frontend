import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreatePlayerMutation } from '../../../api/player.api';
import { addPlayer } from '../../../slices/play.slice';
import { GameStage, LOGO } from '../../../utils/constant';
import { handleServerError } from '../../../utils/util';
import { RootState } from '../../../store';
import { IPlayerNickNameProps } from '../../../utils/types';

const PlayerNickName: React.FC<IPlayerNickNameProps> = ({ setGameStage }) => {
  const [name, setName] = useState('');
  const play = useSelector((state: RootState) => state.playState.play);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [joinGame, { isLoading, isSuccess, isError, error, data }] = useCreatePlayerMutation();

  const handleJoinGame = () => {
    if (!name) {
      toast.error('Please enter a nick name', { position: toast.POSITION.TOP_CENTER });
      return;
    }
    const payload = {
      playId: play?._id ?? '',
      nickName: name,
    };

    joinGame(payload);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addPlayer(data));
      setGameStage(GameStage.LOBBY);
    }
  }, [data, dispatch, isSuccess, navigate, play?._id, setGameStage]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-secondary-500">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto animate-bounce" src={LOGO} alt="Fahoot" />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="space-y-6">
              <div>
                <div className="mt-2">
                  <input
                    id="nick_name"
                    name="nick_name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoComplete="off"
                    placeholder="Nick name"
                    className="block w-full rounded-md border-0 py-4 text-center text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-4xl sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleJoinGame}
                  disabled={isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-4 text-4xl font-semibold leading-6 text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 ease-linear"
                >
                  {isLoading ? <ArrowPathIcon className="w-6 animate-spin" /> : 'Ok, go'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerNickName;
