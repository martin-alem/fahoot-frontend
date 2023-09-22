/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/auth.api";
import { useEffect } from "react";
import { deleteAuth } from "../../slices/auth.slice";
import { serverErrors } from "../../utils/util";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/spinner/Spinner";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout, { isSuccess, isError, error, isLoading }] = useLogoutMutation();

  useEffect(() => {
    logout(null);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(deleteAuth());
      navigate("/");
    }
  }, [isSuccess, isError, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      const statusCode = error && "status" in error ? error.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);

  return <>{isLoading && <LoadingSpinner />}</>;
};

export default Logout;
