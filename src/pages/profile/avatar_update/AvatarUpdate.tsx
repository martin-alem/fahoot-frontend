/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { IProfileProps, IUpdateBasicInfoPayload, ModalHandle } from '../../../utils/types';
import { useDeleteFileMutation, useUploadFileMutation } from '../../../api/upload.api';
import Button from '../../../components/button/Button';
import { CameraIcon, CloudArrowUpIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { extractKeyFromFileUrl, handleOnFileSelect, handleServerError } from '../../../utils/util';
import { useUpdateBasicInfoMutation } from '../../../api/user.api';
import { SUCCESS_MESSAGES } from '../../../utils/constant';
import { saveAuth } from '../../../slices/auth.slice';
import { useDispatch } from 'react-redux';
import Prompt from '../../../components/prompt/Prompt';
import Modal from '../../../components/modal/Modal';
import Avatar from '../../../components/avatar/Avatar';

const AvatarUpdate: React.FC<IProfileProps> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);

  const modalRef = useRef<ModalHandle>(null);

  const [updateBasicInfo, { isLoading: isLoadingBasicInfo, isSuccess: isSuccessBasicInfo, isError: isErrorBasicInfo, error: errorBasicInfo, data: dataBasicInfo }] = useUpdateBasicInfoMutation();

  const [uploadFile, { isLoading: isLoadingUploadFile, isSuccess: isSuccessUploadFile, isError: isErrorUploadFile, error: errorUploadFile, data: dataUploadFile }] = useUploadFileMutation();

  const [deleteFile, { isLoading: isLoadingDeleteFile, isSuccess: isSuccessDeleteFile, isError: isErrorDeleteFile, error: errorDeleteFile }] = useDeleteFileMutation();

  const handleFileUpload = async () => {
    if (!uploadedFile) return;
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('destination', 'profile');
    formData.append('acl', 'public-read');
    uploadFile(formData);
  };

  const handleDeleteFileSubmit = async () => {
    if (!fileUrl) {
      toast.error('Must have a file to delete', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const key = extractKeyFromFileUrl(fileUrl);
    await deleteFile(key);
    modalRef.current?.close();
  };

  const handleCancelFileSelect = () => {
    setFileUrl(user?.avatarUrl ?? null);
    setBase64File(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    setFileUrl(user?.avatarUrl ?? null);
  }, [user?.avatarUrl]);

  useEffect(() => {
    if (isSuccessBasicInfo && dataBasicInfo) {
      dispatch(saveAuth(dataBasicInfo));
      toast.success(SUCCESS_MESSAGES.AVATAR_UPLOAD_SUCCESS, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isSuccessBasicInfo]);

  useEffect(() => {
    if (isErrorBasicInfo && errorBasicInfo) {
      const { message } = handleServerError(errorBasicInfo);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorBasicInfo, errorBasicInfo]);

  useEffect(() => {
    if (isSuccessUploadFile) {
      const payload: IUpdateBasicInfoPayload = {
        avatarUrl: dataUploadFile?.filename, //Return data has structure {filename: string}
      };
      updateBasicInfo(payload);
      handleCancelFileSelect();
    }
  }, [isSuccessUploadFile]);

  useEffect(() => {
    if (isErrorUploadFile && errorUploadFile) {
      const { message } = handleServerError(errorUploadFile);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
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
    if (isErrorDeleteFile && errorDeleteFile) {
      const { message } = handleServerError(errorDeleteFile);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorDeleteFile, errorDeleteFile]);
  return (
    <form>
      <div className="mb-2 col-span-full flex items-center gap-x-8">
        <Avatar height="h-24" width="w-24" rounded="rounded-lg" src={base64File || fileUrl || undefined} alt={user?.lastName ?? ''} />
        <div>
          {!uploadedFile ? (
            <>
              <div className="flex items-center gap-4">
                <Button type="secondary" label="Select" prefixIcon={<CameraIcon className="w-6" />} handleClick={() => fileInputRef.current?.click()} />
                <Button type="danger" label="Remove" prefixIcon={<TrashIcon className="w-6" />} handleClick={() => modalRef.current?.open()} disabled={!fileUrl} />
              </div>
              <input type="file" name="avatar" ref={fileInputRef} className="hidden" multiple={false} onChange={(e) => handleOnFileSelect(e, setUploadedFile, setBase64File)} />
              <p className="mt-2 text-xs leading-5 text-secondary-500">JPG, GIF or PNG. 10MB max.</p>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                label="Change"
                prefixIcon={<CloudArrowUpIcon className="w-6" />}
                handleClick={handleFileUpload}
                loading={isLoadingUploadFile || isLoadingBasicInfo}
                disabled={!uploadedFile}
              />
              <Button type="danger" label="Cancel" prefixIcon={<XMarkIcon className="w-6" />} handleClick={handleCancelFileSelect} disabled={!uploadedFile} />
            </div>
          )}
        </div>
      </div>

      <Modal ref={modalRef}>
        <Prompt
          title="Delete your avatar?"
          description="This operation can not be undone"
          okFunction={handleDeleteFileSubmit}
          cancelFunction={() => modalRef.current?.close()}
          isLoading={isLoadingDeleteFile}
        />
      </Modal>
    </form>
  );
};

export default AvatarUpdate;
