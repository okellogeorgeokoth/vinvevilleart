"use client";
import useFavoritesStore from "@/lib/useFavoritesStore";
import type { Product } from "@/sanity.types";
import useBasketStore from "@/store";
import { Heart, ShoppingBag, X } from "lucide-react"; // Import X icon
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
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false); // Define isSizeGuideOpen state

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

  const openSizeGuide = () => setIsSizeGuideOpen(true); // Function to open the size guide modal
  const closeSizeGuide = () => setIsSizeGuideOpen(false); // Function to close the size guide modal

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
        <button
          onClick={openSizeGuide} // Open modal on click
          className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
        >
          Size Guide
        </button>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
            <button
              onClick={closeSizeGuide} // Close modal on click
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Size Guide</h2>
            <p className="text-gray-700">
              Here is the size guide for your product. Please refer to the table
              below for accurate sizing information.
            </p>
            {/* Example Size Guide Table */}
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Chest (in)</th>
                  <th className="px-4 py-2 text-left">Waist (in)</th>
                  <th className="px-4 py-2 text-left">Hip (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">S</td>
                  <td className="px-4 py-2">34-36</td>
                  <td className="px-4 py-2">28-30</td>
                  <td className="px-4 py-2">36-38</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">M</td>
                  <td className="px-4 py-2">38-40</td>
                  <td className="px-4 py-2">32-34</td>
                  <td className="px-4 py-2">40-42</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">L</td>
                  <td className="px-4 py-2">42-44</td>
                  <td className="px-4 py-2">36-38</td>
                  <td className="px-4 py-2">44-46</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToButton;