/**
 * Google Analytics 4 Event Tracking Utility
 *
 * Usage:
 * import { trackEvent, trackPageView, trackPurchase } from '@/utils/analytics';
 *
 * trackEvent('button_click', { button_name: 'Get 30 Day Plan' });
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track custom event
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param params - Event parameters
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
    console.log('[GA4 Event]', eventName, params);
  }
}

/**
 * Track page view
 * @param pagePath - Path of the page (e.g., '/30dagaplan')
 * @param pageTitle - Title of the page
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
    console.log('[GA4 Page View]', pagePath, pageTitle);
  }
}

/**
 * Track when user views a product
 * @param productName - Name of product
 * @param value - Price in ISK
 */
export function trackViewProduct(productName: string, value: number) {
  trackEvent('view_item', {
    currency: 'ISK',
    value: value,
    items: [{
      item_name: productName,
      price: value,
    }],
  });
}

/**
 * Track when user begins checkout (fills out questionnaire)
 * @param productName - Name of product
 * @param value - Price in ISK
 */
export function trackBeginCheckout(productName: string, value: number) {
  trackEvent('begin_checkout', {
    currency: 'ISK',
    value: value,
    items: [{
      item_name: productName,
      price: value,
    }],
  });
}

/**
 * Track when user adds payment info (on payment page)
 * @param productName - Name of product
 * @param value - Price in ISK
 */
export function trackAddPaymentInfo(productName: string, value: number) {
  trackEvent('add_payment_info', {
    currency: 'ISK',
    value: value,
    items: [{
      item_name: productName,
      price: value,
    }],
  });
}

/**
 * Track successful purchase (conversion!)
 * @param orderId - Unique order ID
 * @param value - Purchase amount in ISK
 * @param productName - Name of product
 */
export function trackPurchase(orderId: string, value: number, productName: string) {
  trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'ISK',
    value: value,
    items: [{
      item_id: orderId,
      item_name: productName,
      price: value,
      quantity: 1,
    }],
  });

  console.log('[GA4 Purchase] 🎉', {
    orderId,
    value,
    productName,
  });
}

/**
 * Track lead generation (quote request, free analysis)
 * @param leadType - Type of lead ('quote_request', 'free_analysis')
 * @param value - Estimated value
 */
export function trackLead(leadType: string, value?: number) {
  trackEvent('generate_lead', {
    lead_type: leadType,
    value: value,
    currency: 'ISK',
  });
}

/**
 * Track CTA button clicks
 * @param buttonName - Name/label of button
 * @param location - Where on page (e.g., 'hero', 'pricing_section')
 */
export function trackCTAClick(buttonName: string, location?: string) {
  trackEvent('cta_click', {
    button_name: buttonName,
    location: location,
  });
}

/**
 * Track form submissions
 * @param formName - Name of form
 * @param formType - Type (questionnaire, quote, contact)
 */
export function trackFormSubmit(formName: string, formType: string) {
  trackEvent('form_submit', {
    form_name: formName,
    form_type: formType,
  });
}

/**
 * Track outbound link clicks
 * @param url - Destination URL
 * @param linkText - Link text/label
 */
export function trackOutboundClick(url: string, linkText?: string) {
  trackEvent('click', {
    link_url: url,
    link_text: linkText,
    outbound: true,
  });
}
