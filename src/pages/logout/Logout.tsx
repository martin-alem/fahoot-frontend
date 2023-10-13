/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../api/auth.api';
import { useEffect } from 'react';
import { deleteAuth } from '../../slices/auth.slice';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinner/Spinner';
import { RootState } from '../../store';
import { handleServerError } from '../../utils/util';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.authUser.user);
  const [logout, { isSuccess, isError, error, isLoading }] = useLogoutMutation();

  useEffect(() => {
    logout(null);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: () => null,
      });
      window.google.accounts.id.revoke(user?.emailAddress ?? '', () => {
        dispatch(deleteAuth());
        navigate('/');
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);

  return <>{isLoading && <LoadingSpinner />}</>;
};

export default Logout;
