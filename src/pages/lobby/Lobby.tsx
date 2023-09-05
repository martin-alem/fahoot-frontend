import { LockOpenIcon, UserIcon } from "@heroicons/react/20/solid";
import Button from "../../components/button/Button";
import Player from "../../components/player/Player";

const Lobby: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-full p-4 flex flex-col items-center bg-secondary-500">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">PIN: 834 839</h1>
        <p className="mt-6 text-lg leading-8 text-white">
          Go to: <span className="text-primary-500 underline">https://fahoot.com/join</span>
        </p>
      </div>
      <div className="w-full flex justify-between items-center p-4">
        <div className="flex justify-between items-center">
          <UserIcon className="w-12" />
          <span className="text-secondary-500 font-semibold text-4xl">0</span>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <Button type="primary" label="Lock" prefixIcon={<LockOpenIcon className="w-6" />} />
          <Button type="primary" label="Start" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul role="list" className="w-full mt-3 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6 lg:grid-cols-4">
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
          </ul>
        </div>
      </div>

      <div className="fixed h-12 bottom-0 left-0 w-full bg-secondary-500 text-white text-center p-4">Waiting for players to connect...</div>
    </div>
  );
};

export default Lobby;
