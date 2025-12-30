import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getRapydAPI } from './utils/rapyd';

interface CheckoutRequest {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  companyName?: string;
  metadata?: any;
}

/**
 * Netlify Function: Create Rapyd Checkout
 * Creates a Rapyd hosted checkout page for the 30-day roadmap product
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

    // Initialize Rapyd API
    const rapyd = getRapydAPI();

    // Extract orderId from metadata
    const orderId = requestData.metadata?.orderId;

    // Create checkout session
    const checkout = await rapyd.createCheckout({
      amount: requestData.amount,
      currency: requestData.currency,
      customer_email: requestData.customerEmail,
      customer_name: requestData.customerName || requestData.customerEmail,
      metadata: {
        product: '30-day-roadmap',
        company: requestData.companyName,
        orderId: orderId, // Include orderId for webhook callback
        ...requestData.metadata,
      },
      complete_payment_url: `${siteUrl}/payment-success?orderId=${orderId}`,
      error_payment_url: `${siteUrl}/payment-error`,
    });

    console.log('Checkout created:', {
      id: checkout.id,
      email: requestData.customerEmail,
      amount: requestData.amount,
    });

    // Return checkout URL and ID
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        checkoutId: checkout.id,
        checkoutUrl: checkout.redirect_url,
      }),
    };
  } catch (error: any) {
    console.error('Error creating checkout:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create checkout',
        message: error.message,
      }),
    };
  }
};
