"use client";
import useFavoritesStore from "@/app/(store)/favorites/page";
import type { Product } from "@/sanity.types";
import useBasketStore from "@/store";
import { Heart, ShoppingBag } from "lucide-react";
import { ReactElement, useState } from "react";

export const dynamic = "force-static";

interface AddToButtonProps {
  product: Product;
}
const AddToButton = ({ product }: AddToButtonProps): ReactElement => {
  const { addItem, items } = useBasketStore();
  const { addFavorite, favorites } = useFavoritesStore(); // Assuming you have a favorites store
  const [basketMessage, setBasketMessage] = useState<string | null>(null);
  const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);

  const handleAddToBasket = () => {
    if (items.some((item) => item._id === product._id)) {
      setBasketMessage("Product already added to basket");
      setTimeout(() => setBasketMessage(null), 3000); // Clear message after 3 seconds
    } else {
      addItem(product);
      setBasketMessage("Product added to basket");
      setTimeout(() => setBasketMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  const handleAddToFavorites = () => {
    if (favorites.some((fav) => fav._id === product._id)) {
      setFavoriteMessage("Product already added to favorites");
      setTimeout(() => setFavoriteMessage(null), 3000); // Clear message after 3 seconds
    } else {
      addFavorite(product);
      setFavoriteMessage("Product added to favorites");
      setTimeout(() => setFavoriteMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToBasket}
          className="w-full bg-gray-950 text-white py-3 px-6 rounded-full hover:bg-gray-950/85 flex items-center justify-center gap-2 hover:scale-95 transition-all hover:shadow-lg"
        >
          <ShoppingBag className="h-5 w-5" />
          Add to Cart
        </button>
        {basketMessage && <p className="text-sm text-gray-600 text-center">{basketMessage}</p>}

        <button
          onClick={handleAddToFavorites}
          className="w-full border border-gray-300 py-3 px-6 rounded-full hover:bg-gray-100  flex items-center justify-center gap-2 hover:scale-95 transition-all hover:shadow-lg"
        >
          <Heart className="h-5 w-5" />
          Add to Favorites
        </button>
        {favoriteMessage && <p className="text-sm text-gray-600 text-center">{favoriteMessage}</p>}
      </div>

      <div className="flex items-start">
        <button className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors">
          Size Guide
        </button>
      </div>
    </div>
  );
};

export default AddToButton;