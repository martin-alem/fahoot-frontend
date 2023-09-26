import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/button/Button';
import { SUCCESS_MESSAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { serverErrors } from '../../../utils/util';
import { useDeleteUserMutation } from '../../../api/user.api';
import { useNavigate } from 'react-router-dom';
import Prompt from '../../../components/prompt/Prompt';
import Modal from '../../../components/modal/Modal';

const DeleteAccount: React.FC = () => {
  const [deleteAccount, { isLoading, isSuccess, isError, error }] = useDeleteUserMutation();
  const [deleteAccountPromptOpen, setDeleteAccountPromptOpen] = useState(false);
  const navigate = useNavigate();
  const handleDeleteAccountSubmit = async () => {
    deleteAccount(null);
  };

  useEffect(() => {
    let timerId: number;

    if (isSuccess) {
      toast.info(SUCCESS_MESSAGES.ACCOUNT_DELETE_SUCCESS, { position: toast.POSITION.TOP_CENTER });
      timerId = setTimeout(() => navigate('/'), 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    if (isError) {
      const statusCode = error && 'status' in error ? error.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);
  return (
    <>
      <div className="mt-8 sm:max-w-xl">
        <Button
          label="Delete account"
          type="danger"
          handleClick={() => setDeleteAccountPromptOpen(true)}
          suffixIcon={<TrashIcon className="w-6" />}
        />
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
