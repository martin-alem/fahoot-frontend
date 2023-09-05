import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";

type StatusCircleProp = {
  status: boolean;
};
const StatusCircle: React.FC<StatusCircleProp> = ({ status }) => {
  return (
    <>
      <div className="w-20 h-20 bg-primary-500 text-white p-6 rounded-full flex items-center justify-center">{status ? <HandThumbUpIcon className="w-20" /> : <HandThumbDownIcon className="w-20" />}</div>
    </>
  );
};

export default StatusCircle;
