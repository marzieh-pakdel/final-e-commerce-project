import { create } from 'zustand';

interface IFavoritestore {
    favoriteProductsId: string[],
    addToFavorites: (id: string) => void,
    removeFromFavorites: (id: string) => void,
}

export const useFavoritesStore = create<IFavoritestore>((set) => ({
    favoriteProductsId: [],
    addToFavorites: (id: string) => set((state) => ({
        favoriteProductsId: state.favoriteProductsId.includes(id) 
                  ? state.favoriteProductsId 
                  : [...state.favoriteProductsId, id]
    })),
    removeFromFavorites: (id: string) => set((state) => ({
        favoriteProductsId: state.favoriteProductsId.filter(
            (favorite) => (favorite !== id)
        )
    }))
}))