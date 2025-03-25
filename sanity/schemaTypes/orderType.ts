import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({ name: "orderNumber", title: "Order Number", type: "string" }),
    defineField({ name: "stripeCheckoutSessionId", title: "Stripe Checkout Session ID", type: "string" }),
    defineField({ name: "stripeCustomerId", title: "Stripe Customer ID", type: "string" }),
    defineField({ name: "clerkUserId", title: "Store User ID", type: "string" }),
    defineField({ name: "customerName", title: "Customer Name", type: "string" }),
    defineField({ name: "email", title: "Customer Email", type: "string" }),
    defineField({ name: "stripePaymentIntentId", title: "Stripe Payment Intent ID", type: "string" }),
    defineField({ name: "paypalOrderId", title: "PayPal Order ID", type: "string" }),
    defineField({ name: "paypalPayerId", title: "PayPal Payer ID", type: "string" }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "product", title: "Product Bought", type: "reference", to: { type: "product" } }),
            defineField({ name: "quantity", title: "Quantity Purchased", type: "number" }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x (${select.quantity})`,
                subtitle: `$${(select.price ?? 0) * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({ name: "totalPrice", title: "Total Price", type: "number" }),
    defineField({ name: "currency", title: "Currency", type: "string" }),
    defineField({ name: "amountDiscount", title: "Amount Discount", type: "number" }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "paid",
    }),
    defineField({ name: "orderDate", title: "Order Date", type: "datetime" }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      const orderIdSnippet = select.orderId
        ? `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`
        : "No ID";
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `$${select.amount} ${select.currency}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});
