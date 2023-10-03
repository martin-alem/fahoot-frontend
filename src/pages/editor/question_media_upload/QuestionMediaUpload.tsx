/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowPathIcon, CloudArrowUpIcon, PhotoIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';
import { extractKeyFromFileUrl, handleOnFileSelect, handleServerError } from '../../../utils/util';
import { useDeleteFileMutation, useUploadFileMutation } from '../../../api/upload.api';
import Modal from '../../../components/modal/Modal';
import Prompt from '../../../components/prompt/Prompt';
import { toast } from 'react-toastify';
import { IQuestionMediaUploadProps, ModalHandle } from '../../../utils/types';
import { QUESTION_MEDIA_DELETE_ERROR, QUESTION_MEDIA_UPLOAD_ERROR } from '../../../utils/error_messages';

const QuestionMediaUpload: React.FC<IQuestionMediaUploadProps> = ({ questionMediaUrl, handleUploadQuestionMediaUrl }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);

  const modalRef = useRef<ModalHandle>(null);

  const [uploadFile, { isLoading: isLoadingUploadFile, isSuccess: isSuccessUploadFile, isError: isErrorUploadFile, error: errorUploadFile, data: dataUploadFile }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isLoadingDeleteFile, isSuccess: isSuccessDeleteFile, isError: isErrorDeleteFile, error: errorDeleteFile }] = useDeleteFileMutation();

  const handleFileUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('destination', 'question_media');
    formData.append('acl', 'public-read');
    uploadFile(formData);
  };

  const handleDeleteFileSubmit = async () => {
    if (!questionMediaUrl) {
      toast.error('Must have a file to delete', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const key = extractKeyFromFileUrl(questionMediaUrl);
    await deleteFile(key);
    modalRef.current?.close();
  };

  const resetSelectFile = () => {
    setBase64File(null);
    setSelectedFile(null);
  };

  const memoizedHandleOnFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => handleOnFileSelect(e, setSelectedFile, setBase64File);

  useEffect(() => {
    if (isSuccessUploadFile && dataUploadFile) {
      handleUploadQuestionMediaUrl(dataUploadFile.filename); //We should never get back null
      resetSelectFile();
    }
  }, [isSuccessUploadFile]);

  useEffect(() => {
    if (isErrorUploadFile && errorUploadFile) {
      if ('status' in errorUploadFile) {
        const errorMessage = handleServerError(errorUploadFile.status, QUESTION_MEDIA_UPLOAD_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isErrorUploadFile, errorUploadFile]);

  useEffect(() => {
    if (isSuccessDeleteFile) {
      handleUploadQuestionMediaUrl(null);
      resetSelectFile();
    }
  }, [isSuccessDeleteFile]);

  useEffect(() => {
    if (isErrorDeleteFile && errorDeleteFile) {
      if ('status' in errorDeleteFile) {
        const errorMessage = handleServerError(errorDeleteFile.status, QUESTION_MEDIA_DELETE_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isErrorDeleteFile, errorDeleteFile]);
  return (
    <>
      <div className="text-center h-48 flex flex-col justify-center items-center">
        <>
          {questionMediaUrl || base64File ? (
            <img src={questionMediaUrl || base64File || undefined} alt="" className="pointer-events-none max-h-36 object-cover group-hover:opacity-75" />
          ) : (
            <PhotoIcon className="mx-auto h-48 w-48 text-gray-300" aria-hidden="true" />
          )}
        </>
        <div className="mt-4 flex text-sm leading-6 text-gray-600 gap-2">
          <>
            {(!selectedFile || base64File) && !questionMediaUrl && (
              <label
                htmlFor="select_file"
                className="cursor-pointer p-2 mx-auto rounded-md bg-primary-500 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-white"
              >
                <PlusCircleIcon className="w-6 text-white" />
                <input id="select_file" name="file-upload" type="file" className="sr-only" onChange={memoizedHandleOnFileSelect} />
              </label>
            )}
          </>

          <>
            {selectedFile && !questionMediaUrl && (
              <button
                disabled={isLoadingUploadFile}
                onClick={handleFileUpload}
                className="cursor-pointer p-2 mx-auto rounded-md bg-secondary-500 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary-600 focus-within:ring-offset-2 hover:text-white"
              >
                {isLoadingUploadFile ? <ArrowPathIcon className="w-6 text-white animate-spin" /> : <CloudArrowUpIcon className="w-6 text-white" />}
              </button>
            )}
          </>
          <>
            {!selectedFile && !base64File && questionMediaUrl && (
              <button
                onClick={() => modalRef.current?.open()}
                className="cursor-pointer p-2 mx-auto rounded-md bg-red-500 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-white"
              >
                <TrashIcon className="w-6 text-white" />
              </button>
            )}
          </>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>

      <Modal ref={modalRef}>
        <Prompt
          title="Delete image?"
          description="This operation can not be undone"
          okFunction={handleDeleteFileSubmit}
          cancelFunction={() => modalRef.current?.close()}
          isLoading={isLoadingDeleteFile}
        />
      </Modal>
    </>
  );
};

export default QuestionMediaUpload;
