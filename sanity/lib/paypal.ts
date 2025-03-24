import axios from 'axios';

/**
 * Interface for PayPal webhook event
 */
interface PayPalWebhookEvent {
  headers: {
    'paypal-auth-algo': string;
    'paypal-cert-url': string;
    'paypal-transmission-id': string;
    'paypal-transmission-sig': string;
    'paypal-transmission-time': string;
  };
  body: object; // The actual webhook payload
}

/**
 * Verify PayPal webhook signature
 * @param {PayPalWebhookEvent} webhookEvent - PayPal webhook event
 * @param {string} webhookId - PayPal webhook ID
 * @returns {boolean} - True if the signature is valid, false otherwise
 */
export const verifyPaypalWebhook = async (
  webhookEvent: PayPalWebhookEvent,
  webhookId: string
): Promise<boolean> => {
  try {
    const response = await axios.post<{ verification_status: string }>(
      `${process.env.PAYPAL_API_BASE_URL}/v1/notifications/verify-webhook-signature`,
      {
        auth_algo: webhookEvent.headers['paypal-auth-algo'],
        cert_url: webhookEvent.headers['paypal-cert-url'],
        transmission_id: webhookEvent.headers['paypal-transmission-id'],
        transmission_sig: webhookEvent.headers['paypal-transmission-sig'],
        transmission_time: webhookEvent.headers['paypal-transmission-time'],
        webhook_id: webhookId,
        webhook_event: webhookEvent.body,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getPaypalAccessToken()}`,
        },
      }
    );

    return response.data.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Error verifying PayPal webhook:', error);
    return false;
  }
};

/**
 * Get PayPal access token for API requests
 * @returns {string} - PayPal access token
 */
const getPaypalAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET}`
  ).toString('base64');

  const response = await axios.post<{ access_token: string }>(
    `${process.env.PAYPAL_API_BASE_URL}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
};