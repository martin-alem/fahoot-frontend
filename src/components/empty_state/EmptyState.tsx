import { IEmptyStateProps } from '../../utils/types';
import Button from '../button/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const EmptyState: React.FC<IEmptyStateProps> = ({ icon, heading, description, action }) => {
  return (
    <div className="mt-12 text-center flex flex-col items-center justify-center">
      <div>{icon}</div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{heading}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        {action && (
          <Button
            label="Create quiz"
            type="primary"
            suffixIcon={<ArrowRightIcon className="w-6" />}
            handleClick={action}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
