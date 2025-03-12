// store.ts
import { create } from "zustand";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: any;
  slug?: { current: string };
}

interface BasketState {
  items: { product: Product; quantity: number }[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: string) => void;
  getGroupedItems: () => { product: Product; quantity: number }[];
  getTotalPrice: () => number;
}

export const useBasketStore = create<BasketState>((set, get) => ({
  items: [],
  addToBasket: (product) => {
    // Prevent adding out-of-stock products
    if (product.stock != null && product.stock <= 0) {
      console.warn("Cannot add out-of-stock product to the basket.");
      return;
    }

    const items = get().items;
    const existingItem = items.find((item) => item.product._id === product._id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { product, quantity: 1 }] });
    }
  },
  removeFromBasket: (productId) => {
    set({ items: get().items.filter((item) => item.product._id !== productId) });
  },
  getGroupedItems: () => {
    return get().items;
  },
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));