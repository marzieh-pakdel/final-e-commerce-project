import { create } from 'zustand'


interface IIsAdmin {
    isAdmin: boolean,
    setIsAdmin: (isAdmin: boolean) => void
}

export const adminStore = create<IIsAdmin>((set) => ({
    isAdmin: localStorage.getItem('isAdmin') === 'true' ? true : false,
    setIsAdmin: (value: boolean) => {
        localStorage.setItem('isAdmin', String(value))
        set({ isAdmin: value })
    }
}))


export const setIsAdmin = (value: boolean) => {
    adminStore.getState().setIsAdmin(value);
};

export const isAdmin = () => { 
    return adminStore.getState().isAdmin 
}