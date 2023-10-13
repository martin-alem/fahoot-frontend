/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { saveAuth } from '../../slices/auth.slice';
import LoadingSpinner from '../../components/spinner/Spinner';
import { useGetUserQuery } from '../../api/user.api';
import {USER_ROLE } from '../../utils/constant';
import { handleServerError } from '../../utils/util';

type AuthGuardProps = {
  children: React.ReactNode;
  roles?: USER_ROLE[];
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, roles }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, error, isLoading, isSuccess, isError } = useGetUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(saveAuth(data));

      const shouldNavigate = roles ? roles.includes(data.role) : true;

      if (shouldNavigate) {
        if (location.state && location.state.from) navigate(location.state.from);
      } else {
        toast.error('You are not authorized to access this route.', { position: toast.POSITION.TOP_CENTER });
        navigate('/');
      }
    }
  }, [isSuccess, roles, dispatch, location.state]);

  useEffect(() => {
    if (isError && error) {
      const { statusCode, message } = handleServerError(error);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
      if (statusCode === 401) {
        navigate('/');
      }
    }
  }, [isError, error]);

  if (isLoading) return <LoadingSpinner />;

  return <>{children}</>;
};
