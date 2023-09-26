import { ReactNode } from 'react';

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

export type Quiz = {
  name: string;
  numberOfPlays: number;
  numberOfQuestions: number;
  lastUpdated: string;
  bgColor: string;
};

export interface IQuizContainerProps {
  quizzes: Quiz[];
}

export interface IQuizProps {
  quiz: Quiz;
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

export interface InputProps {
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  prefixIcon?: ReactNode;
  value?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}
