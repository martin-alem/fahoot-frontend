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
  currentQuestion: IQuestion | null;
}

export type setFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IAuth {
  user: AuthUser | null;
}

export interface IQuestionOptionProps {
  option: IOption | null;
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

export interface IGoogleOAuthResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export interface IGoogleOAuthProps {
  callback: (response: IGoogleOAuthResponse) => void;
  text: IGoogleText;
}

export interface IGoogleOAuthPayload {
  credential: string;
}

export interface IUpdateQuizPayload {
  _id: string;
  status?: QuizStatus;
  title?: string;
  questions?: IQuestion[];
  settings?: IQuizSetting;
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
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  _id: string;
  isCorrect: boolean;
  option: string;
  colorLabel: string;
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
  _id: string;
  lobbyMusic: string;
  gameMusic: string;
  podiumMusic: string;
  colorLabel: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  questionType: QuestionType;
  options: IOption[];
  duration: number;
  points: number;
  mediaUrl: string | null;
}

export interface IQuestionDraftProps {
  question: IQuestion;
  index: number;
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

export interface IGoogleAccounts {
  accounts: {
    id: {
      initialize: (options: IInitializeOptions) => void;
      renderButton: (element: HTMLElement | null, options: IRenderButtonOptions) => void;
      prompt: () => void;
      revoke: (id: string, callback: () => void) => void;
    };
  };
}

export type IGoogleText = 'signin_with' | 'signup_with';

export interface IInitializeOptions {
  client_id: string;
  callback: (response: IGoogleOAuthResponse) => void;
}

interface IRenderButtonOptions {
  theme: 'outline' | 'filled'; // You can extend this
  size: 'small' | 'medium' | 'large'; // You can extend this
  text: IGoogleText;
  width: number;
  logo_alignment: string;
}

declare global {
  interface Window {
    google: IGoogleAccounts;
  }
}

export type ActionCreator<T> = (payload: T) => { type: string; payload: T };
