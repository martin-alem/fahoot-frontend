import { ReactNode } from "react";

export interface IButtonProps {
  label: string;
  type: "primary" | "secondary" | "danger";
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  action?: "button" | "submit" | "reset";
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

export interface IAuth {
  user: AuthUser | null;
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
