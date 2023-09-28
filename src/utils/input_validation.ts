import { QuestionType, QuizStatus } from './constant';
import { IOption, IQuestion, IQuiz, IQuizSetting } from './types';

export function validateName(name: string): boolean {
  const NAME_REGEX = /^[A-Za-z][A-Za-z0-9-_]{1,62}[A-Za-z0-9-_]$/;
  return NAME_REGEX.test(name);
}

export function validateEmail(email: string): boolean {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password: string): boolean {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,64}$/;
  return PWD_REGEX.test(password);
}

export function validateTitle(title: string): boolean {
  const TITLE_REGEX = /^[a-zA-Z0-9\s]+$/;
  return TITLE_REGEX.test(title);
}

export function validateQuestionOption(option: IOption): boolean {
  const hasId = Boolean(option._id);
  const hasColorLabel = Boolean(option.colorLabel);
  const hasOption = Boolean(option.option);
  const notEmpty = hasId && hasColorLabel && hasOption;

  const validType = typeof option._id === 'string' && typeof option.colorLabel === 'string' && typeof option.isCorrect === 'boolean' && typeof option.option === 'string';
  return notEmpty && validType;
}

export function mustHaveExactlyOneTrueOption(options: IOption[]): boolean {
  let total: number = 0;
  for (const option of options) {
    if (!validateQuestionOption(option)) return false;
    if (option.isCorrect === true) total++;
  }
  return total === 1;
}

export function hasCorrectQuestionTypeBaseOnOptionCount(question: IQuestion): boolean {
  let QType: QuestionType | null = null;
  switch (question.options.length) {
    case 2:
      QType = QuestionType.BOOLEAN;
      break;
    case 4:
      QType = QuestionType.MCQ;
      break;
  }

  if (!QType) return false;
  return question.questionType === QType;
}

export function validateQuestion(question: IQuestion): boolean {
  const hasId = Boolean(question._id);
  const hasTitle = Boolean(question.title);
  const hasQuestionType = Boolean(question.questionType);
  const hasPoints = Boolean(question.points);
  const hasOptions = Boolean(question.options.length);
  const hasDuration = Boolean(question.duration);

  const notEmpty = hasId && hasTitle && hasQuestionType && hasPoints && hasOptions && hasDuration;

  const validType: boolean =
    typeof question._id === 'string' &&
    typeof question.title === 'string' &&
    (question.questionType === QuestionType.BOOLEAN || question.questionType === QuestionType.MCQ) &&
    typeof question.duration === 'number' &&
    typeof question.points === 'number';

  return notEmpty && validType;
}

export function validateQuizSettings(settings: IQuizSetting): boolean {
  const hasId = Boolean(settings._id);
  const hasColorLabel = Boolean(settings.colorLabel);
  const hasGameMusic = Boolean(settings.gameMusic);
  const hasLobbyMusic = Boolean(settings.lobbyMusic);
  const hasPodiumMusic = Boolean(settings.podiumMusic);
  const notEmpty: boolean = hasId && hasColorLabel && hasGameMusic && hasLobbyMusic && hasPodiumMusic;

  const validType: boolean =
    typeof settings._id === 'string' &&
    typeof settings.colorLabel === 'string' &&
    typeof settings.gameMusic === 'string' &&
    typeof settings.lobbyMusic === 'string' &&
    typeof settings.podiumMusic === 'string';

  return notEmpty && validType;
}

export function validateQuiz(quiz: IQuiz): boolean {
  const hasId = Boolean(quiz._id);
  const hasTitle = Boolean(quiz.title);
  const hasStatus = Boolean(quiz.status);

  const notEmpty: boolean = hasId && hasTitle && hasStatus;

  const validType: boolean = typeof quiz._id === 'string' && typeof quiz.title === 'string' && (quiz.status === QuizStatus.DRAFT || quiz.status === QuizStatus.PUBLISHED);
  return notEmpty && validType;
}
