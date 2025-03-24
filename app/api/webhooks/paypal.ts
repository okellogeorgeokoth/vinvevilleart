import { NextApiRequest, NextApiResponse } from 'next';
import { sanity } from "@/sanity/lib/sanityClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const event = req.body;

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    const payment = event.resource;

    const orderData = {
      _type: 'order',
      orderNumber: `ORD-${Date.now()}`,
      paypalOrderId: payment.id,
      paypalPayerId: payment.payer.payer_id,
      clerkUserId: 'user-id-from-your-system', // Replace with actual user ID
      customerName: payment.payer.name?.given_name || 'Unknown',
      email: payment.payer.email_address,
      products: [], // Add products from your cart system
      totalPrice: parseFloat(payment.amount.value),
      currency: payment.amount.currency_code,
      amountDiscount: 0,
      status: 'paid',
      orderDate: new Date().toISOString(),
    };

    await sanity.create(orderData);
  }

  res.status(200).json({ received: true });
}