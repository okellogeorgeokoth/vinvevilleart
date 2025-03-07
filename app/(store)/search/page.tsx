import React from "react";
import NoProductsFound from "@/components/NoProductsFound";
import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  // ✅ Await searchParams to extract `query`
  const { query } = await searchParams;

  if (!query) {
    console.error("Missing search query");
    return <NoProductsFound />;
  }

  console.log("Search query received:", query);

  let products = [];

  try {
    // Fetch the products
    products = await searchProductsByName(query);

    if (!products.length) {
      console.error("No products found for query:", query);
      return <NoProductsFound />;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return <NoProductsFound />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Search results for &quot;{query}&quot;
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
