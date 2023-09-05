import { UserIcon } from "@heroicons/react/24/outline";

type PlayerCountProps = {
  textColor?: string;
};
const PlayerCount: React.FC<PlayerCountProps> = ({ textColor }) => {
  return (
    <>
      <div className={`flex justify-between items-center ${textColor}`}>
        <UserIcon className="w-12" />
        <span className="font-semibold text-4xl">0</span>
      </div>
    </>
  );
};

export default PlayerCount;
