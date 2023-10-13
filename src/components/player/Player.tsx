import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IPlayerProps } from '../../utils/types';

const Player: React.FC<IPlayerProps> = ({ player, removePlayer, isRemovable }) => {
  return (
    <li className="w-full flex rounded-md shadow-sm">
      <div className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium bg-primary-500">
        <UserIcon className="w-8 text-white" />
      </div>
      <div className="w-full flex items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
        <div className="p-4 text-lg capitalize">{player.nickName}</div>
        <div className="flex-shrink-0 pr-2">
          {isRemovable && removePlayer && (
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span className="sr-only">Delete</span>
              <XMarkIcon onClick={() => removePlayer(player._id)} className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Player;
