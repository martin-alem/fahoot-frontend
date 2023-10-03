/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Logo from './../../assets/Fahoot Logo.svg';
import { useDispatch } from 'react-redux';
import { useAutoLoginMutation, useGoogleSignInMutation, useManualSignInMutation } from '../../api/auth.api';
import { IGoogleOAuthPayload, IGoogleOAuthResponse, IManualSignInPayload } from '../../utils/types';
import { saveAuth } from '../../slices/auth.slice';
import { useCallback, useEffect, useState } from 'react';
import { handleServerError } from '../../utils/util';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utils/input_validation';
import { ERROR_MESSAGES } from '../../utils/constant';
import Input from '../../components/input/input';
import { ArrowLeftOnRectangleIcon, EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import Button from '../../components/button/Button';
import useKeyboardEvent from '../../hooks/useKeyboardEvent';
import GoogleOAuth from '../../components/google_oauth/GoogleOAuth';
import { LOGIN_GOOGLE_ERROR, LOGIN_MANUAL_ERROR } from '../../utils/error_messages';

const Login: React.FC = () => {
  useTitle('Login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [manualSignin, { isLoading, isSuccess, isError, error, data }] = useManualSignInMutation();
  const [autoLogin, { isLoading: autoIsLoading, isSuccess: autoIsSuccess, data: autoData }] = useAutoLoginMutation();
  const [googleLogin, { isLoading: googleIsLoading, isSuccess: googleIsSuccess, isError: googleIsError, error: googleError, data: googleData }] = useGoogleSignInMutation();

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);
  const [emailAddressError, setEmailAddressError] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const [rememberMe, setRememberMe] = useState<boolean>(false);

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
    if (!validEmailAddress || !validPassword) {
      toast.error('Some input fields are invalid. Please check again', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const payload: IManualSignInPayload = {
      emailAddress,
      password,
      authenticationMethod: 'manual',
      rememberMe: rememberMe,
    };
    manualSignin(payload);
  };

  const handleGoogleLogin = useCallback(async (response: IGoogleOAuthResponse) => {
    const payload: IGoogleOAuthPayload = {
      credential: response.credential,
    };
    googleLogin(payload);
  }, []);

  useKeyboardEvent(handleSubmit);

  //Handling manual sign in
  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAuth(data.data));
      navigate('/dashboard');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const errorMessage = handleServerError(error.status, LOGIN_MANUAL_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError, error]);

  //Handle google sign in
  useEffect(() => {
    if (googleIsSuccess) {
      dispatch(saveAuth(googleData.data));
      navigate('/dashboard');
    }
  }, [googleIsSuccess]);

  useEffect(() => {
    if (googleIsError && googleError) {
      if ('status' in googleError) {
        const errorMessage = handleServerError(googleError.status, LOGIN_GOOGLE_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [googleIsError, googleError]);

  //Handle auto sign in
  useEffect(() => {
    autoLogin(null);
  }, []);

  useEffect(() => {
    if (autoIsSuccess) {
      if (autoData) {
        setEmailAddress(autoData.emailAddress);
      }
    }
  }, [autoIsSuccess]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={Logo} alt="Fahoot" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-500">Sign in to your account</h2>
        </div>

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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    onChange={() => setRememberMe(!rememberMe)}
                    id="remember-me"
                    name="remember-me"
                    checked={rememberMe}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <Link to="password_reset_request" className="font-semibold text-secondary-600 hover:text-secondary-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  label="Sign in"
                  type="primary"
                  loading={isLoading || autoIsLoading || googleIsLoading}
                  handleClick={handleSubmit}
                  disabled={!validEmailAddress || !validPassword || isLoading || autoIsLoading}
                  suffixIcon={<ArrowLeftOnRectangleIcon className="w-6" />}
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
                <GoogleOAuth callback={handleGoogleLogin} text="signin_with" />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="signup" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
