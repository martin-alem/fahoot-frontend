/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { saveAuth } from '../../slices/auth.slice';
import { handleServerError } from '../../utils/util';
import LoadingSpinner from '../../components/spinner/Spinner';
import { useGetUserQuery } from '../../api/user.api';
import { AUTH_GUARD_GET_USER_ERROR } from '../../utils/error_messages';

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, error, isLoading, isSuccess, isError } = useGetUserQuery({});

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAuth(data));
      if (location.state && location.state.from) {
        navigate(location.state.from);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const message = handleServerError(error.status, AUTH_GUARD_GET_USER_ERROR);
        toast.error(message, { position: toast.POSITION.TOP_CENTER });
        if (error.status === 401) {
          //If trying to get an authenticated user returns a 401 they should be logged out
          navigate('/');
        }
      }
    }
  }, [isError, error]);

  if (isLoading) return <LoadingSpinner />;

  return <>{children}</>;
};
