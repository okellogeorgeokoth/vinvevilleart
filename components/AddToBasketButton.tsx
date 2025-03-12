"use client";
import type { Product } from "@/sanity.types";
import useBasketStore from "@/store";
import { FC, useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
}

const AddToBasketButton: FC<AddToBasketButtonProps> = ({ product }) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [stockMessage, setStockMessage] = useState<string | null>(null); // Message for stock limit

  // Check if the product is out of stock
  const isOutOfStock = product.stock != null && product.stock <= 0;

  useEffect(() => setIsClient(true), []);

  const handleAddItem = () => {
    if (isOutOfStock) return; // Prevent adding out-of-stock products

    // Check if adding another item exceeds the available stock
    if (product.stock != null && itemCount >= product.stock) {
      setStockMessage(`Only ${product.stock} items available in stock.`);
      setTimeout(() => setStockMessage(null), 3000); // Clear message after 3 seconds
      return;
    }

    addItem(product); // Add item if stock is available
  };

  if (!isClient) return null;

  return (
    <div className="mt-8">
      {/* Quantity Selector */}
      <div className="flex items-center">
        {/* Decrease Quantity Button */}
        <button
          onClick={() => removeItem(product._id)}
          disabled={itemCount === 0 || isOutOfStock} // Disable if item count is 0 or product is out of stock
          className={`size-8 flex items-center justify-center rounded-full bg-white md:bg-gray-100 hover:bg-gray-200 transition-colors ${
            itemCount === 0 || isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          -
        </button>

        {/* Item Count */}
        <span className="w-12 text-center text-lg">{itemCount}</span>

        {/* Increase Quantity Button */}
        <button
          onClick={handleAddItem} // Use the new handleAddItem function
          disabled={isOutOfStock || (product.stock != null && itemCount >= product.stock)} // Disable if product is out of stock or stock limit reached
          className={`size-8 flex items-center justify-center rounded-full bg-white md:bg-gray-100 hover:bg-gray-200 transition-colors ${
            isOutOfStock || (product.stock != null && itemCount >= product.stock)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          +
        </button>
      </div>

      {/* Out of Stock Message */}
      {isOutOfStock && (
        <p className="mt-2 text-sm text-red-600">This product is out of stock.</p>
      )}

      {/* Stock Limit Message */}
      {stockMessage && (
        <p className="mt-2 text-sm text-red-600">{stockMessage}</p>
      )}
    </div>
  );
};

export default AddToBasketButton;