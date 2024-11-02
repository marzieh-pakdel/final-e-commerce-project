import { MouseEventHandler } from "react";

interface IHandelClick{
    handelClick:MouseEventHandler
}
const LogoAdminMenu:React.FC<IHandelClick> = ({handelClick}) => {
  return (
    <label>
      <div className="w-16 h-14 bg-base-side dark:bg-dark-base-side cursor-pointer flex flex-col items-center justify-center rounded-[0.8rem] border border-base-text-field-stroke dark:border-dark-base-text-field-stroke">
        <input className="hidden peer" type="checkbox" onClick={handelClick} />
        <div className="w-[50%] h-[2px] bg-black dark:bg-dark-icon-primary rounded-sm transition-all duration-300 origin-left translate-y-[0.85rem]  peer-checked:rotate-[-45deg]"  />
        <div className="w-[50%] h-[2px] bg-black dark:bg-dark-icon-primary rounded-md transition-all duration-300 origin-center peer-checked:hidden" />
        <div className="w-[50%] h-[2px] bg-black dark:bg-dark-icon-primary rounded-md transition-all duration-300 origin-left -translate-y-[0.85rem] peer-checked:rotate-[45deg]" />
      </div>
    </label>
  );
};

export default LogoAdminMenu;
