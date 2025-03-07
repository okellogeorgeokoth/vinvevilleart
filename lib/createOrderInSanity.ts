import { CallbackMetadataItem, OrderMetadata, STKCallback } from "@/app/types/daraja";
import { backendClient } from "@/sanity/lib/backendClient";

export async function createOrderInSanity(
  callbackData: STKCallback,
  metadata: OrderMetadata
) {
  const {
    MerchantRequestID,
    CheckoutRequestID,
    CallbackMetadata,
  } = callbackData;

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata;

  // Extract payment details from the callback metadata
  const amount = CallbackMetadata?.Item?.find(
    (item: CallbackMetadataItem) => item.Name === "Amount"
  )?.Value;
  const phoneNumber = CallbackMetadata?.Item?.find(
    (item: CallbackMetadataItem) => item.Name === "PhoneNumber"
  )?.Value;

  // Create the order in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    darajaMerchantRequestId: MerchantRequestID,
    darajaCheckoutRequestId: CheckoutRequestID,
    customerName,
    clerkUserId,
    email: customerEmail,
    phoneNumber,
    totalPrice: amount,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}