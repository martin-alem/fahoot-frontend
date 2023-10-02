/* eslint-disable react-hooks/exhaustive-deps */
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { handleServerError } from '../../../utils/util';
import { useDeleteUserMutation } from '../../../api/user.api';
import { useNavigate } from 'react-router-dom';
import Prompt from '../../../components/prompt/Prompt';
import Modal from '../../../components/modal/Modal';
import { DELETE_ACCOUNT_ERROR } from '../../../utils/error_messages';

const DeleteAccount: React.FC = () => {
  const [deleteAccount, { isLoading, isSuccess, isError, error }] = useDeleteUserMutation();
  const [deleteAccountPromptOpen, setDeleteAccountPromptOpen] = useState(false);
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
        <Button label="Delete account" type="danger" handleClick={() => setDeleteAccountPromptOpen(true)} suffixIcon={<TrashIcon className="w-6" />} />
      </div>

      <Modal isOpen={deleteAccountPromptOpen} onClose={() => setDeleteAccountPromptOpen(false)}>
        <Prompt
          title="Delete your account?"
          description="This action is not reversible. All information related to this account will be deleted permanently."
          okFunction={handleDeleteAccountSubmit}
          cancelFunction={() => setDeleteAccountPromptOpen(false)}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default DeleteAccount;
