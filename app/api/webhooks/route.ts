// app/api/webhooks/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSanityOrder } from "@/sanity/lib/order";
import type { Order } from "@/sanity/lib/order"; // Import the Order type

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const charge = paymentIntent.latest_charge
        ? await stripe.charges.retrieve(paymentIntent.latest_charge as string)
        : null;

      // Get customer details
      let customerName = "Unknown";
      let customerEmail = paymentIntent.receipt_email || "no-email@example.com";

      if (paymentIntent.customer) {
        const customer = await stripe.customers.retrieve(paymentIntent.customer as string);
        if (!customer.deleted && "name" in customer) {
          customerName = customer.name || charge?.billing_details?.name || "Unknown";
          customerEmail = customer.email || paymentIntent.receipt_email || "no-email@example.com";
        } else if (charge?.billing_details?.name) {
          customerName = charge.billing_details.name;
        }
      }

      // ====== PUT YOUR ORDER CREATION CODE HERE ======
      const orderData: Partial<Order> = {
        orderNumber: `ORD-${Date.now()}`,
        stripeCheckoutSessionId: paymentIntent.id,
        stripeCustomerId: paymentIntent.customer?.toString(),
        customerName,
        email: customerEmail,
        totalPrice: paymentIntent.amount_received / 100,
        currency: paymentIntent.currency.toUpperCase(),
        products: [], // Populate with product references
        status: "paid",
        orderDate: new Date().toISOString(),
      };

      await createSanityOrder(orderData);
      // ====== END OF ORDER CREATION CODE ======
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("Webhook Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }
}