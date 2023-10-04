import { toast } from 'react-toastify';
import { ERROR_MESSAGES, MAX_FILE_SIZE, QuestionType, ColorList } from './constant';
import { ActionCreator, IOption, IPair, IQuestion, IQuiz, setFunction } from './types';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import ObjectID from 'bson-objectid';

/**
 * Maps a score to a number in a sequence representing the bar's height
 * @param score score from which to calculate the bar's height
 * @returns a number representing the height of the bar
 */
export function mapScoreToBarHeight(score: number): number {
  if (score <= 0) return 10;
  if (score >= 250) return 250;
  return score;
}

export function handleServerError(statusCode: number | 'FETCH_ERROR' | 'TIMEOUT_ERROR' | 'PARSING_ERROR' | 'CUSTOM_ERROR', errorReference: { [key: number]: string }): string {
  if (typeof statusCode === 'string') {
    switch (statusCode) {
      case 'FETCH_ERROR':
        return ERROR_MESSAGES.FETCH_ERROR;
      case 'TIMEOUT_ERROR':
        return ERROR_MESSAGES.TIMEOUT_ERROR;
      case 'PARSING_ERROR':
        return ERROR_MESSAGES.PARSING_ERROR;
      case 'CUSTOM_ERROR':
        return ERROR_MESSAGES.GENERIC;
      default:
        return ERROR_MESSAGES.GENERIC;
    }
  } else if (typeof statusCode === 'number') {
    if (!(statusCode in errorReference)) return ERROR_MESSAGES.SERVER_ERROR;
    return errorReference[statusCode];
  }
  return ERROR_MESSAGES.GENERIC;
}

export function handleOnFileSelect(event: React.ChangeEvent<HTMLInputElement>, setFile: setFunction<File | null>, setFileUrl?: setFunction<string | null>): void {
  const files = event.target.files;

  if (files && files[0]) {
    const file = files[0];
    const fileType = file.type.split('/')[0]; // Getting the main MIME type like 'image', 'audio', etc.
    const fileSize = file.size; // Size in bytes
    const maxFileSize = MAX_FILE_SIZE; // 10MB in bytes

    if (fileType !== 'image') {
      toast.error('Only images are allowed', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (fileSize > maxFileSize) {
      toast.error('File size exceeds 10MB', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setFile(file);
    const reader: FileReader = new FileReader();
    reader.addEventListener('error', () => {
      toast.error('Error occurred while trying to read file', {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    reader.addEventListener('load', () => {
      if (reader.result && setFileUrl) {
        setFileUrl(reader.result as string);
      }
    });
    reader.readAsDataURL(file);
  }
}

export function extractKeyFromFileUrl(fileUrl: string): string {
  //String format: https://<><><...>/<root>/<dir>/<dir>/<...>/<filename>.<extension>
  if (!fileUrl) return '';
  const fileUrlWithoutProtocol = fileUrl.split('//')[1];
  return fileUrlWithoutProtocol.substring(fileUrlWithoutProtocol.indexOf('/') + 1);
}

export function pluralize<T>(str: string, data: T[]): string {
  return data.length > 1 ? str.concat('s') : str;
}

export function getValueFromObject(obj: IPair[], value: string): IPair {
  for (const element of obj) {
    if (element.value === value) return element;
  }
  return obj[0];
}

export function updateQuizAndDispatch(
  updatedQuestion: IQuestion,
  questionIndex: number,
  quiz: IQuiz,
  dispatch: Dispatch<AnyAction>,
  updateCurrentQuestionActionCreator: ActionCreator<IQuestion>,
  updateQuizActionCreator: ActionCreator<IQuiz>,
) {
  //This dispatch is necessary because the current editor state depends on it. like current question title, question settings etc.
  dispatch(updateCurrentQuestionActionCreator(updatedQuestion));
  const currentQuestions = [...quiz.questions];
  currentQuestions[questionIndex] = updatedQuestion;
  const updatedQuiz = { ...quiz, questions: currentQuestions };
  dispatch(updateQuizActionCreator(updatedQuiz));
}

export function updateQuestionOptions(selectedQuestionType: QuestionType, questionType: QuestionType, options: IOption[]) {
  let newOptions: IOption[] = [...options];

  if (selectedQuestionType === QuestionType.MCQ && questionType === QuestionType.BOOLEAN) {
    newOptions = [
      ...options,
      {
        ...options[0],
        _id: new ObjectID().toHexString(),
        colorLabel: ColorList[2].value,
        isCorrect: false,
      },
      {
        ...options[1],
        _id: new ObjectID().toHexString(),
        colorLabel: ColorList[3].value,
        isCorrect: false,
      },
    ];
  } else if (selectedQuestionType === QuestionType.BOOLEAN && questionType === QuestionType.MCQ) {
    newOptions = options.slice(0, options.length - 2);
  }

  return newOptions;
}

export function getBorderColor(question: IQuestion, currentQuestion: IQuestion) {
  if (question._id === currentQuestion._id) {
    return question.title !== '' ? 'border-4 border-primary-500' : 'border-4 border-red-500';
  }
  return question.title === '' ? 'border-4 border-red-500' : 'border-none';
}
