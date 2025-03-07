import type { Order } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export async function getMyOrders(userId: string): Promise<Order[] | []> {
  if (!userId) {
    throw new Error("User not logged in");
  }

  //  Define the query get orders based on user ID
  const MY_ORDERS_QUERY = defineQuery(
    `
      *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
        ...,
        products[]{
          ...,
          product->
        }
      }
    `,
  );

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders", error);
    throw new Error("Error fetching orders");
  }
}
