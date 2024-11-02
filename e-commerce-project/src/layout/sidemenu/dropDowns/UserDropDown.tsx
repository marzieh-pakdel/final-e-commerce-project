import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDropDownStore } from "../../../stores/dropDownStore";
import { useLogout } from "../../../hook/useLogout";

interface IMenu {
  label: string;
  linkTo: string;
  onClick: () => void;
}

interface IIsAdmin {
  isAdmin: boolean
}

const UserDropDown: React.FC<IIsAdmin> = ({isAdmin}) => {
  const { setDropDown } = useDropDownStore();
  const { mutate: logout } = useLogout();

  const [adminMenu] = useState<IMenu[]>([
    {
      label: "داشبورد",
      linkTo: "/adminDashboard",
      onClick: () => setDropDown(),
    },
    {
      label: "محصول جدید",
      linkTo: "/create-product",
      onClick: () => setDropDown(),
    },
    { label: "مدیریت کاربران", linkTo: "/users", onClick: () => setDropDown() },
    { label: "سفارشات", linkTo: "/orders", onClick: () => setDropDown() },
    { label: "پروفایل", linkTo: "/profile", onClick: () => setDropDown() },
    { label: "خروج از حساب", linkTo: "", onClick: () => logout() },
  ]);
  const [userMenu] = useState<IMenu[]>([
    { label: "پروفایل", linkTo: "/profile", onClick: () => setDropDown() },
    { label: "خروج از حساب", linkTo: "", onClick: () => logout() },
  ]);
  return (
    <div className="absolute transition duration-700 ease-in-out rounded-xl bottom-[4rem] px-3 py-6 h-fit w-[17rem] text-nowrap gap-[1.6rem] bg-base-side dark:bg-dark-base-side text-2xl leading-8 font-normal text-text-primary border border-base-text-field-stroke dark:border-dark-base-text-field-stroke flex flex-col justify-center">
      {isAdmin
        ? adminMenu.map((item, index) => (
            <NavLink key={index} to={item.linkTo} onClick={item.onClick} className="dark:text-dark-text-primary hover:bg-dark-menu-active-item p-[0.8rem] rounded-[0.4rem] hover:text-primary-main dark:hover:text-primary-main">
              {item.label}
            </NavLink>
          ))
        : userMenu.map((item, index) => (
            <NavLink key={index} to={item.linkTo} onClick={item.onClick} className="dark:text-dark-text-primary hover:bg-dark-menu-active-item p-[0.8rem] rounded-[0.4rem] hover:text-primary-main dark:hover:text-primary-main">
              {item.label}
            </NavLink>
          ))}
    </div>
  );
};

export default UserDropDown;
