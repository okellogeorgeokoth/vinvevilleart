import { type Category, type Product } from "@/sanity.types";
import { FC, ReactElement } from "react";
import { CategoryFilter } from "./CategorySelector";
import NoProductsFound from "@/components/NoProductsFound";
import ProductGrid from "@/components/ProductGrid";
import { OrderBy } from "./OrderBy";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView: FC<ProductsViewProps> = ({
  products,
  categories,
}): ReactElement => {
  return (
    <div>
      <div className="w-full  flex flex-col md:flex-row items-end  pl-2 pt-4 md:justify-end ">
        <OrderBy categories={categories} />
        <CategoryFilter categories={categories} />
      </div>

      {/* Products */}
      <div className="flex-1 size-full">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <NoProductsFound />
        )}
      </div>
    </div>
  );
};

export default ProductsView;
