import { ReactNode } from "react";

interface IButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  dis?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  className,
  dis,
}) => {
  return (
    <button onClick={onClick} className={className} disabled={dis}>
      {children}
    </button>
  );
};

export default Button;
