import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetPlayByPinQuery } from '../../../api/play.api';
import { loadPlay } from '../../../slices/play.slice';
import { GameStage, LOGO } from '../../../utils/constant';
import { handleServerError } from '../../../utils/util';
import { IGamePinProps } from '../../../utils/types';

const GamePin: React.FC<IGamePinProps> = ({ setGameStage }) => {
  const [pin, setPin] = useState('');
  const [notReady, setNotReady] = useState(true); // Manually issue a get request to find a game play.

  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, error, data } = useGetPlayByPinQuery({ pin }, { skip: notReady });

  const handleGetPlay = () => {
    if (!pin) {
      toast.error('Please enter a game pin', { position: toast.POSITION.TOP_CENTER });
      return;
    }
    setNotReady(false);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setNotReady(true);
      dispatch(loadPlay(data));
      setGameStage(GameStage.PLAYER_NICKNAME);
    }
  }, [data, dispatch, isSuccess, setGameStage]);

  useEffect(() => {
    if (isError && error) {
      setNotReady(true);
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
                    id="pin"
                    name="pin"
                    type="text"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    autoComplete="off"
                    placeholder="Game PIN"
                    required
                    className="block w-full rounded-md border-0 py-4 text-center text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-4xl sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleGetPlay}
                  disabled={isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-4 text-4xl font-semibold leading-6 text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 ease-linear"
                >
                  {isLoading ? <ArrowPathIcon className="w-6 animate-spin" /> : 'Enter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePin;
