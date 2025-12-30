import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getRapydAPI } from './utils/rapyd';

/**
 * Netlify Function: Rapyd Webhook Handler
 * Receives payment confirmations from Rapyd and triggers COO-Agent via n8n
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
    // Get webhook signature headers
    const signature = event.headers['signature'] || '';
    const salt = event.headers['salt'] || '';
    const timestamp = event.headers['timestamp'] || '';

    // Verify webhook signature
    const rapyd = getRapydAPI();
    const isValid = rapyd.verifyWebhookSignature(
      signature,
      salt,
      timestamp,
      '/.netlify/functions/rapyd-webhook',
      event.body || ''
    );

    if (!isValid) {
      console.error('Invalid webhook signature');
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    // Parse webhook data
    const webhookData = JSON.parse(event.body || '{}');

    console.log('Rapyd webhook received:', {
      type: webhookData.type,
      id: webhookData.id,
    });

    // Handle payment completed event
    if (webhookData.type === 'PAYMENT_COMPLETED') {
      const paymentData = webhookData.data;

      // Extract customer and order info
      // Use the Order ID from metadata (links to questionnaire data)
      const questionnaireOrderId = paymentData.metadata?.orderId;

      const orderData = {
        orderId: questionnaireOrderId || paymentData.id, // Use questionnaire Order ID if available
        paymentId: paymentData.id, // Rapyd payment ID
        customerEmail: paymentData.customer_email || paymentData.email,
        customerName: paymentData.customer_name,
        amount: paymentData.amount,
        currency: paymentData.currency,
        product: paymentData.metadata?.product || '30-day-roadmap',
        companyName: paymentData.metadata?.company,
        status: 'payment_completed', // Update status to trigger COO-Agent
        paymentDate: new Date().toISOString(),
        metadata: paymentData.metadata,
      };

      console.log('Payment completed, triggering COO-Agent:', {
        orderId: orderData.orderId,
        paymentId: orderData.paymentId,
        email: orderData.customerEmail,
      });

      // Send to n8n webhook to trigger COO-Agent
      const n8nWebhook = process.env.N8N_ROADMAP_WEBHOOK ||
                         'https://lioratech.app.n8n.cloud/webhook/roadmap-request';

      const n8nResponse = await fetch(n8nWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!n8nResponse.ok) {
        throw new Error('Failed to trigger n8n workflow');
      }

      console.log('COO-Agent triggered successfully');

      // Return success to Rapyd
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Webhook processed',
        }),
      };
    }

    // Handle other webhook types (payment failed, refund, etc.)
    console.log('Webhook type not handled:', webhookData.type);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Webhook received but not processed',
      }),
    };
  } catch (error: any) {
    console.error('Error processing webhook:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process webhook',
        message: error.message,
      }),
    };
  }
};
