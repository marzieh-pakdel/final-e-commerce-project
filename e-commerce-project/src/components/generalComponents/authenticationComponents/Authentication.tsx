import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Authentication = ({ children }: Props) => {
  return (
    <div className="flex gap-7 w-full h-screen p-14">
      {children}
    </div>
  );
};

export default Authentication;
