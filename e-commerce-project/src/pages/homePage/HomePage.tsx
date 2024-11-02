import { Outlet } from "react-router-dom";
import MainLayout from "../../layout/mainLayout/MainLayout";
import useThemeStore from "../../stores/themeStore";
import { useEffect } from "react";

const HomePage = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <MainLayout>
      <Outlet></Outlet>
    </MainLayout>
  );
};

export default HomePage;
