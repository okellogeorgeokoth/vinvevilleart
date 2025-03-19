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