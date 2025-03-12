"use client";
import type { Product } from "@/sanity.types";
import useBasketStore from "@/store";
import { FC, useEffect, useState } from "react";

interface AddToBasketButtonProps {
  // Prop types here
  product: Product;
  disabled?: boolean;
}

const AddToBasketButton: FC<AddToBasketButtonProps> = ({
  product,
  disabled,
}) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <div className="mt-8">
      {/* Selector de cantidad */}
      <div className="flex items-center ">
        <button
          onClick={() => removeItem(product._id)}
          className="size-8 flex items-center justify-center rounded-full bg-white  md:bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          -
        </button>
        <span className="w-12 text-center text-lg">{itemCount}</span>
        <button
          onClick={() => addItem(product)}
          className="size-8 flex items-center justify-center rounded-full bg-white md:bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddToBasketButton;
