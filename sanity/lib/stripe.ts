import Stripe from 'stripe';

// Ensure the Stripe secret key is defined
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with your secret key
export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-02-24.acacia', // Use the latest Stripe API version
  });
/**
 * Verify Stripe webhook signature
 * @param {Buffer} payload - Raw request body
 * @param {string} signature - Stripe signature from headers
 * @param {string} secret - Stripe webhook secret
 * @returns {object} - Stripe event object
 */
export const verifyStripeWebhook = (
  payload: Buffer,
  signature: string,
  secret: string
): Stripe.Event => {
  return stripe.webhooks.constructEvent(payload, signature, secret);
};