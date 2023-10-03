/* eslint-disable react-hooks/exhaustive-deps */
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { handleServerError } from '../../../utils/util';
import { useDeleteUserMutation } from '../../../api/user.api';
import { useNavigate } from 'react-router-dom';
import Prompt from '../../../components/prompt/Prompt';
import Modal from '../../../components/modal/Modal';
import { DELETE_ACCOUNT_ERROR } from '../../../utils/error_messages';
import { ModalHandle } from '../../../utils/types';

const DeleteAccount: React.FC = () => {
  const [deleteAccount, { isLoading, isSuccess, isError, error }] = useDeleteUserMutation();
  const modalRef = useRef<ModalHandle>(null);
  const navigate = useNavigate();
  const handleDeleteAccountSubmit = async () => {
    deleteAccount(null);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const errorMessage = handleServerError(error.status, DELETE_ACCOUNT_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError, error]);
  return (
    <>
      <div className="mt-8 sm:max-w-xl">
        <Button label="Delete account" type="danger" handleClick={() => modalRef.current?.open()} suffixIcon={<TrashIcon className="w-6" />} />
      </div>

      <Modal ref={modalRef}>
        <Prompt
          title="Delete your account?"
          description="This action is not reversible. All information related to this account will be deleted permanently."
          okFunction={handleDeleteAccountSubmit}
          cancelFunction={() => modalRef.current?.close()}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default DeleteAccount;
