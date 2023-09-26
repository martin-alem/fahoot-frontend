import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import { useClearRememberMeMutation } from '../../../api/auth.api';
import { SUCCESS_MESSAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { serverErrors } from '../../../utils/util';

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
    if (isError) {
      const statusCode = error && 'status' in error ? error.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);
  return (
    <>
      <div className="mt-8 sm:max-w-xl">
        <Button
          label="Clear Remember Me"
          type="primary"
          loading={isLoading}
          handleClick={handleClearRememberMeSubmit}
          suffixIcon={<TrashIcon className="w-6" />}
        />
      </div>
    </>
  );
};

export default ClearRememberMe;
