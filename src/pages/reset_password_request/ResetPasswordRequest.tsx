/* eslint-disable react-hooks/exhaustive-deps */
import useTitle from "../../hooks/useTitle";
import Logo from "./../../assets/Fahoot Logo.svg";
import Alert from "../../components/alert/Alert";
import { useResetPasswordRequestMutation } from "../../api/security.api";
import { validateEmail } from "../../utils/input_validation";
import { ERROR_MESSAGES } from "../../utils/constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IResetPasswordRequestPayload } from "../../utils/types";
import { serverErrors } from "../../utils/util";
import Input from "../../components/input/input";
import { ArrowSmallRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";

const ResetPasswordRequest: React.FC = () => {
  useTitle("Password Reset Request");

  const [resetPasswordRequest, { isLoading, isSuccess, isError, error }] = useResetPasswordRequestMutation();

  const [resetSuccessfull, setResetSuccessfull] = useState(false);

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);
  const [emailAddressError, setEmailAddressError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const result = validateEmail(emailAddress);
    !result && emailAddress ? setEmailAddressError(ERROR_MESSAGES.INVALID_EMAIL) : setEmailAddressError(undefined);
    setValidEmailAddress(result);
  }, [emailAddress]);

  const handleSubmit = async () => {
    if (!validEmailAddress) {
      toast.error("Some input fields are invalid. Please check again", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    const payload: IResetPasswordRequestPayload = {
      emailAddress,
    };
    resetPasswordRequest(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setResetSuccessfull(true);
      setEmailAddress("");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      setResetSuccessfull(false);
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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-500">Password Reset Request</h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">{resetSuccessfull && <Alert />}</div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <Input
                  id="email"
                  type="email"
                  value={emailAddress}
                  handleOnChange={(e) => setEmailAddress(e.target.value)}
                  handleOnBlur={() => toast.error(emailAddressError, { position: toast.POSITION.TOP_CENTER })}
                  error={emailAddressError}
                  name="email"
                  placeholder="john.smith@domain.com"
                  label="Email"
                  prefixIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>
              <div>
                <Button
                  label="Request reset"
                  type="primary"
                  loading={isLoading}
                  handleClick={handleSubmit}
                  disabled={!validEmailAddress || isLoading}
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

export default ResetPasswordRequest;
