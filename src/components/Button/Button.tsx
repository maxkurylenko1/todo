import type { JSX } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ children, onClick, className = "" }: ButtonProps): JSX.Element => {
  return (
    <button onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}>
      {children}
    </button>
  );
};
