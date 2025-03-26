import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { FC, type ReactElement } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export const dynamic = "force-static";
export const revalidate = 900;

interface ProductThumbProps {
  product: Product;
}

const ProductThumb = ({ product }: ProductThumbProps): ReactElement => {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  // 40% discount
  const discount = product.price! * 0.4;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group w-full min-w-[350px] h-[460px] md:min-h-[440px] flex flex-col rounded border border-gray-200/30 shadow-sm hover:shadow-md size-full transition-all duration-700 overflow-hidden ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative h-[70%] overflow-hidden">
        {product.image && (
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            priority
            fill
            unoptimized
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-lg font-bold">Out of Stock</span>
          </div>
        )}

        <div className="md:translate-y-20 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 absolute bottom-5 translate-x-1/2 right-1/2 z-10">
          <Button className="rounded-full text-sm font-medium px-5 py-5">
            Quick View
          </Button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-center">
        <h2 className="text-sm font-medium text-gray-700 truncate mb-2">
          {product.name}
        </h2>
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <span className="text-base line-through font-medium text-gray-500">
              {formatCurrency(product.price! + discount)}
            </span>
            <span className="text-base font-semibold text-gray-800">
              {formatCurrency(product.price!)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProductThumb.displayName = "ProductThumb";

const ProductThumbSkeleton: FC = (): ReactElement => {
  return (
    <Link
      href="#"
      className="group min-w-[350px] h-[460px] md:min-h-[440px] flex flex-col rounded border border-gray-200/30 shadow-sm size-full transition-all duration-700 overflow-hidden opacity-50"
    >
      <div className="relative h-[70%] overflow-hidden">
        <Skeleton className="object-cover w-full h-full bg-gray-200" />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Skeleton className="w-32 h-8 bg-gray-300" />
        </div>

        <div className="md:translate-y-20 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 absolute bottom-5 translate-x-1/2 right-1/2 z-10">
          <Skeleton className="w-24 h-10 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-center">
        <Skeleton className="h-5 w-3/4 bg-gray-200 mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-1/3 bg-gray-200" />
          <Skeleton className="h-5 w-1/4 bg-gray-300" />
        </div>
      </div>
    </Link>
  );
};

ProductThumb.Skeleton = ProductThumbSkeleton;
ProductThumb.Skeleton.displayName = "ProductThumbSkeleton";

export default ProductThumb;