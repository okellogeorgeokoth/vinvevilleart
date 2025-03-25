// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client as sanityClient } from "@/sanity/lib/client";

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

      // Get customer details with proper type safety
      let customerName = "Unknown";
      let customerEmail = paymentIntent.receipt_email || "N/A";

      if (paymentIntent.customer) {
        const customer = await stripe.customers.retrieve(paymentIntent.customer as string);
        if (!customer.deleted && "name" in customer) {
          customerName = customer.name || charge?.billing_details?.name || "Unknown";
          customerEmail = customer.email || paymentIntent.receipt_email || "N/A";
        } else if (charge?.billing_details?.name) {
          customerName = charge.billing_details.name;
        }
      }

      // Map to your exact Sanity schema
      const order = {
        _type: "order",
        orderNumber: `ORD-${Date.now()}`,
        stripeCheckoutSessionId: paymentIntent.id,
        stripeCustomerId: paymentIntent.customer?.toString() || "",
        clerkUserId: "user-id-from-your-system", // Replace with actual user ID
        customerName: customerName,
        email: customerEmail,
        stripePaymentIntentId: paymentIntent.id,
        paypalOrderId: "", // Empty for Stripe orders
        paypalPayerId: "", // Empty for Stripe orders
        products: [], // Populate with product references
        totalPrice: paymentIntent.amount_received / 100,
        currency: paymentIntent.currency.toUpperCase(),
        amountDiscount: 0, // Set based on your discounts
        status: "paid",
        orderDate: new Date().toISOString(),
      };

      await sanityClient.create(order);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}