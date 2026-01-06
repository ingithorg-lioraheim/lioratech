import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { validateOrderHash } from './utils/securepay';

/**
 * Netlify Function: SecurePay Payment Callback
 *
 * Receives server-to-server notification from Teya SecurePay
 * when payment is completed.
 *
 * CRITICAL: Must validate orderhash to prevent fraud!
 * CRITICAL: Must return XML response: <PaymentNotification>Accepted</PaymentNotification>
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed',
    };
  }

  try {
    // Parse callback data (sent as form data or query params)
    const params = new URLSearchParams(event.body || '');

    const status = params.get('status');
    const orderId = params.get('orderid');
    const amount = params.get('amount');
    const currency = params.get('currency');
    const orderHash = params.get('orderhash');
    const authorizationCode = params.get('authorizationcode');
    const creditCardNumber = params.get('creditcardnumber'); // Masked: 1234-12____-1234
    const step = params.get('step'); // 'Payment' for server callback, 'Confirmation' for browser

    console.log('[PaymentCallback] Received callback:', {
      status,
      orderId,
      amount,
      currency,
      step,
      authCode: authorizationCode,
    });

    // Check if payment was successful (case-insensitive check for 'OK' or 'Ok')
    if (status?.toUpperCase() !== 'OK') {
      console.log('[PaymentCallback] Payment not successful:', status);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/xml' },
        body: '<PaymentNotification>Accepted</PaymentNotification>',
      };
    }

    // Validate required fields
    if (!orderId || !amount || !currency || !orderHash) {
      console.error('[PaymentCallback] Missing required fields');
      return {
        statusCode: 400,
        body: 'Missing required fields',
      };
    }

    // CRITICAL: Validate orderhash to prevent fraud
    const secretKey = process.env.VITE_TEYA_MODE !== 'production'
      ? process.env.TEYA_TEST_SECRET_KEY
      : process.env.TEYA_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Teya secret key not configured');
    }

    const isValid = validateOrderHash(
      secretKey,
      orderId,
      amount,
      currency,
      orderHash
    );

    if (!isValid) {
      console.error('[PaymentCallback] FRAUD ATTEMPT - Invalid orderhash!', {
        orderId,
        amount,
        currency,
        receivedHash: orderHash,
      });

      return {
        statusCode: 401,
        body: 'Invalid orderhash',
      };
    }

    console.log('[PaymentCallback] ✅ OrderHash validated successfully');

    // Only process server-to-server callback (step=Payment)
    // Browser redirect (step=Confirmation) is handled separately
    if (step === 'Payment') {
      console.log('[PaymentCallback] Processing server callback...');

      // Prepare order data for n8n (matching expected format from workflow)
      const orderData = {
        data: {
          metadata: {
            orderId, // n8n looks for data.metadata.orderId
          },
          id: orderId, // Payment ID
          status: 'CLO', // Closed/Completed
          amount: parseFloat(amount),
          currency,
        },
        orderId, // Also at root level for backwards compatibility
        authorizationCode,
        creditCardNumber,
        paymentDate: new Date().toISOString(),
        product: '30-day-roadmap',
      };

      console.log('[PaymentCallback] Triggering COO Agent:', {
        orderId: orderData.orderId,
        amount: orderData.amount,
      });

      // Send to n8n webhook to trigger COO Agent
      const n8nWebhook = process.env.N8N_ROADMAP_WEBHOOK ||
                         'https://lioratech.app.n8n.cloud/webhook/roadmap-request';

      try {
        const n8nResponse = await fetch(n8nWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!n8nResponse.ok) {
          const errorText = await n8nResponse.text();
          console.error('[PaymentCallback] n8n webhook failed:', errorText);
          // Don't throw - still return Accepted to Teya
        } else {
          console.log('[PaymentCallback] ✅ COO Agent triggered successfully');
        }
      } catch (n8nError: any) {
        console.error('[PaymentCallback] n8n webhook error:', n8nError.message);
        // Don't throw - still return Accepted to Teya
      }
    }

    // CRITICAL: Return XML response to Teya
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/xml' },
      body: '<PaymentNotification>Accepted</PaymentNotification>',
    };
  } catch (error: any) {
    console.error('[PaymentCallback] Error:', error);

    // Still return Accepted to Teya to avoid retry loop
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/xml' },
      body: '<PaymentNotification>Accepted</PaymentNotification>',
    };
  }
};
