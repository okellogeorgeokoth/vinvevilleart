
import AddToButton from "@/components/AddToButtons";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

// Static route configuration
export const dynamic = "force-static";
export const revalidate = 800;

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;
  const imageSrc = product.image ? imageUrl(product.image).url() : null;

  // Debugging: Log the image URL
  console.log("Image URL:", imageSrc);

  return (
    <div className="container mx-auto px-4 py-8 md:mt-6 md:mb-44">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-7xl gap-8">
        {/* Product Image Section */}
        <div
          className={`relative h-[440px] md:h-[680px] max-w-xl overflow-hidden rounded-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name || "Product Image"}
              priority
              quality={80}
              placeholder="blur"
              blurDataURL={imageSrc}
              fill
              className="object-cover md:object-contain size-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-gray-500">Image not found</p>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-lg font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-2xl font-semibold mb-4">
              $ {product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <AddToButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;