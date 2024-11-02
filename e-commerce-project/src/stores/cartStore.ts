import { create } from "zustand";

interface cartItem {
    _id: string,
    name: string,
    qty: number,
}

interface ICartStore {
    cartItems: cartItem[];
    addItem: (id: string, name: string) => void;
    removeItem: (item: string) => void;
    clearCart: () => void
}

const CartStore = create<ICartStore>((set) => ({
    cartItems: [],
    addItem: (id, name) => {
        set((state) => ({
            cartItems: [
                ...state.cartItems,
                {
                    _id: id,
                    name: name,
                    qty: 1,
                }
            ],
        }));
    },
    removeItem: (id) => {
        set((state) => ({
            cartItems: state.cartItems.filter((cartItem) => cartItem._id !== id),
        }));
    },
    clearCart: () => {
        set(() => ({
            cartItems: []
        }))
    }
}));


export default CartStore