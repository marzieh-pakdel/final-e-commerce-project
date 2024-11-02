// import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import useThemeStore from "../../stores/themeStore";

const DarkModeLogo = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <label className="inline-flex items-center relative">
      <input 
        className="peer hidden" 
        id="toggle" 
        type="checkbox" 
        checked={theme === "dark"}
        onClick={toggleTheme} 
      />
      <div className="relative w-[6rem] h-[3rem] bg-base-text-field-stroke peer-checked:bg-dark-base-text-field-stroke rounded-full after:absolute after:content-[''] after:w-[3rem] after:h-[2rem] after:bg-gradient-to-r from-primary-dark to-primary-main peer-checked:after:from-dark-base-menu peer-checked:after:to-dark-base-menu after:rounded-full after:top-[0.5rem] after:left-[0.1rem] active:after:w-[3rem] peer-checked:after:left-[6rem] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md" />
      <FiMoon className="text-text-primary opacity-60 peer-checked:opacity-70 peer-checked:text-white absolute w-6 h-6 right-[0.9rem]"/>
      <MdOutlineWbSunny className="text-white peer-checked:opacity-60 absolute w-6 h-6 left-[0.9rem]" />
    </label>
  );
};

export default DarkModeLogo;