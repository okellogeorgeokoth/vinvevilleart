import { Product } from "@/sanity.types";
import { create } from "zustand";

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
}

const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (product) =>
    set((state) => ({
      favorites: [...state.favorites, product],
    })),
}));

export default useFavoritesStore;