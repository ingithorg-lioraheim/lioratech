import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getTeyaAPI } from './utils/teya';

interface CheckoutRequest {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  companyName?: string;
  metadata?: any;
}

/**
 * Netlify Function: Create Teya Checkout
 * Creates a Teya hosted checkout page for the 30-day roadmap product
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const requestData: CheckoutRequest = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!requestData.amount || !requestData.currency || !requestData.customerEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: amount, currency, customerEmail',
        }),
      };
    }

    // Get site URL for redirect URLs
    const siteUrl = process.env.URL || 'https://lioratech.is';

    // Initialize Teya API
    const teya = getTeyaAPI();

    // Extract orderId from metadata
    const orderId = requestData.metadata?.orderId;

    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing orderId in metadata',
        }),
      };
    }

    // Create Teya Payment
    const payment = await teya.createPayment({
      amount: requestData.amount,
      currency: requestData.currency,
      orderId: orderId,
      customerEmail: requestData.customerEmail,
      customerName: requestData.customerName || requestData.customerEmail,
      description: `30 Day AI Roadmap - ${requestData.companyName || 'Order'}`,
      metadata: {
        product: '30-day-roadmap',
        company: requestData.companyName,
        orderId: orderId, // Include orderId for webhook callback
        ...requestData.metadata,
      },
      successUrl: `${siteUrl}/payment-success?orderId=${orderId}`,
      cancelUrl: `${siteUrl}/payment-error`,
    });

    console.log('Teya payment created:', {
      paymentId: payment.paymentId,
      email: requestData.customerEmail,
      amount: requestData.amount,
      url: payment.paymentUrl,
      status: payment.status,
    });

    // Return payment URL and ID
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        checkoutId: payment.paymentId,
        checkoutUrl: payment.paymentUrl,
        status: payment.status,
      }),
    };
  } catch (error: any) {
    console.error('Error creating checkout:', error);
    console.error('Error details:', error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create checkout',
        message: error.message,
      }),
    };
  }
};
