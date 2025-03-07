"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useBasketStore from "@/store";
import { Check, CreditCard, Download, Loader, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Loader />;
  }

  // 📌 Function to Download Receipt
  const handleDownload = () => {
    const receiptContent = `
      Payment Receipt\n
      ----------------------\n
      Amount Paid: $1,200.00\n
      Date: ${new Date().toLocaleDateString()}\n
      Time: ${new Date().toLocaleTimeString()}\n
      Payment Method: Visa ending in 4242\n
      Reference Number: ${orderNumber ?? "N/A"}\n
    `;
    
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "receipt.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 📌 Function to Share Receipt
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
    <div className=" bg-gray-100 flex items-start justify-center  min-h-dvh p-4">
      <Card className="w-full max-w-md bg-white mt-5 lg:mt-24 shadow-xl rounded-xl">
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
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount Paid</span>
            <span className="text-xl font-semibold">$1,200.00</span>
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
              <span className="text-gray-700 truncate">
                {(orderNumber ?? "").slice(0, 18)}
              </span>
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
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
