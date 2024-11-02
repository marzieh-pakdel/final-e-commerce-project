import { TbError404 } from "react-icons/tb";
import { PiSmileySadLight } from "react-icons/pi";
import MainLayout from "../../../layout/mainLayout/MainLayout";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../../stores/themeStore";
import { useEffect } from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const { theme } = useThemeStore();

    useEffect(() => {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const handleClick = () => {
        navigate("/dashboard");
      };

  return (
    <MainLayout>
        <div className="flex flex-col w-full h-full items-center justify-center">
            <TbError404 className="text-[20rem] text-primary-main" />
            <p className="text-[1.6rem] mb-8 flex items-center gap-1 dark:text-dark-text-primary">
                متاسفانه صفحه مورد نظر شما پیدا نشد
                <PiSmileySadLight className="text-[2rem]" />
                    </p> 
            <button
                className="bg-primary-main rounded-full text-text-button text-[1.6rem] py-3 px-10 flex items-center gap-2"
                onClick={handleClick}
            >
                بازگشت به خانه
                <FaArrowLeftLong />
            </button>
        </div>
    </MainLayout>
  )
}

export default NotFound