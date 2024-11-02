import { create } from 'zustand';

interface IThemeStore {
    theme: string,
    toggleTheme: () => void,
}

const useThemeStore = create<IThemeStore>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    return { theme: newTheme };
  })
}));

export default useThemeStore;