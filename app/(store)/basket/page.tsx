"use client";
import {
  createCheckoutSession,
  type Metadata,
} from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { Home, InfoIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OnApproveData } from "@paypal/paypal-js";
import axios from "axios";

const BasketPage: FC = () => {
  const { getGroupedItems } = useBasketStore();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const groupedItems = getGroupedItems();

  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalPrice = useBasketStore.getState().getTotalPrice().toFixed(2);
  const totalTaxes = (+totalPrice * 0.2).toFixed(2);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Loader />;
  }

  if (getGroupedItems().length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-8 bg-background text-foreground">
        <div className="text-primary mb-6">
          <ShoppingCart size={80} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-center">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md text-pretty">
          It looks like you haven&apos;t added any products to your cart yet. Start shopping to fill it up!
        </p>
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition duration-300 ease-out border border-primary rounded-full shadow-md text-xl"
        >
          <span className=" hidden absolute inset-0 md:flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
            <Home className="w-6 h-6" />
          </span>
          <span className="text-sm md:text-base absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">
            Go to the homepage
          </span>
          <span className="relative invisible">Go to the homepage</span>
        </Link>
      </div>
    );
  }

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress || "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error checking out:", error);
    }
  };

  const handlePayPalSuccess = async (details: OnApproveData) => {
    try {
      const response = await axios.post("/api/paypal-success", {
        orderID: details.orderID,
        totalPrice,
        customerEmail: user?.emailAddresses[0].emailAddress,
      });
      if (response.data.success) {
        router.push("/success");
      }
    } catch (error) {
      console.log("PayPal success error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl  md:mb-48">
      <h1 className="text-sm font-medium mb-4">
        Free shipping on orders over $ 1000.00
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {getGroupedItems()?.map((item) => (
            <div
              key={item.product._id + item.product._createdAt}
              className=" p-4 first:border-t border-b hover:bg-gray-100/55 hover:transition-colors flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0 "
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="size-20 sm:size-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name || "Product Image"}
                      className="size-full border object-cover rounded-xl"
                      width={96}
                      height={96}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-medium sm:text-xl truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">
                    Variante: US
                  </p>
                </div>
              </div>
              <div className="flex items-center ml-5 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-4  bg-white p-6  rounded order-last lg:order-last sticky bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-medium">Order details</h3>
          <div className="mt-4  flex flex-col gap-2">
            <Separator className="my-4" />
            <div className="flex justify-between text-gray-600 text-sm">
              <p className="flex items-center">
                <span>Subtotal</span>
                <InfoIcon className="size-5 text-white fill-gray-300" />
              </p>
              <span>$ {totalPrice}</span>
            </div>
            <p className="flex justify-between text-gray-600 text-sm">
              <span>Free delivery</span>
              <span> 0.00</span>
            </p>
            <div className="flex justify-between text-gray-600 text-sm ">
              <p>
                <span>Taxes</span>
                <span className="text-gray-400 text-sm ml-1">(Included)</span>
              </p>
              <span>${totalTaxes}</span>
            </div>
            <Separator className="mt-4" />
            <div>
              <p className="flex justify-between text-lg font-medium py-2">
                <span>Total:</span>
                <span className="font-semibold">$ {totalPrice}</span>
              </p>
            </div>
            <Separator className="my-3" />
          </div>
          {/* Checkout */}
          {isSignedIn ? (
            <>
              <Button
                variant={"default"}
                onClick={handleCheckout}
                disabled={isLoading}
                className="mt-4 w-full"
              >
                {isLoading ? "Processing..." : "Checkout with Stripe"}
              </Button>
              <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
                <PayPalButtons
                  createOrder={(_data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: totalPrice,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(_data, actions) => {
                    return actions.order!.capture().then((details) => {
                      // Explicitly cast details to OnApproveData
                      handlePayPalSuccess(details as OnApproveData);
                    });
                  }}
                  className="mt-4"
                />
              </PayPalScriptProvider>
            </>
          ) : (
            <SignInButton mode="modal">
              <Button className="mt-4 py-5 w-full" variant="default">
                Log in to continue
              </Button>
            </SignInButton>
          )}
        </div>

        {getGroupedItems().length < 3 && <div className="h-20 lg:h-0" />}
      </div>
    </div>
  );
};

export default BasketPage;