import { create } from "zustand";

interface IIsAuth {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
}

export const useAuthStatus = create<IIsAuth>((set) => ({
  isAuth: localStorage.getItem("isAuth") === "true" ? true : false,
  setAuth: (value: boolean) => {
    localStorage.setItem("isAuth", String(value));
    set({
      isAuth: value,
    });
  },
}));
