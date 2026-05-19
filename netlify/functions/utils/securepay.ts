import { createHmac } from 'crypto';

/**
 * Teya SecurePay (Hosted Payment Page) Utility
 * Documentation: https://docs.borgun.is/hostedpayments/securepay/
 */

export interface SecurePayConfig {
  merchantId: string;
  gatewayId: string;
  secretKey: string;
  endpoint: string;
  isTestMode: boolean;
}

export interface PaymentFormData {
  orderId: string;
  amount: number;
  currency: string;
  language: string;
  returnUrlSuccess: string;
  returnUrlSuccessServer: string;
  returnUrlCancel?: string;
  returnUrlError?: string;
  customerName?: string;
  customerEmail?: string;
  itemDescription?: string;
  skipReceiptPage?: boolean;
}

/**
 * Generate HMAC-SHA256 CheckHash for SecurePay
 *
 * Message format: MerchantId|ReturnUrlSuccess|ReturnUrlSuccessServer|OrderId|Amount|Currency
 */
export function generateCheckHash(
  config: SecurePayConfig,
  data: PaymentFormData
): string {
  // Build message string with pipe delimiter
  const message = [
    config.merchantId,
    data.returnUrlSuccess,
    data.returnUrlSuccessServer,
    data.orderId,
    data.amount.toString(),
    data.currency,
  ].join('|');

  console.log('[SecurePay] Generating CheckHash for message:', message);

  // Create HMAC-SHA256 hash
  const hmac = createHmac('sha256', config.secretKey);
  hmac.update(message, 'utf8');
  const hash = hmac.digest('hex');

  console.log('[SecurePay] CheckHash generated:', hash.substring(0, 16) + '...');

  return hash;
}

/**
 * Validate OrderHash from SecurePay callback
 *
 * Message format: OrderId|Amount|Currency
 */
export function validateOrderHash(
  secretKey: string,
  orderId: string,
  amount: string,
  currency: string,
  receivedHash: string
): boolean {
  // Build message string
  const message = [orderId, amount, currency].join('|');

  console.log('[SecurePay] Validating OrderHash for:', message);

  // Create HMAC-SHA256 hash
  const hmac = createHmac('sha256', secretKey);
  hmac.update(message, 'utf8');
  const expectedHash = hmac.digest('hex');

  const isValid = expectedHash.toLowerCase() === receivedHash.toLowerCase();

  console.log('[SecurePay] OrderHash validation:', isValid ? 'VALID' : 'INVALID');

  return isValid;
}

/**
 * Get SecurePay configuration from environment variables
 */
export function getSecurePayConfig(): SecurePayConfig {
  const isTestMode = process.env.VITE_TEYA_MODE !== 'production';

  // Use correct credentials for test vs production
  const merchantId = isTestMode
    ? process.env.TEYA_TEST_MERCHANT_ID
    : process.env.TEYA_MERCHANT_ID;

  const gatewayId = isTestMode
    ? process.env.TEYA_TEST_GATEWAY_ID || ''
    : process.env.TEYA_GATEWAY_ID;

  const secretKey = isTestMode
    ? process.env.TEYA_TEST_SECRET_KEY
    : process.env.TEYA_SECRET_KEY;

  const endpoint = isTestMode
    ? process.env.VITE_TEYA_TEST_ENDPOINT || 'https://test.borgun.is/SecurePay/default.aspx'
    : process.env.VITE_TEYA_PROD_ENDPOINT;

  if (!merchantId || !secretKey) {
    throw new Error(
      `Teya credentials not configured for ${isTestMode ? 'TEST' : 'PRODUCTION'} mode`
    );
  }

  console.log('[SecurePay] Initialized:', {
    environment: isTestMode ? 'TEST' : 'PRODUCTION',
    merchantId,
    endpoint,
  });

  return {
    merchantId,
    gatewayId: gatewayId || '',
    secretKey,
    endpoint: endpoint || '',
    isTestMode,
  };
}

/**
 * Generate OrderID in format: 30D-YYYYMMDD-XXX
 * Max 12 alphanumeric characters (no extended characters)
 */
export function generateOrderId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Generate 3 random uppercase letters
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();

  // Format: 30D-YYYYMMDD-XXX (max 12 chars without dashes = 30DYYYYMMDDXXX)
  // But we keep dashes for readability
  const orderId = `30D${year}${month}${day}${random}`;

  // Ensure max 12 characters
  return orderId.substring(0, 12);
}

/**
 * Format amount for SecurePay
 * ISK with 2 decimal places: 69.900 kr = 69900
 */
export function formatAmount(amount: number, currency: string): number {
  if (currency === 'ISK') {
    // ISK amounts are sent as whole numbers (no decimals)
    return Math.round(amount);
  }
  return amount;
}
