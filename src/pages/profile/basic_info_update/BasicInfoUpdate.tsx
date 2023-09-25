import { toast } from 'react-toastify';
import Input from '../../../components/input/input';
import { IProfileProps, IUpdateBasicInfoPayload } from '../../../utils/types';
import { InboxArrowDownIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import { capitalize, isEqual, lowerCase } from 'lodash';
import { serverErrors } from '../../../utils/util';
import { useEffect, useState } from 'react';
import { saveAuth } from '../../../slices/auth.slice';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../utils/constant';
import { validateName } from '../../../utils/input_validation';
import { useUpdateBasicInfoMutation } from '../../../api/user.api';
import { useDispatch } from 'react-redux';

const BasicInfoUpdate: React.FC<IProfileProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [
    updateBasicInfo,
    {
      isLoading: isLoadingBasicInfo,
      isSuccess: isSuccessBasicInfo,
      isError: isErrorBasicInfo,
      error: errorBasicInfo,
      data: dataBasicInfo,
    },
  ] = useUpdateBasicInfoMutation();

  const [firstName, setFirstName] = useState<string>('');
  const [validFirstName, setValidFirstName] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);

  const [lastName, setLastName] = useState<string>('');
  const [validLastName, setValidLastName] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const result = validateName(firstName);
    !result && firstName
      ? setFirstNameError(ERROR_MESSAGES.INVALID_NAME)
      : setFirstNameError(undefined);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = validateName(lastName);
    !result && lastName
      ? setLastNameError(ERROR_MESSAGES.INVALID_NAME)
      : setLastNameError(undefined);
    setValidLastName(result);
  }, [lastName]);

  //Listen for changes for first name and last name
  useEffect(() => {
    setFirstName(capitalize(user?.firstName) ?? '');
    setLastName(capitalize(user?.lastName) ?? '');
  }, [user?.firstName, user?.lastName]);

  useEffect(() => {
    if (isSuccessBasicInfo) {
      dispatch(saveAuth(dataBasicInfo));
      toast.success(SUCCESS_MESSAGES.BASIC_INFO_UPDATE_SUCCESS, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isSuccessBasicInfo]);

  useEffect(() => {
    if (isErrorBasicInfo) {
      const statusCode = errorBasicInfo && 'status' in errorBasicInfo ? errorBasicInfo.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorBasicInfo, errorBasicInfo]);

  const handleInfoUpdate = async () => {
    if (!firstName && !lastName) return;
    const payload: IUpdateBasicInfoPayload = {
      firstName,
      lastName,
    };

    /**Prevent redundant updates if user's data has not changed */
    if (user) {
      const anyChange = isEqual(
        { firstName: lowerCase(firstName), lastName: lowerCase(lastName) },
        { firstName: lowerCase(user.firstName), lastName: lowerCase(user.lastName) },
      );
      if (anyChange) {
        toast.info('No changes where detected.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      updateBasicInfo(payload);
    }
  };

  const handleUpdateBasicInfoSubmit = async () => {
    if (!validFirstName && !validLastName) {
      toast.error('Some input fields are invalid. Please check again', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    await handleInfoUpdate();
  };
  return (
    <>
      <div className="">
        <Input
          id="first_name"
          type="text"
          value={firstName}
          handleOnChange={(e) => setFirstName(e.target.value)}
          handleOnBlur={() =>
            toast.error(firstNameError, {
              position: toast.POSITION.TOP_CENTER,
            })
          }
          error={firstNameError}
          name="first_name"
          placeholder="John"
          label="First name"
          prefixIcon={<UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        />
      </div>

      <div className="">
        <Input
          id="last_name"
          type="text"
          value={lastName}
          handleOnChange={(e) => setLastName(e.target.value)}
          handleOnBlur={() =>
            toast.error(lastNameError, {
              position: toast.POSITION.TOP_CENTER,
            })
          }
          error={lastNameError}
          name="last_name"
          placeholder="Smith"
          label="Last name"
          prefixIcon={<UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        />
      </div>
      <div className="mt-8 sm:max-w-xl">
        <Button
          label="Save"
          type="primary"
          loading={isLoadingBasicInfo}
          handleClick={handleUpdateBasicInfoSubmit}
          disabled={(!validFirstName || !validLastName) && !isLoadingBasicInfo}
          suffixIcon={<InboxArrowDownIcon className="w-6" />}
        />
      </div>
    </>
  );
};

export default BasicInfoUpdate;
