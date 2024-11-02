import { create } from 'zustand'

interface ISidebarStore {
    expanded: boolean,
    setExpanded: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
    expanded: false,
    setExpanded: () => set((state) => ({ expanded: !state.expanded }))
}))