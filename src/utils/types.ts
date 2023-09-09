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
