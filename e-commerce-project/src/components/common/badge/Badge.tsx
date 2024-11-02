import { ReactNode } from "react";

interface IBadgeProps {
  children: ReactNode;
  padding?: "px-2" | "px-2.5";
  fontSize?: "text-[1.1rem]" | "text-[1.2rem]" | "text-[1.4rem]";
  status?: "pending-badge" | "success-badge" | "error-badge";
}

const Badge: React.FC<IBadgeProps> = ({ children, fontSize, padding, status }) => {
  return (
    <div
      className={`${fontSize} ${padding} ${status} $textColor font-normal text-primary-lighter text-center bg-primary-dark rounded-full inline-flex justify-center items-center py-1`}
    >
      {children}
    </div>
  );
};

export default Badge;
