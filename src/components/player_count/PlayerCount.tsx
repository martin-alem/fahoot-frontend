import { UserIcon } from '@heroicons/react/24/outline';

type PlayerCountProps = {
  textColor?: string;
  count: number;
};
const PlayerCount: React.FC<PlayerCountProps> = ({ textColor, count }) => {
  return (
    <>
      <div className={`flex justify-between items-center ${textColor}`}>
        <UserIcon className="w-12" />
        <span className="font-semibold text-4xl">{count}</span>
      </div>
    </>
  );
};

export default PlayerCount;
