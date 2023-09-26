import { Dialog } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IPromptProps } from '../../utils/types';
import Button from '../button/Button';

const Prompt: React.FC<IPromptProps> = ({
  title,
  description,
  okFunction,
  cancelFunction,
  isLoading = false,
}) => {
  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900 capitalize"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:flex-row-reverse">
        <Button
          label="Ok"
          type="danger"
          loading={isLoading}
          handleClick={okFunction}
          suffixIcon={<CheckIcon className="w-6" />}
        />
        <Button
          label="Cancel"
          type="secondary"
          handleClick={cancelFunction}
          suffixIcon={<XMarkIcon className="w-6" />}
        />
      </div>
    </>
  );
};

export default Prompt;
