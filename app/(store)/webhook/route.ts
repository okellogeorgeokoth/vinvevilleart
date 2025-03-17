// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "No webhook secret found" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.log("Error constructing event:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      {
        status: 400,
      },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await createOrderInSanity(session, "stripe");
    } catch (error) {
      console.log("Error processing checkout session:", error);
      return NextResponse.json(
        { error: "Error processing checkout session" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}

// PayPal Success Handler
export async function POST_PayPalSuccess(req: NextRequest) {
  const { orderID, totalPrice, customerEmail } = await req.json();

  try {
    const response = await axios.get(
      `https://api.paypal.com/v2/checkout/orders/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYPAL_CLIENT_SECRET}`,
        },
      },
    );

    const orderDetails = response.data;

    await createOrderInSanity(orderDetails, "paypal");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("PayPal success error:", error);
    return NextResponse.json(
      { error: "Error processing PayPal order" },
      { status: 500 },
    );
  }
}

async function createOrderInSanity(
  paymentDetails: Stripe.Checkout.Session | any,
  paymentMethod: "stripe" | "paypal",
) {
  let orderData: any;

  if (paymentMethod === "stripe") {
    const {
      id,
      amount_total,
      currency,
      metadata,
      payment_intent,
      customer,
      total_details,
    } = paymentDetails;

    const { orderNumber, customerName, clerkUserId } = metadata as any;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
      id,
      {
        expand: ["data.price.product"],
      },
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
      },
      quantity: item.quantity || 0,
    }));

    orderData = {
      _type: "order",
      orderNumber,
      stripeCheckoutSessionId: id,
      stripePaymentIntentId: payment_intent,
      customerName,
      stripeCustomerId: customer,
      clerkUserId,
      email: metadata.customerEmail,
      currency,
      amountDiscount: total_details?.amount_discount
        ? total_details.amount_discount / 100
        : 0,
      products: sanityProducts,
      totalPrice: amount_total ? amount_total / 100 : 0,
      status: "paid",
      orderDate: new Date().toISOString(),
    };
  } else if (paymentMethod === "paypal") {
    const { id, purchase_units, payer } = paymentDetails;

    orderData = {
      _type: "order",
      orderNumber: id,
      paypalOrderId: id,
      customerName: payer.name.given_name + " " + payer.name.surname,
      email: payer.email_address,
      currency: purchase_units[0].amount.currency_code,
      totalPrice: parseFloat(purchase_units[0].amount.value),
      status: "paid",
      orderDate: new Date().toISOString(),
    };
  }

  await backendClient.create(orderData);
}