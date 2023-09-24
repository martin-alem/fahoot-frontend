/* eslint-disable react-hooks/exhaustive-deps */
import { CameraIcon, InboxArrowDownIcon, TrashIcon, UserCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import useTitle from "../../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Avatar from "../../components/avatar/Avatar";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../utils/constant";
import { useEffect, useRef, useState } from "react";
import { validateName } from "../../utils/input_validation";
import { toast } from "react-toastify";
import { IUpdateBasicInfoPayload } from "../../utils/types";
import { useUpdateBasicInfoMutation } from "../../api/user.api";
import { saveAuth } from "../../slices/auth.slice";
import { handleOnFileChange, serverErrors } from "../../utils/util";
import Input from "../../components/input/input";
import { capitalize } from "lodash";
import { useDeleteFileMutation, useUploadFileMutation } from "../../api/upload.api";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.authUser.user);
  const dispatch = useDispatch();
  useTitle(`Profile - ${capitalize(user?.firstName)} ${capitalize(user?.lastName)}`);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);

  const [updateBasicInfo, { isLoading: isLoadingBasicInfo, isSuccess: isSuccessBasicInfo, isError: isErrorBasicInfo, error: errorBasicInfo, data: dataBasicInfo }] = useUpdateBasicInfoMutation();
  const [uploadFile, { isLoading: isLoadingUploadFile, isSuccess: isSuccessUploadFile, isError: isErrorUploadFile, error: errorUploadFile, data: dataUploadFile }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isLoadingDeleteFile, isSuccess: isSuccessDeleteFile, isError: isErrorDeleteFile, error: errorDeleteFile }] = useDeleteFileMutation();

  const [firstName, setFirstName] = useState<string>("");
  const [validFirstName, setValidFirstName] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);

  const [lastName, setLastName] = useState<string>("");
  const [validLastName, setValidLastName] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);

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

  //Listen for changes for first name and last name
  useEffect(() => {
    setFirstName(capitalize(user?.firstName) ?? "");
    setLastName(capitalize(user?.lastName) ?? "");
    setFileUrl(user?.avatarUrl ?? null);
  }, [user?.firstName, user?.lastName, user?.avatarUrl]);

  useEffect(() => {
    if (isSuccessUploadFile) {
      const payload: IUpdateBasicInfoPayload = {
        avatarUrl: dataUploadFile.filename, //Return data has structure {filename: string}
      };
      updateBasicInfo(payload);
      handleCancelUpload();
    }
  }, [isSuccessUploadFile]);

  useEffect(() => {
    if (isErrorUploadFile) {
      const statusCode = errorUploadFile && "status" in errorUploadFile ? errorUploadFile.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorUploadFile, errorUploadFile]);

  useEffect(() => {
    if (isSuccessDeleteFile) {
      const payload: IUpdateBasicInfoPayload = {
        avatarUrl: null,
      };
      updateBasicInfo(payload);
    }
  }, [isSuccessDeleteFile]);

  useEffect(() => {
    if (isErrorDeleteFile) {
      const statusCode = errorDeleteFile && "status" in errorDeleteFile ? errorDeleteFile.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorDeleteFile, errorDeleteFile]);

  useEffect(() => {
    if (isSuccessBasicInfo) {
      dispatch(saveAuth(dataBasicInfo));
      toast.success(SUCCESS_MESSAGES.BASIC_INFO_UPDATE_SUCCESS, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isSuccessBasicInfo]);

  useEffect(() => {
    if (isErrorBasicInfo) {
      const statusCode = errorBasicInfo && "status" in errorBasicInfo ? errorBasicInfo.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorBasicInfo, errorBasicInfo]);

  const handleFileUpload = async () => {
    if (!uploadedFile) return;
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("destination", "profile");
    formData.append("acl", "public-read");
    uploadFile(formData);
  };

  const handleInfoUpdate = async () => {
    if (!firstName && !lastName) return;
    const payload: IUpdateBasicInfoPayload = {
      firstName,
      lastName,
    };
    updateBasicInfo(payload);
  };

  const handleUpdateBasicInfoSubmit = async () => {
    if (!validFirstName && !validLastName && !uploadedFile) {
      toast.error("Some input fields are invalid. Please check again", { position: toast.POSITION.TOP_CENTER });
      return;
    }
    await handleInfoUpdate();
    await handleFileUpload();
  };

  const handleDeleteFileSubmit = async () => {
    if (!fileUrl) {
      toast.error("Must have a file to delete", { position: toast.POSITION.TOP_CENTER });
      return;
    }
    await deleteFile(fileUrl);
  };

  const handleCancelUpload = () => {
    setFileUrl(user?.avatarUrl ?? null);
    setBase64File(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm h-[82px]">
        <div className="flex items-center h-full mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Profile</h1>
        </div>
        <main className="flex flex-col items-center justify-center w-full py-4 divide-y divide-gray-200">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Update your avatar, first name, and last name to personalize your profile.</p>
            </div>

            <form className="md:col-span-2">
              <div className="gap-y-8 sm:max-w-xl">
                <div className="relative mb-2 col-span-full flex items-center gap-x-8">
                  {fileUrl || base64File ? (
                    <img className="flex-none h-24 w-24 bg-gray-800 object-contain rounded-lg" src={fileUrl || base64File || undefined} alt={user?.lastName} />
                  ) : (
                    <Avatar height="h-24" width="w-24" rounded="rounded-lg" />
                  )}
                  <div>
                    {!uploadedFile ? (
                      <>
                        <div className="flex items-center gap-4">
                          <Button type="secondary" label="Avatar" prefixIcon={<CameraIcon className="w-6" />} handleClick={() => fileInputRef.current?.click()} />
                          <Button type="danger" label="Avatar" prefixIcon={<TrashIcon className="w-6" />} handleClick={handleDeleteFileSubmit} loading={isLoadingDeleteFile} disabled={!fileUrl} />
                        </div>
                        <input type="file" name="avatar" ref={fileInputRef} className="hidden" multiple={false} onChange={(e) => handleOnFileChange(e, setUploadedFile, setBase64File)} />
                        <p className="mt-2 text-xs leading-5 text-secondary-500">JPG, GIF or PNG. 10MB max.</p>
                      </>
                    ) : (
                      <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                        <XCircleIcon className="w-9 text-red-500 cursor-pointer" onClick={handleCancelUpload} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="">
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

                <div className="">
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

              <div className="mt-8 sm:max-w-xl">
                <Button
                  label="Save"
                  type="primary"
                  loading={isLoadingBasicInfo}
                  handleClick={handleUpdateBasicInfoSubmit}
                  disabled={!uploadedFile && (!validFirstName || !validLastName) && (!isLoadingBasicInfo || !isLoadingUploadFile)}
                  suffixIcon={<InboxArrowDownIcon className="w-6" />}
                />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Change password</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Update your password associated with your account.</p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    Current password
                  </label>
                  <div className="mt-2">
                    <input
                      id="current-password"
                      name="current_password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    New password
                  </label>
                  <div className="mt-2">
                    <input
                      id="new-password"
                      name="new_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Change your email address</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Please remember you would have to re-login and verify the new email address.</p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary-500">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Clear remember me</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Please enter your password to confirm you would like to clear remember me</p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    Your password
                  </label>
                  <div className="mt-2">
                    <input
                      id="logout-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Delete account</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <div className="sm:max-w-xl">
                <Button label="Delete Account" type="danger" suffixIcon={<TrashIcon className="w-6" />} />
              </div>
            </form>
          </div>
        </main>
      </header>
    </>
  );
};

export default Profile;
