import type { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  _id: string; // Ensure _id is part of the BasketItem type
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to basket
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          );

          if (existingItem) {
            // If the item already exists, increase its quantity
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            // If the item doesn't exist, add it to the basket
            return {
              items: [...state.items, { _id: product._id, product, quantity: 1 }],
            };
          }
        }),

      // Remove item from basket
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                // If quantity > 1, decrease the quantity
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
              // If quantity === 1, do not add it back (effectively removing it)
            } else {
              // Keep other items unchanged
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),

      // Clear the entire basket
      clearBasket: () => set({ items: [] }),

      // Calculate the total price of all items in the basket
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        ),

      // Get the quantity of a specific item in the basket
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      // Get all items in the basket, grouped by product
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store", // Name for localStorage persistence
    },
  ),
);

export default useBasketStore;