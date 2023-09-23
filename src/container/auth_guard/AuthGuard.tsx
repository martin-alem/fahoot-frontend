/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { saveAuth } from "../../slices/auth.slice";
import { serverErrors } from "../../utils/util";
import { ERROR_MESSAGES } from "../../utils/constant";
import LoadingSpinner from "../../components/spinner/Spinner";
import { useGetUserQuery } from "../../api/user.api";

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
    if (isError) {
      const statusCode = error && "status" in error ? error.status : 500;
      const errorMessage = serverErrors(statusCode);
      if (statusCode === 403) {
        toast.error(ERROR_MESSAGES.AUTH_ERROR, { position: toast.POSITION.TOP_CENTER });
        navigate("/");
      } else {
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner />;

  return <>{children}</>;
};
