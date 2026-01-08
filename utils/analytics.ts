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

// GA4 Ecommerce Item interface
export interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
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
 * Track when user views a product/service
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackViewItem(item: GA4Item) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'ISK',
      value: item.price,
      items: [item],
    });
    console.log('[GA4 View Item]', item);
  }
}

/**
 * Track when user begins checkout (e.g., starts questionnaire for paid product)
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackBeginCheckout(item: GA4Item) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'ISK',
      value: item.price,
      items: [item],
    });
    console.log('[GA4 Begin Checkout]', item);
  }
}

/**
 * Track when user reaches payment page or adds payment info
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackAddPaymentInfo(item: GA4Item) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_payment_info', {
      currency: 'ISK',
      value: item.price,
      items: [item],
    });
    console.log('[GA4 Add Payment Info]', item);
  }
}

/**
 * Track successful purchase (conversion!)
 * @param orderId - Unique transaction/order ID
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackPurchase(orderId: string, item: GA4Item) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      currency: 'ISK',
      value: item.price,
      items: [{
        ...item,
        quantity: item.quantity || 1,
      }],
    });

    console.log('[GA4 Purchase] 🎉', {
      orderId,
      item,
    });
  }
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
