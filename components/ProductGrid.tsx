"use client";

import type { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactElement, Suspense, useState } from "react"; // Import useState
import ProductThumb from "./ProductThumb";
import { Button } from "./ui/button"; // Import Button component

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: FC<ProductGridProps> = ({ products }): ReactElement => {
  // State to track the number of visible products
  const [visibleProducts, setVisibleProducts] = useState(8); // Initial number of products to display

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 8); // Increase the number of visible products by 8 (or any desired number)
  };

  // Slice the products array to display only the visible products
  const visibleProductsList = products.slice(0, visibleProducts);

  return (
    <div className="flex flex-col items-center">
      {/* Product Grid */}
      <div className="grid min-w-max size-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5 mb-10">
        {visibleProductsList.map((product, index) => (
          <AnimatePresence key={`${product._id}-${index}`}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Suspense fallback={<ProductThumb.Skeleton />}>
                <ProductThumb product={product} />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>

      {/* "View More" Button */}
      {visibleProducts < products.length && ( // Only show the button if there are more products to load
        <Button
          onClick={loadMoreProducts}
          className="mt-6 mb-32 px-8 py-4 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        >
          View More Products
        </Button>
      )}
    </div>
  );
};

export default ProductGrid;