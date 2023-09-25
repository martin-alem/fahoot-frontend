import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { IButtonProps } from '../../utils/types';

const Button: React.FC<IButtonProps> = ({
  label,
  type = 'primary',
  prefixIcon,
  suffixIcon,
  action = 'button',
  handleClick,
  disabled = false,
  loading = false,
}) => {
  let buttonClasses = '';
  const disabledClass = 'text-gray-500 border-gray-500 bg-transparent cursor-not-allowed';
  switch (type) {
    case 'primary':
      buttonClasses =
        'text-primary-500 border-primary-500 bg-transparent hover:bg-primary-500 hover:border-primary-500 hover:text-white';
      break;
    case 'secondary':
      buttonClasses =
        'text-secondary-500 border-secondary-500 bg-transparent hover:bg-secondary-500 hover:border-secondary-500 hover:text-white';
      break;
    case 'danger':
      buttonClasses =
        'text-red-500 border-red-500 bg-transparent hover:bg-red-500 hover:border-red-500 hover:text-white';
  }

  return (
    <button
      disabled={disabled}
      type={action}
      onClick={handleClick}
      className={`w-full rounded-md border-b-4 px-4 py-2.5 text-md font-bold border-2 transition duration-300 ease-linear ${
        disabled ? disabledClass : buttonClasses
      }`}
    >
      <div className="flex justify-center items-center gap-x-1">
        {prefixIcon}
        {loading ? (
          <div className="flex items-center gap-2">
            <ArrowPathIcon className="w-6 animate-spin" />
          </div>
        ) : (
          <span className="hidden md:inline-block">{label}</span>
        )}
        {suffixIcon}
      </div>
    </button>
  );
};

export default Button;
