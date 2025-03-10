import { Product } from "@/sanity.types";
import { create } from "zustand";

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
}

const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  
  addFavorite: (product) =>
    set((state) => {
      if (state.favorites.some((fav) => fav._id === product._id)) return state; // Prevent duplicates
      return { favorites: [...state.favorites, product] };
    }),

  removeFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav._id !== productId),
    })),
}));

export default useFavoritesStore;
