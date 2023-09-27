import { ReactNode } from 'react';
import { QuestionType, QuizStatus } from './constant';

export interface IButtonProps {
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  action?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IQuizContainerProps {
  quizzes: IQuiz[];
}

export interface IShimmerProps {
  count: number;
}

export interface IQuizProps {
  quiz: IQuiz;
}

export interface IPaginationProps {
  total: number;
  totalPages: number;
  currentNumberOfResults: number;
  page: number;
  setPage: (page: number) => void;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface IQuizSettingProps {
  cancelSetting: () => void;
}

export interface AuthUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  authenticationMethod: string;
  avatarUrl: string | null;
  verified: boolean;
  status: string;
}

export interface IProfileProps {
  user: AuthUser | null;
}

export interface IQuizState {
  quiz: IQuiz | null;
}

export type setFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IAuth {
  user: AuthUser | null;
}

export interface IPromptProps {
  title: string;
  description: string;
  isLoading?: boolean;
  okFunction: () => void;
  cancelFunction: () => void;
}

export interface IResetPasswordRequestPayload {
  emailAddress: string;
}

export interface IVerifyEmailPayload {
  token: string;
}

export interface IResetPasswordPayload {
  token: string;
  password: string;
}

export interface IRequestVerificationEmailPayload {
  emailAddress: string;
  subject: string;
  emailPurpose: string;
}

export interface IAlertProps {
  bgColor: string;
  iconColor: string;
  headingColor: string;
  descriptionColor: string;
  heading: string;
  description: string;
  action?: () => void;
  actionText?: string;
  actionLoading?: boolean;
}

export interface IUpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateEmailPayload {
  emailAddress: string;
}

export interface IUpdateBasicInfoPayload {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
}

export interface IManualSignupPayload {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  authenticationMethod: string;
}

export interface IManualSignInPayload {
  emailAddress: string;
  password: string;
  authenticationMethod: string;
  rememberMe?: boolean;
}

export interface IGetQuizzesPayload {
  page: number;
  pageSize: number;
  sortOrder: 'asc' | 'desc';
  sortField: string;
  query: string;
}

export interface ICreateQuizPayload {
  title: string;
  questions: IQuestion[];
  settings: IQuizSetting;
}

export interface InputProps {
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  prefixIcon?: ReactNode;
  value?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}

export interface IEmptyStateProps {
  icon?: ReactNode;
  heading: string;
  description: string;
  action?: () => void;
}

export interface IOption {
  isCorrect: boolean;
  option: string;
}

export interface IPair {
  value: string;
  label: string;
  ring?: string;
}

export interface IColorChooseProps {
  colors: IPair[];
  selected: IPair;
  setSelected: setFunction<IPair>;
}

export interface ISelectInputProps {
  options: IPair[];
  selected: IPair;
  setSelected: setFunction<IPair>;
}

export interface IQuizSetting {
  lobbyMusic: string;
  gameMusic: string;
  podiumMusic: string;
  colorLabel: string;
}

export interface IQuestion {
  title: string;
  questionType: QuestionType;
  options: IOption[];
  duration: number;
  points: number;
  mediaUrl: string | null;
}

export interface IQuiz {
  _id: string;
  title: string;
  status: QuizStatus;
  questions: IQuestion[];
  settings: IQuizSetting;
  updatedAt: string;
}

export interface IQuizResult {
  results: IQuiz[];
  total: number;
  totalPages: number;
}
