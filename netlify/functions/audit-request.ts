import type { Handler } from '@netlify/functions';

interface AuditRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  adAccountId?: string;
}

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const data: AuditRequest = JSON.parse(event.body || '{}');

    if (!data.name || !data.email || !data.company) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nafn, netfang og fyrirtæki eru nauðsynleg' }),
      };
    }

    console.log('New Liora Audit request:', {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone || 'N/A',
      adAccountId: data.adAccountId || 'N/A',
      timestamp: new Date().toISOString(),
    });

    // Send Meta Analyst access request if ad account ID provided
    if (data.adAccountId) {
      const metaToken = process.env.META_SYSTEM_USER_TOKEN;
      const businessId = '208274254254109';
      const adAccountId = data.adAccountId.startsWith('act_') ? data.adAccountId : `act_${data.adAccountId}`;

      try {
        const metaRes = await fetch(
          `https://graph.facebook.com/v21.0/${adAccountId}/agencies`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              business: businessId,
              permitted_tasks: ['ANALYZE'],
              access_token: metaToken,
            }),
          }
        );
        const metaData = await metaRes.json();
        console.log('Meta API response:', metaData);
      } catch (metaError) {
        console.error('Meta API error:', metaError);
        // Don't fail the form submission if Meta API fails
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Beiðni móttekin' }),
    };
  } catch (error) {
    console.error('Audit request error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Villa kom upp' }),
    };
  }
};

export { handler };
