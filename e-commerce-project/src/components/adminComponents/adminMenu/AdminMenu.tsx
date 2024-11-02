import { useState } from "react";
import LogoAdminMenu from "./logoAdminMenu/LogoAdminMenu";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isChecked, setIsChecked] = useState(false);
  const AdminMenuList = [
    { label: "داشبورد", linkTo: "/adminDashboard" },
    { label: "محصول جدید", linkTo: "/create-product" },
    { label: "مدیریت کاربران", linkTo: "/users" },
    { label: "سفارشات", linkTo: "/orders" },
    { label: "همه‌ محصولات", linkTo: "/allProducts" },
  ];
  const handelClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={`absolute left-5 top-5 rounded-xl flex z-10`}>
      <LogoAdminMenu handelClick={handelClick} />
      <div
        className={`absolute dark:bg-dark-base-side top-[2rem] w-[17rem] transition-opacity duration-500 ease-in-out bg-base-side border border-base-text-field-stroke dark:border-dark-base-text-field-stroke py-6 px-3 gap-6 left-[2rem] rounded-xl ${
          isChecked ? "block " : "hidden"
        } `}
      >
        <div className="flex flex-col gap-6 transition-width duration-700 ease-in-out justify-around items-center h-full text-text-primary text-2xl leading-8 font-normal">
          {AdminMenuList.map((item, index) => (
            <NavLink
              key={index}
              to={item.linkTo}
              onClick={() => handelClick()}
              className={`transition-width duration-700 ease-in-out h-[3.7rem] gap-4 rounded-lg p-3 cursor-pointer dark:text-dark-text-primary hover:bg-[#DB277714] hover:text-primary-main dark:hover:text-primary-main ${
                isChecked ? " w-full" : " w-0"
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
