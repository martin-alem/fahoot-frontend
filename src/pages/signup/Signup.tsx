/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Button from '../../components/button/Button';
import { ArrowRightIcon, EnvelopeIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGoogleSignUpMutation, useManualSignUpMutation } from '../../api/auth.api';
import { validateEmail, validateName, validatePassword } from '../../utils/input_validation';
import { ERROR_MESSAGES, LOGO } from '../../utils/constant';
import Input from '../../components/input/input';
import { IGoogleOAuthPayload, IGoogleOAuthResponse, IManualSignupPayload } from '../../utils/types';
import { saveAuth } from '../../slices/auth.slice';
import useKeyboardEvent from '../../hooks/useKeyboardEvent';
import GoogleOAuth from '../../components/google_oauth/GoogleOAuth';
import { handleServerError } from '../../utils/util';

const SignUp: React.FC = () => {
  useTitle('Create Account');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [manualSignUp, { isLoading, isSuccess, isError, error, data }] = useManualSignUpMutation();
  const [googleSignUp, { isLoading: googleIsLoading, isSuccess: googleIsSuccess, isError: googleIsError, error: googleError, data: googleData }] = useGoogleSignUpMutation();

  const [firstName, setFirstName] = useState<string>('');
  const [validFirstName, setValidFirstName] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);

  const [lastName, setLastName] = useState<string>('');
  const [validLastName, setValidLastName] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);
  const [emailAddressError, setEmailAddressError] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState<string>('');
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
      toast.error('Some input fields are invalid. Please check again', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const payload: IManualSignupPayload = {
      firstName,
      lastName,
      emailAddress,
      password,
      authenticationMethod: 'manual',
    };
    manualSignUp(payload);
  };

  const handleGoogleSignup = useCallback(async (response: IGoogleOAuthResponse) => {
    const payload: IGoogleOAuthPayload = {
      credential: response.credential,
    };
    googleSignUp(payload);
  }, []);

  useKeyboardEvent(handleSubmit);

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAuth(data.data));
      navigate('/dashboard');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);

  useEffect(() => {
    if (googleIsSuccess) {
      dispatch(saveAuth(googleData.data));
      navigate('/dashboard');
    }
  }, [googleIsSuccess]);

  useEffect(() => {
    if (googleIsError && googleError) {
      const { message } = handleServerError(googleError);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [googleIsError, googleError]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={LOGO} alt="Fahoot" />
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
                  loading={isLoading || googleIsLoading}
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

              <div className="mt-6 w-full flex justify-center items-center">
                <GoogleOAuth callback={handleGoogleSignup} text="signup_with" />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
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
