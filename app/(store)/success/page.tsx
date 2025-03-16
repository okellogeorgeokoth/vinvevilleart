"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useBasketStore from "@/store";
import { Check, CreditCard, Download, Loader, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Barcode from "@/components/Barcode";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const groupedItems = useBasketStore((state) => state.getGroupedItems());

  const totalPrice = groupedItems
    .reduce((total, item) => {
      const itemPrice = item.product.price ?? 0;
      return total + itemPrice * item.quantity;
    }, 0)
    .toFixed(2);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  const [isClient, setIsClient] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false); // Track image loading

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Loader />;
  }

  const truncateReferenceNumber = (ref: string | null, maxLength: number = 19) => {
    if (!ref) return "N/A";
    return ref.length > maxLength ? `${ref.slice(0, maxLength)}...` : ref;
  };

  const handleDownload = () => {
    const receiptElement = document.getElementById("receipt");

    if (receiptElement) {
      const buttons = receiptElement.querySelector(".receipt-buttons");

      if (buttons) buttons.classList.add("hidden");

      const referenceNumberElement = receiptElement.querySelector(".reference-number");
      if (referenceNumberElement) referenceNumberElement.classList.remove("truncate");

      // Wait for the image to load before capturing the content
      if (!isImageLoaded) {
        alert("Please wait for the image to load before downloading.");
        return;
      }

      // Add a small delay to ensure all content is rendered
      setTimeout(() => {
        html2canvas(receiptElement, {
          scale: 2,
          allowTaint: true,
          useCORS: true, // Ensures images load properly
          logging: true, // Enable logging for debugging
        }).then((canvas) => {
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 190;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, imgWidth, imgHeight);
          pdf.save("receipt.pdf");

          if (referenceNumberElement) referenceNumberElement.classList.add("truncate");
          if (buttons) buttons.classList.remove("hidden");
         
        });
      }, 1000); // Increased delay to 1000ms for absolute-positioned elements
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Payment Receipt",
          text: `Transaction completed successfully. Order Number: ${orderNumber ?? "N/A"}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-start justify-center min-h-dvh p-4">
      <Card
        id="receipt"
        className="w-full max-w-md bg-white mt-5 lg:mt-24 shadow-xl rounded-xl border-2 border-dashed border-gray-200 relative"
      >
        {/* Vinceville Watermark (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Image
            src="/logo/logo.jpg"
            alt="Vinceville Watermark"
            width={300}
            height={300}
            className="w-auto h-auto mix-blend-multiply"
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)} // Track image loading
          />
        </div>

        {/* Logo on the Left Side */}
        <div className="absolute top-10 left-10 receipt-logo">
          <Image
            src="/logo/logo.jpg"
            alt="Vinceville Logo"
            width={100}
            height={50}
            className="h-12 w-auto"
            priority={true}
            onLoad={() => setIsImageLoaded(true)} // Track image loading
          />
        </div>

        {/* Vinceville Stamp */}
        <div className="absolute top-10 right-10 transform rotate-12 opacity-50">
          <div className="text-4xl font-bold text-green-600">PAID</div>
          <div className="text-xs text-gray-500 text-center">Vinceville</div>
        </div>

        <CardHeader className="text-center">
          <div className="mx-auto my-4 bg-green-100 size-20 animate-pulse rounded-full flex items-center justify-center">
            <div className="bg-green-600 p-1 rounded-full">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-500">Transaction successfully completed</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Items and Amounts Bought */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Items Bought</h3>
            {groupedItems.map((item) => (
              <div key={item.product._id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} (Qty: {item.quantity})
                </span>
                <span className="text-gray-700">
                  $ {(item.product.price ?? 0 * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <Separator />

          {/* Amount Paid */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount Paid</span>
            <span className="text-xl font-semibold">$ {totalPrice}</span>
          </div>
          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-700 flex items-center">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="text-gray-700 flex items-center">
                {new Date().toLocaleTimeString() ?? "00:00"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-700 flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Visa ending in 4242
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference Number</span>
              <span className="text-gray-700 reference-number">
                {truncateReferenceNumber(orderNumber)}
              </span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-medium py-2">
            <span>Total:</span>
            <span className="font-semibold">$ {totalPrice}</span>
          </div>
          {/* Add Thank You Message */}
          <div className="text-center text-gray-600 mt-4">
            <p className="text-lg font-semibold">THANK YOU!</p>
            <p className="text-sm">We appreciate your business.</p>
          </div>
          {/* Add Barcode */}
          <div className="flex justify-center mt-4">
            <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-[250px]">
              <Barcode value={orderNumber ?? "N/A"} />
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between receipt-buttons">
          <Button variant="outline" className="flex items-center" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex items-center" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}