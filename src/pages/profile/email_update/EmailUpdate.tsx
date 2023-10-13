/* eslint-disable react-hooks/exhaustive-deps */
import { EnvelopeIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline';
import { IProfileProps, IUpdateEmailPayload } from '../../../utils/types';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/input';
import { useEffect, useState } from 'react';
import { validateEmail } from '../../../utils/input_validation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { useUpdateEmailMutation } from '../../../api/security.api';
import { useNavigate } from 'react-router-dom';
import { handleServerError } from '../../../utils/util';

const EmailUpdate: React.FC<IProfileProps> = ({ user }) => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);
  const [emailAddressError, setEmailAddressError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const [updateEmail, { isLoading, isSuccess, isError, error }] = useUpdateEmailMutation();

  useEffect(() => {
    const result = validateEmail(emailAddress);
    !result && emailAddress ? setEmailAddressError(ERROR_MESSAGES.INVALID_EMAIL) : setEmailAddressError(undefined);
    setValidEmailAddress(result);
  }, [emailAddress]);

  const handleSubmit = async () => {
    if (!validEmailAddress) {
      toast.error('You must provide a valid email address', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const payload: IUpdateEmailPayload = {
      emailAddress,
    };
    updateEmail(payload);
  };
  useEffect(() => {
    let timerId: number;

    if (isSuccess) {
      setEmailAddress('');
      toast.info(SUCCESS_MESSAGES.EMAIL_UPDATE_SUCCESS, {
        position: toast.POSITION.TOP_CENTER,
      });
      timerId = setTimeout(() => navigate('/'), 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);
  return (
    <form className="md:col-span-2">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <Input
            id="email"
            type="email"
            value={emailAddress}
            handleOnChange={(e) => setEmailAddress(e.target.value)}
            handleOnBlur={() => toast.error(emailAddressError, { position: toast.POSITION.TOP_CENTER })}
            error={emailAddressError}
            name="email"
            placeholder={user?.emailAddress}
            label="Email"
            prefixIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          />
        </div>
      </div>

      <div className="mt-8 sm:max-w-xl">
        <Button
          label="Change email address"
          type="primary"
          loading={isLoading}
          handleClick={handleSubmit}
          disabled={!validEmailAddress || isLoading}
          suffixIcon={<InboxArrowDownIcon className="w-6" />}
        />
      </div>
    </form>
  );
};

export default EmailUpdate;
