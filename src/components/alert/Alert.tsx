import { BellAlertIcon } from '@heroicons/react/20/solid';
import { IAlertProps } from '../../utils/types';
import { Link } from 'react-router-dom';

const Alert: React.FC<IAlertProps> = ({
  bgColor,
  iconColor,
  headingColor,
  descriptionColor,
  heading,
  description,
  action,
  actionText,
  actionLoading,
}) => {
  return (
    <div className={`rounded-md ${bgColor} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <BellAlertIcon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${headingColor}`}>{heading}</h3>
          <div className={`mt-2 text-sm ${descriptionColor}`}>
            <p>{description}</p>
          </div>
          {action && actionText && (
            <>
              {actionLoading ? (
                <span className="italic text-secondary-500">Sending...</span>
              ) : (
                <Link to="#" onClick={() => action()} className="italic text-secondary-500 underline text-sm">
                  {actionText}
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
