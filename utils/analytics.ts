/**
 * Analytics Tracking Utility
 * Tracks events to both Google Analytics 4 and Facebook (Pixel + Conversions API)
 *
 * Usage:
 * import { trackEvent, trackPageView, trackPurchase } from '@/utils/analytics';
 *
 * trackEvent('button_click', { button_name: 'Get 30 Day Plan' });
 */

// Extend Window interface to include gtag and fbq
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
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
 * Generate unique event ID for deduplication between Pixel and CAPI
 */
function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Send event to Facebook Conversions API (server-side)
 * This works together with Pixel for better tracking and deduplication
 */
async function sendToFacebookCAPI(
  eventName: string,
  eventId: string,
  userData?: Record<string, any>,
  customData?: Record<string, any>
) {
  try {
    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: 'website',
      event_id: eventId,
      user_data: {
        client_ip_address: undefined, // Netlify function will use request IP
        client_user_agent: navigator.userAgent,
        fbc: getCookie('_fbc'), // Facebook click ID
        fbp: getCookie('_fbp'), // Facebook browser ID
        ...userData,
      },
      custom_data: customData,
    };

    await fetch('/.netlify/functions/facebook-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('[Facebook CAPI]', eventName, { event_id: eventId });
  } catch (error) {
    console.error('[Facebook CAPI] Error:', error);
  }
}

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
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
  if (typeof window !== 'undefined') {
    // GA4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
      console.log('[GA4 Page View]', pagePath, pageTitle);
    }

    // Facebook Pixel (PageView is tracked automatically by fbq('init'))
    // No need to track again here
  }
}

/**
 * Track when user views a product/service
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackViewItem(item: GA4Item) {
  if (typeof window !== 'undefined') {
    const eventId = generateEventId();

    // GA4
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'ISK',
        value: item.price,
        items: [item],
      });
      console.log('[GA4 View Item]', item);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: item.item_name,
        content_ids: [item.item_id],
        content_type: 'product',
        value: item.price,
        currency: 'ISK',
      }, { eventID: eventId });
      console.log('[Facebook Pixel] ViewContent', item);
    }

    // Facebook CAPI
    sendToFacebookCAPI('ViewContent', eventId, undefined, {
      content_name: item.item_name,
      content_ids: [item.item_id],
      value: item.price,
      currency: 'ISK',
    });
  }
}

/**
 * Track when user begins checkout (e.g., starts questionnaire for paid product)
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackBeginCheckout(item: GA4Item) {
  if (typeof window !== 'undefined') {
    const eventId = generateEventId();

    // GA4
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'ISK',
        value: item.price,
        items: [item],
      });
      console.log('[GA4 Begin Checkout]', item);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: item.item_name,
        content_ids: [item.item_id],
        value: item.price,
        currency: 'ISK',
      }, { eventID: eventId });
      console.log('[Facebook Pixel] InitiateCheckout', item);
    }

    // Facebook CAPI
    sendToFacebookCAPI('InitiateCheckout', eventId, undefined, {
      content_name: item.item_name,
      content_ids: [item.item_id],
      value: item.price,
      currency: 'ISK',
    });
  }
}

/**
 * Track when user reaches payment page or adds payment info
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackAddPaymentInfo(item: GA4Item) {
  if (typeof window !== 'undefined') {
    const eventId = generateEventId();

    // GA4
    if (window.gtag) {
      window.gtag('event', 'add_payment_info', {
        currency: 'ISK',
        value: item.price,
        items: [item],
      });
      console.log('[GA4 Add Payment Info]', item);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'AddPaymentInfo', {
        content_name: item.item_name,
        content_ids: [item.item_id],
        value: item.price,
        currency: 'ISK',
      }, { eventID: eventId });
      console.log('[Facebook Pixel] AddPaymentInfo', item);
    }

    // Facebook CAPI
    sendToFacebookCAPI('AddPaymentInfo', eventId, undefined, {
      content_name: item.item_name,
      content_ids: [item.item_id],
      value: item.price,
      currency: 'ISK',
    });
  }
}

/**
 * Track successful purchase (conversion!)
 * @param orderId - Unique transaction/order ID
 * @param item - GA4 Item with id, name, price, and optional quantity
 */
export function trackPurchase(orderId: string, item: GA4Item) {
  if (typeof window !== 'undefined') {
    const eventId = generateEventId();

    // GA4
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        currency: 'ISK',
        value: item.price,
        items: [{
          ...item,
          quantity: item.quantity || 1,
        }],
      });
      console.log('[GA4 Purchase] 🎉', { orderId, item });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_name: item.item_name,
        content_ids: [item.item_id],
        value: item.price,
        currency: 'ISK',
      }, { eventID: eventId });
      console.log('[Facebook Pixel] Purchase 🎉', { orderId, item });
    }

    // Facebook CAPI
    sendToFacebookCAPI('Purchase', eventId, undefined, {
      content_name: item.item_name,
      content_ids: [item.item_id],
      value: item.price,
      currency: 'ISK',
    });
  }
}

/**
 * Track lead generation (quote request, free analysis)
 * @param leadType - Type of lead ('quote_request', 'free_analysis')
 * @param value - Estimated value
 */
export function trackLead(leadType: string, value?: number, email?: string) {
  if (typeof window !== 'undefined') {
    const eventId = generateEventId();

    // GA4
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        lead_type: leadType,
        value: value,
        currency: 'ISK',
      });
      console.log('[GA4 Lead]', leadType);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: leadType,
        value: value || 0,
        currency: 'ISK',
      }, { eventID: eventId });
      console.log('[Facebook Pixel] Lead', leadType);
    }

    // Facebook CAPI (with email if available)
    const userData = email ? { em: [email.toLowerCase().trim()] } : undefined;
    sendToFacebookCAPI('Lead', eventId, userData, {
      content_name: leadType,
      value: value || 0,
      currency: 'ISK',
    });
  }
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
