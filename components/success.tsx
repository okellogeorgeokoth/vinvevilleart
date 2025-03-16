// pages/success.tsx or app/success/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useBasketStore from "@/store";
import PaymentSuccess from "@/app/(store)/success/page";

export default function SuccessPage() {
  const router = useRouter();
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    // Clear the basket when the component mounts
    clearBasket();
  }, [clearBasket]);

  // If there are no items in the basket, redirect to the home page
  if (groupedItems.length === 0) {
    router.push("/");
    return null;
  }

  return <PaymentSuccess />;
}