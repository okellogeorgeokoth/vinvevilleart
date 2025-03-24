import { NextApiRequest, NextApiResponse } from 'next';
import stripe from "@/lib/stripe";
import { sanity } from "@/sanity/lib/sanityClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'];

  // Ensure the Stripe webhook secret is defined
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(500).json({ error: 'Stripe webhook secret is not configured' });
  }

  // Ensure the signature is defined
  if (!sig) {
    return res.status(400).json({ error: 'Stripe signature is missing' });
  }

  const payload = req.body;

  let event;

  try {
    // Construct the event
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    // Handle the error safely
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    const orderData = {
      _type: 'order',
      orderNumber: `ORD-${Date.now()}`,
      stripeCheckoutSessionId: paymentIntent.id,
      stripeCustomerId: paymentIntent.customer,
      clerkUserId: 'user-id-from-your-system', // Replace with actual user ID
      customerName: paymentIntent.shipping?.name || 'Unknown',
      email: paymentIntent.receipt_email,
      stripePaymentIntentId: paymentIntent.id,
      products: [], // Add products from your cart system
      totalPrice: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      amountDiscount: 0,
      status: 'paid',
      orderDate: new Date().toISOString(),
    };

    await sanity.create(orderData);
  }

  res.status(200).json({ received: true });
}