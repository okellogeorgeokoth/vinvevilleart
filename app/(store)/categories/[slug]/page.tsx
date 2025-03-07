import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import { FC, ReactElement } from "react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
}): Promise<ReactElement> => {
  const slug = (await params).slug;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="w-full ">
        <div className="container mt-8 md:mt-24 mx-auto px-4 md:px-0">
          <ProductsView products={products} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
