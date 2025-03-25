// app/api/paypal-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client as sanityClient } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const payment = event.resource;

      const order = {
        _type: "order",
        orderNumber: `ORD-${Date.now()}`,
        stripeCheckoutSessionId: "", // Empty for PayPal
        stripeCustomerId: "", // Empty for PayPal
        clerkUserId: "user-id-from-your-system",
        customerName: payment.payer.name?.given_name || "Unknown",
        email: payment.payer.email_address,
        stripePaymentIntentId: "", // Empty for PayPal
        paypalOrderId: payment.id,
        paypalPayerId: payment.payer.payer_id,
        products: [], // Populate with your product references
        totalPrice: parseFloat(payment.amount.value),
        currency: payment.amount.currency_code,
        amountDiscount: 0,
        status: "paid",
        orderDate: new Date().toISOString(),
      };

      await sanityClient.create(order);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("PayPal Webhook Error:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}