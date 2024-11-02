import { ReactNode } from "react";
import { useSidebarStore } from "../../stores/sidebarStore";
import AdminMenu from "../../components/adminComponents/adminMenu/AdminMenu";
import { adminStore } from "../../stores/adminStore";
interface IContent {
  children: ReactNode;
}

const Content = ({ children }: IContent) => {
  const { expanded } = useSidebarStore();
  const { isAdmin } = adminStore();

  return (
    <section
      className={`rel w-full overflow-y-auto bg-base-backgrond dark:bg-dark-base-background mr-32 min-h-screen ${
        expanded && "blur-[0.2rem] brightness-95 pointer-events-none"
      } `}
    >
      {isAdmin ? <AdminMenu /> : null}
      {children}
    </section>
  );
};

export default Content;
