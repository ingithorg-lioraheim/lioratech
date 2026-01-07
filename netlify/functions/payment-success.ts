import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

/**
 * Netlify Function: Payment Success Handler
 *
 * Handles POST redirect from Teya payment gateway
 * Converts POST to GET redirect with query parameters
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log('[PaymentSuccess] Method:', event.httpMethod);

  // Handle POST from Teya
  if (event.httpMethod === 'POST') {
    try {
      // Parse form data from Teya
      const params = new URLSearchParams(event.body || '');

      const orderId = params.get('orderid') || params.get('orderId');
      const status = params.get('status');
      const authCode = params.get('authorizationcode');

      console.log('[PaymentSuccess] POST data:', {
        orderId,
        status,
        authCode,
      });

      // Build redirect URL with query params for React Router
      const redirectUrl = new URL('https://lioratech.is/payment-success');
      if (orderId) redirectUrl.searchParams.set('orderId', orderId);
      if (status) redirectUrl.searchParams.set('status', status);
      if (authCode) redirectUrl.searchParams.set('authCode', authCode);

      console.log('[PaymentSuccess] Redirecting to:', redirectUrl.toString());

      // 302 redirect to GET request
      return {
        statusCode: 302,
        headers: {
          Location: redirectUrl.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        body: '',
      };
    } catch (error: any) {
      console.error('[PaymentSuccess] Error:', error);

      // Fallback redirect on error
      return {
        statusCode: 302,
        headers: {
          Location: 'https://lioratech.is/payment-success',
        },
        body: '',
      };
    }
  }

  // Handle GET (shouldn't happen, but just in case)
  if (event.httpMethod === 'GET') {
    // Just redirect to the page
    return {
      statusCode: 302,
      headers: {
        Location: 'https://lioratech.is/payment-success' + (event.rawQuery ? '?' + event.rawQuery : ''),
      },
      body: '',
    };
  }

  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: '',
    };
  }

  // Other methods not allowed
  return {
    statusCode: 405,
    body: 'Method not allowed',
  };
};
