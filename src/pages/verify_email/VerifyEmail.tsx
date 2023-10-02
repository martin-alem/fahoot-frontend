/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { useVerifyEmailMutation } from '../../api/security.api';
import { useEffect } from 'react';
import { SUCCESS_MESSAGES } from '../../utils/constant';
import { toast } from 'react-toastify';
import { IVerifyEmailPayload } from '../../utils/types';
import { handleServerError } from '../../utils/util';
import useQuery from '../../hooks/useQuery';
import LoadingSpinner from '../../components/spinner/Spinner';
import { VERIFY_EMAIL_ERROR } from '../../utils/error_messages';

const VerifyEmail: React.FC = () => {
  useTitle('Verifying Email');
  const navigate = useNavigate();
  const query = useQuery();

  const [verifyEmail, { isLoading, isSuccess, isError, error }] = useVerifyEmailMutation();

  useEffect(() => {
    if (!query.get('token')) {
      toast.error('You must have a token in order to verify your email address', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const payload: IVerifyEmailPayload = {
      token: query.get('token') || '',
    };
    verifyEmail(payload);
  }, []);

  useEffect(() => {
    let timerId: number;

    if (isSuccess) {
      toast.success(SUCCESS_MESSAGES.EMAIL_VERIFICATION_SUCCESS, {
        position: toast.POSITION.TOP_CENTER,
      });
      timerId = setTimeout(() => navigate('/'), 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const errorMessage = handleServerError(error.status, VERIFY_EMAIL_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError, error]);

  return <>{isLoading && <LoadingSpinner />}</>;
};

export default VerifyEmail;
