import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getTeyaAPI } from './utils/teya';

/**
 * Netlify Function: Teya Webhook Handler
 * Receives payment notifications from Teya and triggers COO-Agent via n8n
 *
 * Teya Webhook Events:
 * - PaymentCreate: When a payment is created/completed
 * - PaymentCapture: When a pre-authorization is captured
 * - PaymentRefund: When a payment is refunded
 * - PaymentCancel: When a payment is cancelled
 *
 * Documentation: https://docs.borgun.is/paymentgateways/bapi/rpg/webhooks.html
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
    // Parse webhook data
    const webhookData = JSON.parse(event.body || '{}');

    console.log('Teya webhook received:', {
      eventId: webhookData.EventId,
      eventType: webhookData.EventType,
      created: webhookData.Created,
    });

    // Initialize Teya API
    const teya = getTeyaAPI();

    // Parse webhook payload
    const { eventId, eventType, paymentData } = teya.parseWebhook(webhookData);

    // Verify webhook authenticity by fetching from Teya API
    // This is recommended by Teya to prevent fraud
    let verifiedEvent;
    try {
      verifiedEvent = await teya.verifyWebhookEvent(eventId);
      console.log('Webhook verified successfully');
    } catch (error) {
      console.error('Webhook verification failed:', error);
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid webhook signature' }),
      };
    }

    // Handle PaymentCreate event (successful payment)
    if (eventType === 'PaymentCreate') {
      // Extract payment and order information
      const orderId = paymentData.OrderId || paymentData.Metadata?.orderId;
      const paymentId = paymentData.PaymentId || paymentData.Id;
      const status = paymentData.Status;
      const actionCode = paymentData.ActionCode;

      // Check if payment was successful
      // ActionCode 000 = Success, 001 = Approved
      const isSuccessful = actionCode === '000' || actionCode === '001' || status === 'Completed';

      if (!isSuccessful) {
        console.log('Payment not successful:', {
          orderId,
          paymentId,
          status,
          actionCode,
        });

        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            message: 'Payment not successful, no action taken',
          }),
        };
      }

      console.log('Payment successful:', {
        orderId,
        paymentId,
        status,
        actionCode,
      });

      // Prepare order data for n8n/COO-Agent
      const orderData = {
        orderId: orderId,
        paymentId: paymentId,
        customerEmail: paymentData.CustomerEmail || paymentData.Email,
        customerName: paymentData.CustomerName || paymentData.Name,
        amount: paymentData.Amount ? paymentData.Amount / 100 : 0, // Convert from minor units (aurar) to ISK
        currency: paymentData.Currency === 352 ? 'ISK' : 'UNKNOWN',
        product: paymentData.Metadata?.product || '30-day-roadmap',
        companyName: paymentData.Metadata?.company,
        status: 'payment_completed',
        paymentDate: new Date().toISOString(),
        metadata: paymentData.Metadata,
      };

      console.log('Triggering COO-Agent with order data:', {
        orderId: orderData.orderId,
        paymentId: orderData.paymentId,
        email: orderData.customerEmail,
        amount: orderData.amount,
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
        const errorText = await n8nResponse.text();
        console.error('Failed to trigger n8n workflow:', errorText);
        throw new Error('Failed to trigger n8n workflow');
      }

      console.log('COO-Agent triggered successfully');

      // Return HTTP 200 to Teya to confirm webhook received
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Webhook processed successfully',
          orderId: orderData.orderId,
        }),
      };
    }

    // Handle other webhook types (PaymentCapture, PaymentRefund, PaymentCancel)
    console.log('Webhook type not handled:', eventType);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Webhook received but not processed',
        eventType,
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
