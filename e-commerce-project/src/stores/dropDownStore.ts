import { create } from 'zustand'

interface IsetDropDownStore {
    dropDown: boolean,
    setDropDown: () => void;
}

export const useDropDownStore = create<IsetDropDownStore>((set) => ({
    dropDown: false,
    setDropDown: () => set((state) => ({ dropDown: !state.dropDown }))
}))