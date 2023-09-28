/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowPathIcon, CloudArrowUpIcon, PhotoIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { extractKeyFromFileUrl, handleOnFileSelect, serverErrors, updateQuizAndDispatch } from '../../../utils/util';
import { useDeleteFileMutation, useUploadFileMutation } from '../../../api/upload.api';
import Modal from '../../../components/modal/Modal';
import Prompt from '../../../components/prompt/Prompt';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { IQuestion } from '../../../utils/types';
import { saveQuiz, updateCurrentQuestion } from '../../../slices/quiz.slice';

const QuestionMediaUpload: React.FC = () => {
  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const currentQuestion = useSelector((state: RootState) => state.quizState.currentQuestion);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(currentQuestion?.mediaUrl ?? null);
  const [deleteFilePromptOpen, setDeleteFilePromptOpen] = useState(false);

  const [uploadFile, { isLoading: isLoadingUploadFile, isSuccess: isSuccessUploadFile, isError: isErrorUploadFile, error: errorUploadFile, data: dataUploadFile }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isLoadingDeleteFile, isSuccess: isSuccessDeleteFile, isError: isErrorDeleteFile, error: errorDeleteFile }] = useDeleteFileMutation();

  const handleUpdateQuestionMedia = (mediaUrl: string | null) => {
    if (!currentQuestion || !quiz) return;
    const questionIndex = quiz.questions.findIndex((question) => question._id === currentQuestion._id);

    if (questionIndex === -1) return;

    const updatedQuestion: IQuestion = {
      ...quiz.questions[questionIndex],
      mediaUrl: mediaUrl,
    };

    updateQuizAndDispatch(updatedQuestion, questionIndex, quiz, dispatch, updateCurrentQuestion, saveQuiz);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('destination', 'question_media');
    formData.append('acl', 'public-read');
    uploadFile(formData);
  };

  const handleDeleteFileSubmit = async () => {
    if (!mediaUrl) {
      toast.error('Must have a file to delete', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const key = extractKeyFromFileUrl(mediaUrl);
    await deleteFile(key);
    setDeleteFilePromptOpen(false);
  };

  const resetSelectFile = () => {
    setMediaUrl(currentQuestion?.mediaUrl ?? null);
    setBase64File(null);
    setSelectedFile(null);
  };

  useEffect(() => {
    setMediaUrl(currentQuestion?.mediaUrl ?? null);
  }, [currentQuestion?.mediaUrl]);

  useEffect(() => {
    if (isSuccessUploadFile) {
      handleUpdateQuestionMedia(dataUploadFile?.filename ?? null);
      resetSelectFile();
    }
  }, [isSuccessUploadFile]);

  useEffect(() => {
    if (isErrorUploadFile) {
      const statusCode = errorUploadFile && 'status' in errorUploadFile ? errorUploadFile.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorUploadFile, errorUploadFile]);

  useEffect(() => {
    if (isSuccessDeleteFile) {
      handleUpdateQuestionMedia(null);
      resetSelectFile();
    }
  }, [isSuccessDeleteFile]);

  useEffect(() => {
    if (isErrorDeleteFile) {
      const statusCode = errorDeleteFile && 'status' in errorDeleteFile ? errorDeleteFile.status : 500;
      const errorMessage = serverErrors(statusCode);
      toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorDeleteFile, errorDeleteFile]);
  return (
    <>
      <div className="text-center h-48 flex flex-col justify-center items-center">
        <>
          {mediaUrl || base64File ? (
            <img src={mediaUrl || base64File || undefined} alt="" className="pointer-events-none max-h-36 object-cover group-hover:opacity-75" />
          ) : (
            <PhotoIcon className="mx-auto h-48 w-48 text-gray-300" aria-hidden="true" />
          )}
        </>
        <div className="mt-4 flex text-sm leading-6 text-gray-600 gap-2">
          <>
            {(!selectedFile || base64File) && !mediaUrl && (
              <label
                htmlFor="select_file"
                className="cursor-pointer p-2 mx-auto rounded-md bg-primary-500 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-white"
              >
                <PlusCircleIcon className="w-6 text-white" />
                <input id="select_file" name="file-upload" type="file" className="sr-only" onChange={(e) => handleOnFileSelect(e, setSelectedFile, setBase64File)} />
              </label>
            )}
          </>

          <>
            {selectedFile && !mediaUrl && (
              <button
                disabled={isLoadingUploadFile}
                onClick={handleFileUpload}
                className="cursor-pointer p-2 mx-auto rounded-md bg-secondary-500 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary-600 focus-within:ring-offset-2 hover:text-white"
              >
                {isLoadingUploadFile ? <ArrowPathIcon className="w-6 text-white" /> : <CloudArrowUpIcon className="w-6 text-white" />}
              </button>
            )}
          </>
          <>
            {!selectedFile && !base64File && mediaUrl && (
              <button
                onClick={() => setDeleteFilePromptOpen(true)}
                className="cursor-pointer p-2 mx-auto rounded-md bg-red-500 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-white"
              >
                <TrashIcon className="w-6 text-white" />
              </button>
            )}
          </>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>

      <Modal isOpen={deleteFilePromptOpen} onClose={() => setDeleteFilePromptOpen(false)}>
        <Prompt
          title="Delete image?"
          description="This operation can not be undone"
          okFunction={handleDeleteFileSubmit}
          cancelFunction={() => setDeleteFilePromptOpen(false)}
          isLoading={isLoadingDeleteFile}
        />
      </Modal>
    </>
  );
};

export default QuestionMediaUpload;
