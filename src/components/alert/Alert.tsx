import { CheckCircleIcon } from "@heroicons/react/20/solid";

const Alert: React.FC = () => {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>An email has been sent to your registered address with a link to reset your password. Check your inbox and follow the instructions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
