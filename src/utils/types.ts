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
