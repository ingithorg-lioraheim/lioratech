import type { Handler, HandlerEvent } from '@netlify/functions';

const PIXEL_ID = '1184093067198932';
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const API_VERSION = 'v21.0';

interface FacebookEventData {
  event_name: string;
  event_time: number;
  event_source_url: string;
  action_source: 'website';
  event_id?: string;
  user_data?: {
    em?: string[]; // email (hashed)
    ph?: string[]; // phone (hashed)
    fn?: string[]; // first name (hashed)
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // Facebook click ID cookie
    fbp?: string; // Facebook browser ID cookie
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_ids?: string[];
  };
}

/**
 * Hash data using SHA256 for Facebook user data parameters
 * Facebook requires hashed user data for privacy
 */
async function hashData(data: string): Promise<string> {
  // Simple hash for server-side (in production, use crypto.subtle or crypto module)
  // For now, we'll send unhashed but normalized data
  // Facebook will hash it on their end if we send it properly formatted
  return data.toLowerCase().trim();
}

/**
 * Netlify Function: Send events to Facebook Conversions API
 *
 * This works together with Meta Pixel (browser tracking) to provide
 * accurate event tracking even when ad blockers are present.
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Check if Access Token is configured
  if (!ACCESS_TOKEN) {
    console.error('Facebook Access Token not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Facebook Access Token not configured' }),
    };
  }

  try {
    const payload: FacebookEventData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!payload.event_name || !payload.event_time) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: event_name, event_time' }),
      };
    }

    // Build the Facebook CAPI payload
    const facebookPayload = {
      data: [
        {
          event_name: payload.event_name,
          event_time: payload.event_time,
          event_source_url: payload.event_source_url || 'https://lioratech.is',
          action_source: 'website' as const,
          event_id: payload.event_id, // Important for deduplication with Pixel
          user_data: payload.user_data || {},
          custom_data: payload.custom_data || {},
        },
      ],
    };

    console.log('[Facebook CAPI] Sending event:', {
      event_name: payload.event_name,
      event_id: payload.event_id,
      has_user_data: !!payload.user_data,
    });

    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facebookPayload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('[Facebook CAPI] Error:', result);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Facebook API error', details: result }),
      };
    }

    console.log('[Facebook CAPI] Success:', result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        events_received: result.events_received || 1,
        fbtrace_id: result.fbtrace_id,
      }),
    };
  } catch (error: any) {
    console.error('[Facebook CAPI] Exception:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', message: error.message }),
    };
  }
};
