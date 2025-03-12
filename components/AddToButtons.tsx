"use client";
import useFavoritesStore from "@/lib/useFavoritesStore";
import type { Product } from "@/sanity.types";
import useBasketStore from "@/store";
import { Heart, ShoppingBag, X } from "lucide-react"; // Import X icon
import { ReactElement, useState } from "react";

export const dynamic = "force-static";

interface AddToButtonProps {
  product: Product;
  disabled?: boolean; // Add disabled prop
}

const AddToButton = ({ product, disabled }: AddToButtonProps): ReactElement => {
  const { addItem, items } = useBasketStore();
  const { addFavorite, favorites } = useFavoritesStore(); // Assuming you have a favorites store
  const [basketMessage, setBasketMessage] = useState<string | null>(null);
  const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false); // Define isSizeGuideOpen state

  const handleAddToBasket = () => {
    if (disabled) return; // Prevent adding out-of-stock products

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
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToBasket}
          disabled={disabled} // Disable button if product is out of stock
          className={`w-full bg-gray-950 text-white py-3 px-6 rounded-full hover:bg-gray-950/85 flex items-center justify-center gap-2 hover:scale-95 transition-all hover:shadow-lg ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          {disabled ? "Out of Stock" : "Add to Cart"}
        </button>
        {basketMessage && <p className="text-sm text-gray-600 text-center">{basketMessage}</p>}

        {/* Add to Favorites Button */}
        <button
          onClick={handleAddToFavorites}
          className="w-full border border-gray-300 py-3 px-6 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2 hover:scale-95 transition-all hover:shadow-lg"
        >
          <Heart className="h-5 w-5" />
          Add to Favorites
        </button>
        {favoriteMessage && <p className="text-sm text-gray-600 text-center">{favoriteMessage}</p>}
      </div>

      {/* Size Guide Button */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Art Size Guide</h2>
            <p className="text-gray-700">
              Here is the size guide for your art piece. Please refer to the table below for
              accurate dimensions and features.
            </p>
            {/* Art Size Guide Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full min-w-[300px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Length (in)</th>
                    <th className="px-4 py-2 text-left">Width (in)</th>
                    <th className="px-4 py-2 text-left">Frame Type</th>
                    <th className="px-4 py-2 text-left">Material</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">24</td>
                    <td className="px-4 py-2">18</td>
                    <td className="px-4 py-2">Wooden</td>
                    <td className="px-4 py-2">Canvas</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">36</td>
                    <td className="px-4 py-2">24</td>
                    <td className="px-4 py-2">Metal</td>
                    <td className="px-4 py-2">Acrylic</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">48</td>
                    <td className="px-4 py-2">36</td>
                    <td className="px-4 py-2">Floating</td>
                    <td className="px-4 py-2">Paper</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToButton;