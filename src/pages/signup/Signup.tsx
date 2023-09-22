import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import Logo from "./../../assets/Fahoot Logo.svg";
import Button from "../../components/button/Button";
import { ArrowRightIcon, EnvelopeIcon, KeyIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useManualSignUpMutation } from "../../api/auth.api";
import { validateEmail, validateName, validatePassword } from "../../utils/input_validation";
import { ERROR_MESSAGES } from "../../utils/constant";
import Input from "../../components/input/input";
import { IManualSignupPayload } from "../../utils/types";
import { serverErrors } from "../../utils/util";
import { saveAuth } from "../../slices/auth.slice";

const SignUp: React.FC = () => {
  useTitle("Create Account");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [manualSignUp, { isLoading, isSuccess, isError, error, data }] = useManualSignUpMutation();

  const [firstName, setFirstName] = useState<string>("");
  const [validFirstName, setValidFirstName] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);

  const [lastName, setLastName] = useState<string>("");
  const [validLastName, setValidLastName] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);
  const [emailAddressError, setEmailAddressError] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const result = validateName(firstName);
    !result && firstName ? setFirstNameError(ERROR_MESSAGES.INVALID_NAME) : setFirstNameError(undefined);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = validateName(lastName);
    !result && lastName ? setLastNameError(ERROR_MESSAGES.INVALID_NAME) : setLastNameError(undefined);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    const result = validateEmail(emailAddress);
    !result && emailAddress ? setEmailAddressError(ERROR_MESSAGES.INVALID_EMAIL) : setEmailAddressError(undefined);
    setValidEmailAddress(result);
  }, [emailAddress]);

  useEffect(() => {
    const result = validatePassword(password);
    !result && password ? setPasswordError(ERROR_MESSAGES.INVALID_PASSWORD) : setPasswordError(undefined);
    setValidPassword(result);
  }, [password]);

  const handleSubmit = async () => {
    if (!validFirstName || !validLastName || !validEmailAddress || !validPassword) {
      toast.error("Some input fields are invalid. Please check again", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    const payload: IManualSignupPayload = {
      firstName,
      lastName,
      emailAddress,
      password,
      authenticationMethod: "manual",
    };
    manualSignUp(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAuth(data.data));
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, dispatch, navigate]);

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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-500">Sign up for a new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div className="flex items-center justify-between gap-x-5">
                <div>
                  <Input
                    id="first_name"
                    type="text"
                    value={firstName}
                    handleOnChange={(e) => setFirstName(e.target.value)}
                    handleOnBlur={() => toast.error(firstNameError, { position: toast.POSITION.TOP_CENTER })}
                    error={firstNameError}
                    name="first_name"
                    placeholder="John"
                    label="First name"
                    prefixIcon={<UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                  />
                </div>

                <div>
                  <Input
                    id="last_name"
                    type="text"
                    value={lastName}
                    handleOnChange={(e) => setLastName(e.target.value)}
                    handleOnBlur={() => toast.error(lastNameError, { position: toast.POSITION.TOP_CENTER })}
                    error={lastNameError}
                    name="last_name"
                    placeholder="Smith"
                    label="Last name"
                    prefixIcon={<UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                  />
                </div>
              </div>

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
                <Input
                  id="password"
                  type="password"
                  value={password}
                  handleOnChange={(e) => setPassword(e.target.value)}
                  handleOnBlur={() => toast.error(passwordError, { position: toast.POSITION.TOP_CENTER })}
                  error={passwordError}
                  name="password"
                  placeholder="Enter your password"
                  label="Password"
                  prefixIcon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                />
              </div>

              <div>
                <Button
                  label="Sign up"
                  type="primary"
                  loading={isLoading}
                  handleClick={handleSubmit}
                  disabled={!validFirstName || !validLastName || !validEmailAddress || !validPassword || isLoading}
                  suffixIcon={<ArrowRightIcon className="w-6" />}
                />
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-secondary-900">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">Google</span>
                </a>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link to="/" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
