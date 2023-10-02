import { InboxArrowDownIcon, KeyIcon } from '@heroicons/react/24/outline';
import Input from '../../../components/input/input';
import { IUpdatePasswordPayload } from '../../../utils/types';
import { useEffect, useState } from 'react';
import { useUpdatePasswordMutation } from '../../../api/security.api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../utils/constant';
import { validatePassword } from '../../../utils/input_validation';
import { toast } from 'react-toastify';
import { handleServerError } from '../../../utils/util';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_UPDATE_ERROR } from '../../../utils/error_messages';

const PasswordUpdate: React.FC = () => {
  const [updatePassword, { isLoading, isSuccess, isError, error }] = useUpdatePasswordMutation();

  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [validOldPassword, setValidOldPassword] = useState<boolean>(false);
  const [oldPasswordError, setOldPasswordError] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validConfirmPassword, setValidConfirmPassword] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const result = validatePassword(oldPassword);
    !result && oldPassword ? setOldPasswordError(ERROR_MESSAGES.INVALID_PASSWORD) : setOldPasswordError(undefined);
    setValidOldPassword(result);
  }, [oldPassword]);

  useEffect(() => {
    const result = validatePassword(password);
    !result && password ? setPasswordError(ERROR_MESSAGES.INVALID_PASSWORD) : setPasswordError(undefined);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = validatePassword(confirmPassword) && password === confirmPassword;
    !result && password ? setConfirmPasswordError(ERROR_MESSAGES.PASSWORD_MISMATCH) : setConfirmPasswordError(undefined);
    setValidConfirmPassword(result);
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    if (!validPassword || !validConfirmPassword || !validOldPassword) {
      toast.error('Some input fields are invalid. Please check again', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const payload: IUpdatePasswordPayload = {
      oldPassword,
      newPassword: password,
    };
    updatePassword(payload);
  };

  useEffect(() => {
    let timerId: number;

    if (isSuccess) {
      setPassword('');
      setConfirmPassword('');
      setOldPassword('');
      toast.info(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS, { position: toast.POSITION.TOP_CENTER });
      timerId = setTimeout(() => navigate('/'), 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const errorMessage = handleServerError(error.status, PASSWORD_UPDATE_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError, error]);
  return (
    <form className="md:col-span-2">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <Input
            id="old_password"
            type="password"
            value={oldPassword}
            handleOnChange={(e) => setOldPassword(e.target.value)}
            handleOnBlur={() => toast.error(oldPasswordError, { position: toast.POSITION.TOP_CENTER })}
            error={oldPasswordError}
            name="old_password"
            placeholder="Enter your old password"
            label="Old Password"
            prefixIcon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          />
        </div>

        <div className="col-span-full">
          <Input
            id="new_password"
            type="password"
            value={password}
            handleOnChange={(e) => setPassword(e.target.value)}
            handleOnBlur={() => toast.error(passwordError, { position: toast.POSITION.TOP_CENTER })}
            error={passwordError}
            name="new_password"
            placeholder="Enter new password"
            label="New password"
            prefixIcon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          />
        </div>

        <div className="col-span-full">
          <Input
            id="confirm_password"
            type="password"
            value={confirmPassword}
            handleOnChange={(e) => setConfirmPassword(e.target.value)}
            handleOnBlur={() => toast.error(confirmPasswordError, { position: toast.POSITION.TOP_CENTER })}
            error={confirmPasswordError}
            name="confirm_password"
            placeholder="Enter your password"
            label="confirm password"
            prefixIcon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          />
        </div>
      </div>

      <div className="mt-8 sm:max-w-xl">
        <Button
          label="Change password"
          type="primary"
          loading={isLoading}
          handleClick={handleSubmit}
          disabled={!validOldPassword || !validPassword || !validConfirmPassword || isLoading}
          suffixIcon={<InboxArrowDownIcon className="w-6" />}
        />
      </div>
    </form>
  );
};

export default PasswordUpdate;
