import { NextResponse, NextRequest } from "next/server";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import Stripe from "stripe";
import axios from "axios";

// Stripe Webhook Handler
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  console.debug("Webhook received from Stripe.");

  if (!sig) {
    console.error("Missing Stripe signature.");
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Stripe webhook secret is missing.");
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Stripe event verified:", event.type);
  } catch (error) {
    console.error("Stripe signature verification failed:", error);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Processing Stripe payment:", session.id);

    try {
      await createOrderInSanity(session, "stripe");
      console.log("Stripe order recorded in Sanity.");
    } catch (error) {
      console.error("Error saving Stripe order:", error);
      return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

// PayPal Success Handler
export async function POST_PayPalSuccess(req: NextRequest) {
  const { orderID } = await req.json();
  console.debug("PayPal success handler triggered:", orderID);

  try {
    const paypalAccessToken = await getPayPalAccessToken();
    const orderDetails = await fetchPayPalOrder(orderID, paypalAccessToken);

    await createOrderInSanity(orderDetails, "paypal");
    console.log("PayPal order recorded in Sanity.");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json({ error: "PayPal order processing failed" }, { status: 500 });
  }
}

// Fetch PayPal Access Token
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    "https://api.paypal.com/v1/oauth2/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

// Fetch PayPal Order Details
async function fetchPayPalOrder(orderID: string, accessToken: string) {
  const response = await axios.get(`https://api.paypal.com/v2/checkout/orders/${orderID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

// Create Order in Sanity
async function createOrderInSanity(
  paymentDetails: Stripe.Checkout.Session | any,
  method: "stripe" | "paypal"
) {
  let orderData: any;

  if (method === "stripe") {
    const { id, amount_total, currency, metadata, payment_intent, customer, total_details } = paymentDetails;
    const { orderNumber, customerName, clerkUserId, customerEmail } = metadata as any;

    // Fetch line items from Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(id, {
      expand: ["data.price.product"],
    });

    // Map line items to Sanity products
    const sanityProducts = lineItems.data.map((item) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
      },
      quantity: item.quantity || 0,
    }));

    // Prepare order data for Sanity
    orderData = {
      _type: "order",
      orderNumber,
      stripeCheckoutSessionId: id,
      stripeCustomerId: customer,
      clerkUserId,
      customerName,
      email: customerEmail,
      stripePaymentIntentId: payment_intent,
      products: sanityProducts,
      totalPrice: amount_total ? amount_total / 100 : 0,
      currency,
      amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
      status: "paid",
      orderDate: new Date().toISOString(),
    };
  } else if (method === "paypal") {
    const { id, purchase_units, payer } = paymentDetails;

    // Prepare order data for Sanity
    orderData = {
      _type: "order",
      orderNumber: id,
      paypalOrderId: id,
      paypalPayerId: payer.payer_id,
      customerName: `${payer.name.given_name} ${payer.name.surname}`,
      email: payer.email_address,
      products: [], // Add products if available
      totalPrice: parseFloat(purchase_units[0].amount.value),
      currency: purchase_units[0].amount.currency_code,
      amountDiscount: 0, // PayPal doesn't provide discount details
      status: "paid",
      orderDate: new Date().toISOString(),
    };
  }

  console.log("Saving order to Sanity:", orderData);

  try {
    // Save order to Sanity
    await backendClient.create(orderData);
    console.log("Order successfully saved to Sanity.");
  } catch (error) {
    console.error("Error saving order to Sanity:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}