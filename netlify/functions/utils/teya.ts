import { createHmac } from 'crypto';

interface TeyaConfig {
  privateToken: string;
  publicToken?: string;
  baseUrl: string;
  isTestMode: boolean;
}

interface PaymentParams {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, any>;
  successUrl?: string;
  cancelUrl?: string;
}

interface PaymentResponse {
  paymentId: string;
  status: string;
  paymentUrl?: string;
  actionCode?: string;
  message?: string;
}

/**
 * Teya RPG (Restful Payment Gateway) API Utility
 * Documentation: https://docs.borgun.is/paymentgateways/bapi/rpg/
 *
 * Teya (formerly Borgun) provides a REST API for payment processing
 * with webhook support for payment notifications.
 */
export class TeyaAPI {
  private config: TeyaConfig;

  constructor(config: TeyaConfig) {
    this.config = config;
  }

  /**
   * Make authenticated request to Teya RPG API
   * Uses Bearer token authentication with Private Token
   */
  private async makeRequest(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.privateToken}`,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    console.log(`[Teya API] ${method} ${endpoint}`);

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error('[Teya API Error]:', data);
      throw new Error(
        `Teya API error: ${data.message || data.error || 'Unknown error'}`
      );
    }

    return data;
  }

  /**
   * Create a payment charge
   * This creates a hosted payment page that the customer is redirected to
   *
   * @param params Payment parameters
   * @returns Payment response with paymentUrl for redirect
   */
  async createPayment(params: PaymentParams): Promise<PaymentResponse> {
    // Convert ISK amount to minor units (aurar)
    // Teya expects amount in smallest currency unit (e.g., 69900 ISK = 6990000 aurar)
    const amountInMinorUnits = params.currency === 'ISK'
      ? params.amount * 100
      : params.amount;

    const requestBody = {
      // Transaction details
      Amount: amountInMinorUnits,
      Currency: this.getCurrencyCode(params.currency),
      OrderId: params.orderId,

      // Customer info
      CustomerEmail: params.customerEmail,
      CustomerName: params.customerName,

      // Description
      Description: params.description || '30 Day AI Roadmap',

      // Transaction type: Sale (immediate capture) vs PreAuth (capture later)
      TransactionType: 'Sale',

      // Return URLs for hosted payment page
      ReturnUrlSuccess: params.successUrl,
      ReturnUrlCancel: params.cancelUrl,

      // Metadata (custom data that will be returned in webhook)
      Metadata: params.metadata || {},

      // Enable 3D Secure for security
      ThreeDSecure: true,
    };

    console.log('[Teya] Creating payment:', {
      orderId: params.orderId,
      amount: amountInMinorUnits,
      currency: params.currency,
    });

    try {
      const response = await this.makeRequest('POST', '/api/payments', requestBody);

      // Teya returns payment details including hosted page URL
      return {
        paymentId: response.PaymentId || response.Id,
        status: response.Status,
        paymentUrl: response.PaymentUrl || response.HostedPaymentUrl,
        actionCode: response.ActionCode,
        message: response.Message,
      };
    } catch (error: any) {
      console.error('[Teya] Payment creation failed:', error);
      throw error;
    }
  }

  /**
   * Get payment details by ID
   * Useful for verifying webhook data
   */
  async getPayment(paymentId: string): Promise<any> {
    return this.makeRequest('GET', `/api/payments/${paymentId}`);
  }

  /**
   * Verify webhook event by fetching from Teya API
   * Teya recommends verifying webhooks by calling GET /api/events/{eventId}
   *
   * @param eventId Event ID from webhook
   * @returns Event data if valid
   */
  async verifyWebhookEvent(eventId: string): Promise<any> {
    try {
      const event = await this.makeRequest('GET', `/api/events/${eventId}`);
      console.log('[Teya] Webhook verified:', eventId);
      return event;
    } catch (error) {
      console.error('[Teya] Webhook verification failed:', error);
      throw new Error('Invalid webhook event');
    }
  }

  /**
   * Convert currency code to ISO 4217 numeric code
   * Teya API uses numeric currency codes
   */
  private getCurrencyCode(currency: string): number {
    const currencyCodes: Record<string, number> = {
      'ISK': 352,  // Icelandic Króna
      'EUR': 978,  // Euro
      'USD': 840,  // US Dollar
      'GBP': 826,  // British Pound
    };

    const code = currencyCodes[currency.toUpperCase()];
    if (!code) {
      throw new Error(`Unsupported currency: ${currency}`);
    }

    return code;
  }

  /**
   * Parse webhook payload
   * Teya sends webhooks in this format:
   * {
   *   "EventId": "string",
   *   "EventType": "PaymentCreate" | "PaymentCapture" | "PaymentRefund" | "PaymentCancel",
   *   "Created": "2024-01-01T00:00:00Z",
   *   "Data": { payment data }
   * }
   */
  parseWebhook(webhookBody: any): {
    eventId: string;
    eventType: string;
    created: string;
    paymentData: any;
  } {
    return {
      eventId: webhookBody.EventId,
      eventType: webhookBody.EventType,
      created: webhookBody.Created,
      paymentData: webhookBody.Data,
    };
  }
}

/**
 * Get configured Teya API instance from environment variables
 */
export function getTeyaAPI(): TeyaAPI {
  const privateToken = process.env.TEYA_PRIVATE_TOKEN;
  const publicToken = process.env.TEYA_PUBLIC_TOKEN;
  const isTestMode = process.env.TEYA_ENVIRONMENT !== 'production';

  // Test environment: test.borgun.is/rpgapi
  // Production: api.borgun.is/rpgapi (or similar)
  const baseUrl = isTestMode
    ? 'https://test.borgun.is/rpgapi'
    : (process.env.TEYA_BASE_URL || 'https://api.borgun.is/rpgapi');

  if (!privateToken) {
    throw new Error('Teya Private Token not configured. Set TEYA_PRIVATE_TOKEN environment variable.');
  }

  console.log('[Teya] Initialized:', {
    environment: isTestMode ? 'TEST' : 'PRODUCTION',
    baseUrl,
  });

  return new TeyaAPI({
    privateToken,
    publicToken,
    baseUrl,
    isTestMode,
  });
}
