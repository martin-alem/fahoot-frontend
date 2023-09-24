/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import Logo from "./../../assets/Fahoot Logo.svg";
import { useResetPasswordMutation } from "../../api/security.api";
import { useEffect, useState } from "react";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../utils/constant";
import { validatePassword } from "../../utils/input_validation";
import { toast } from "react-toastify";
import { IResetPasswordPayload } from "../../utils/types";
import { serverErrors } from "../../utils/util";
import Input from "../../components/input/input";
import { ArrowSmallRightIcon, KeyIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import useQuery from "../../hooks/useQuery";

const ResetPassword: React.FC = () => {
  useTitle("Password Reset");
  const navigate = useNavigate();
  const query = useQuery();

  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation();

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validConfirmPassword, setValidConfirmPassword] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const result = validatePassword(password);
    !result && password ? setPasswordError(ERROR_MESSAGES.INVALID_PASSWORD) : setPasswordError(undefined);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = validatePassword(confirmPassword) && password === confirmPassword;
    !result && password ? setConfirmPasswordError(ERROR_MESSAGES.INVALID_PASSWORD) : setConfirmPasswordError(undefined);
    setValidConfirmPassword(result);
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    if (!validPassword || !validConfirmPassword) {
      toast.error("Some input fields are invalid. Please check again", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    const payload: IResetPasswordPayload = {
      password,
      token: query.get("token") || "",
    };
    resetPassword(payload);
  };

  useEffect(() => {
    let timerId: number;

    if (isSuccess) {
      setPassword("");
      setConfirmPassword("");
      toast.info(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS, { position: toast.POSITION.TOP_CENTER });
      timerId = setTimeout(() => navigate("/"), 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      const statusCode = error && "status" in error ? error.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={Logo} alt="Fahoot" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-500">Password Reset</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  handleOnChange={(e) => setPassword(e.target.value)}
                  handleOnBlur={() => toast.error(passwordError, { position: toast.POSITION.TOP_CENTER })}
                  error={passwordError}
                  name="password"
                  placeholder="Enter your new password"
                  label="New password"
                  prefixIcon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>

              <div>
                <Input
                  id="confirm_password"
                  type="password"
                  value={confirmPassword}
                  handleOnChange={(e) => setConfirmPassword(e.target.value)}
                  handleOnBlur={() => toast.error(confirmPasswordError, { position: toast.POSITION.TOP_CENTER })}
                  error={confirmPasswordError}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  label="Confirm password"
                  prefixIcon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>
              <div>
                <Button
                  label="Reset password"
                  type="primary"
                  loading={isLoading}
                  handleClick={handleSubmit}
                  disabled={!validPassword || !validConfirmPassword || isLoading}
                  suffixIcon={<ArrowSmallRightIcon className="w-6" />}
                />
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Remembered your password?{" "}
            <Link to="/" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
