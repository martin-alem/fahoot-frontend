import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import { useClearRememberMeMutation } from '../../../api/auth.api';
import { SUCCESS_MESSAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { handleServerError } from '../../../utils/util';
import { CLEAR_REMEMBER_ME_ERROR } from '../../../utils/error_messages';

const ClearRememberMe: React.FC = () => {
  const [clearRememberMe, { isLoading, isSuccess, isError, error }] = useClearRememberMeMutation();

  const handleClearRememberMeSubmit = async () => {
    clearRememberMe(null);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.info(SUCCESS_MESSAGES.CLEAR_REMEMBER_ME_SUCCESS, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const errorMessage = handleServerError(error.status, CLEAR_REMEMBER_ME_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError, error]);
  return (
    <>
      <div className="mt-8 sm:max-w-xl">
        <Button label="Clear Remember Me" type="primary" loading={isLoading} handleClick={handleClearRememberMeSubmit} suffixIcon={<TrashIcon className="w-6" />} />
      </div>
    </>
  );
};

export default ClearRememberMe;
