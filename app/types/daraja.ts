// types/daraja.ts

export interface CallbackMetadataItem {
  Name: string;
  Value: string | number | null;
}

export interface CallbackMetadata {
  Item: CallbackMetadataItem[];
}

export interface STKCallback {
  ResultCode: string;
  ResultDesc: string;
  MerchantRequestID: string;
  CallbackMetadata?: CallbackMetadata;
}

export interface DarajaCallbackBody {
  Body: {
    stkCallback: STKCallback;
  };
}

// types/daraja.ts (or create a new file if needed)

export interface CallbackMetadataItem {
  Name: string;
  Value: string | number | null;
}

export interface CallbackMetadata {
  Item: CallbackMetadataItem[];
}

export interface STKCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  CallbackMetadata?: CallbackMetadata;
}

export interface OrderMetadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}