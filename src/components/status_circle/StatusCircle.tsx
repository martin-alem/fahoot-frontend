import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

type StatusCircleProp = {
  status: boolean;
};
const StatusCircle: React.FC<StatusCircleProp> = ({ status }) => {
  return (
    <>
      <div className="w-20 h-20 bg-secondary-500 p-6 rounded-full flex items-center justify-center">
        {!status ? <XMarkIcon className="w-20 text-red-500" /> : <CheckIcon className="w-20 text-green-500" />}
      </div>
    </>
  );
};

export default StatusCircle;
