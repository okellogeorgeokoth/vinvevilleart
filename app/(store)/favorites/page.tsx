"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import useFavoritesStore from "@/lib/useFavoritesStore";
import Image from "next/image";

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();

  return (
    <div className="container mx-auto px-4 py-8 md:mt-6 md:mb-44">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center">
          No favorite items yet.{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Browse products
          </Link>{" "}
          to add some!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {/* Product Image Section */}
              <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
              <Image
                src={product.image ? urlFor(product.image).url() : "/placeholder.jpg"}
                alt={product.name || "Product image"}
                className="w-full h-full object-cover"
              />
              </div>

              {/* Product Details Section */}
              <div className="mt-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600 mt-2">Ksh. {product.price?.toFixed(2)}</p>

                {/* Remove from Favorites Button */}
                <button
                  onClick={() =>
                    useFavoritesStore.getState().removeFavorite(product._id)
                  }
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition"
                >
                  <Heart className="h-5 w-5" />
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;