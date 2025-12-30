import { createHmac } from 'crypto';

interface RapydConfig {
  accessKey: string;
  secretKey: string;
  baseUrl: string;
}

/**
 * Rapyd API Utility
 * Handles signature generation and API calls to Rapyd
 */
export class RapydAPI {
  private config: RapydConfig;

  constructor(config: RapydConfig) {
    this.config = config;
  }

  /**
   * Generate HMAC signature for Rapyd API requests
   * https://docs.rapyd.net/en/authentication.html
   */
  private generateSignature(
    method: string,
    urlPath: string,
    salt: string,
    timestamp: string,
    body: string = ''
  ): string {
    const toSign = `${method}${urlPath}${salt}${timestamp}${this.config.accessKey}${this.config.secretKey}${body}`;

    return createHmac('sha256', this.config.secretKey)
      .update(toSign)
      .digest('hex');
  }

  /**
   * Make authenticated request to Rapyd API
   */
  async makeRequest(
    method: string,
    urlPath: string,
    body?: any
  ): Promise<any> {
    const salt = this.generateSalt();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const bodyString = body ? JSON.stringify(body) : '';

    const signature = this.generateSignature(
      method,
      urlPath,
      salt,
      timestamp,
      bodyString
    );

    const headers = {
      'Content-Type': 'application/json',
      'access_key': this.config.accessKey,
      'salt': salt,
      'timestamp': timestamp,
      'signature': signature,
    };

    const url = `${this.config.baseUrl}${urlPath}`;

    const response = await fetch(url, {
      method,
      headers,
      body: bodyString || undefined,
    });

    const data = await response.json();

    if (!response.ok || (data.status && data.status.status !== 'SUCCESS')) {
      const message = (data.status && data.status.message) || 'Unknown error';
      throw new Error(`Rapyd API error: ${message}`);
    }

    return data.data;
  }

  /**
   * Generate random salt for request
   */
  private generateSalt(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Create a checkout page
   */
  async createCheckout(params: {
    amount: number;
    currency: string;
    customer_email: string;
    customer_name: string;
    metadata?: any;
    complete_payment_url?: string;
    error_payment_url?: string;
  }) {
    return this.makeRequest('POST', '/v1/checkout', params);
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    signature: string,
    salt: string,
    timestamp: string,
    urlPath: string,
    body: string
  ): boolean {
    const expectedSignature = this.generateSignature(
      'POST',
      urlPath,
      salt,
      timestamp,
      body
    );

    return signature === expectedSignature;
  }
}

/**
 * Get configured Rapyd API instance
 */
export function getRapydAPI(): RapydAPI {
  const accessKey = process.env.RAPYD_ACCESS_KEY;
  const secretKey = process.env.RAPYD_SECRET_KEY;
  const baseUrl = process.env.RAPYD_BASE_URL || 'https://sandboxapi.rapyd.net';

  if (!accessKey || !secretKey) {
    throw new Error('Rapyd credentials not configured');
  }

  return new RapydAPI({
    accessKey,
    secretKey,
    baseUrl,
  });
}
