import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import {
  getSecurePayConfig,
  generateCheckHash,
  generateOrderId,
  formatAmount,
  type PaymentFormData,
} from './utils/securepay';

interface CreatePaymentRequest {
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  companyName?: string;
  itemDescription?: string;
}

/**
 * Netlify Function: Create SecurePay Payment Form Data
 *
 * Generates payment form data with HMAC-SHA256 signature
 * for posting to Teya SecurePay hosted payment page
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request
    const requestData: CreatePaymentRequest = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!requestData.amount || !requestData.currency || !requestData.customerEmail) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: amount, currency, customerEmail',
        }),
      };
    }

    // Get SecurePay config
    const config = getSecurePayConfig();

    // Generate unique order ID
    const orderId = generateOrderId();

    // Get site URL - FORCE production URL to avoid Netlify preview URLs
    const siteUrl = 'https://lioratech.is';

    console.log('[CreatePaymentForm] Environment check:', {
      'process.env.URL': process.env.URL,
      'using siteUrl': siteUrl,
    });

    // Build callback URLs
    const returnUrlSuccess = `${siteUrl}/payment-success`;
    const returnUrlSuccessServer = `${siteUrl}/.netlify/functions/payment-callback`;
    const returnUrlCancel = `${siteUrl}/payment-error?status=cancel`;
    const returnUrlError = `${siteUrl}/payment-error?status=error`;

    console.log('[CreatePaymentForm] Return URLs:', {
      success: returnUrlSuccess,
      server: returnUrlSuccessServer,
      cancel: returnUrlCancel,
      error: returnUrlError,
    });

    // Format amount
    const formattedAmount = formatAmount(requestData.amount, requestData.currency);

    // Build payment form data
    const paymentData: PaymentFormData = {
      orderId,
      amount: formattedAmount,
      currency: requestData.currency,
      language: 'IS',
      returnUrlSuccess,
      returnUrlSuccessServer,
      returnUrlCancel,
      returnUrlError,
      customerName: requestData.customerName,
      customerEmail: requestData.customerEmail,
      itemDescription: requestData.itemDescription || '30 daga AI roadmap',
      skipReceiptPage: true,
    };

    // Generate HMAC-SHA256 signature
    const checkHash = generateCheckHash(config, paymentData);

    // Build complete form data to return to client
    const formData = {
      // Endpoint
      actionUrl: config.endpoint,

      // Required fields
      merchantid: config.merchantId,
      paymentgatewayid: config.gatewayId,
      orderid: orderId,
      amount: formattedAmount.toString(),
      currency: requestData.currency,
      language: 'IS',
      checkhash: checkHash,

      // Return URLs
      returnurlsuccess: returnUrlSuccess,
      returnurlsuccessserver: returnUrlSuccessServer,
      returnurlcancel: returnUrlCancel,
      returnurlerror: returnUrlError,

      // Customer info
      buyername: requestData.customerName,
      buyeremail: requestData.customerEmail,

      // Item details (index starts at 0)
      itemdescription_0: requestData.itemDescription || `30 daga AI roadmap fyrir ${requestData.companyName || 'fyrirtækið þitt'}`,
      itemcount_0: '1',
      itemunitamount_0: formattedAmount.toString(),
      itemamount_0: formattedAmount.toString(),

      // Options
      skipreceiptpage: '1', // Skip Teya receipt, redirect to our success page
    };

    console.log('[CreatePaymentForm] Generated form data:', {
      orderId,
      amount: formattedAmount,
      email: requestData.customerEmail,
      endpoint: config.endpoint,
    });

    // Return form data
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        formData,
        orderId,
      }),
    };
  } catch (error: any) {
    console.error('[CreatePaymentForm] Error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create payment form',
        message: error.message,
      }),
    };
  }
};
