import { client } from "./client";
import type { Mutation } from "@sanity/client";

interface OrderItem {
  product: {
    _type: 'reference';
    _ref: string;
  };
  quantity: number;
}

export interface Order {
  _type: 'order';
  orderNumber: string;
  stripeCheckoutSessionId: string;
  stripeCustomerId?: string;
  clerkUserId?: string;
  customerName: string;
  email: string;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  paypalPayerId?: string;
  products: OrderItem[];
  totalPrice: number;
  currency: string;
  amountDiscount?: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

export const createSanityOrder = async (order: Partial<Order>) => {
  // Validate required fields
  if (!order.orderNumber || !order.customerName || !order.email || !order.totalPrice) {
    throw new Error('Missing required order fields');
  }

  // Correct mutation format
  const mutations: Mutation[] = [
    {
      create: {
        _type: 'order',
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        email: order.email,
        totalPrice: order.totalPrice,
        currency: order.currency || 'USD',
        status: order.status || 'paid',
        orderDate: order.orderDate || new Date().toISOString(),
        products: order.products || [],
        ...(order.stripeCheckoutSessionId && { 
          stripeCheckoutSessionId: order.stripeCheckoutSessionId 
        }),
        ...order
      }
    }
  ];

  try {
    const result = await client.mutate(mutations);
    console.log('Order created:', result);
    return result;
  } catch (error: unknown) {
    let errorMessage = 'Order creation failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Order creation failed:', error);
    throw new Error(errorMessage);
  }
};