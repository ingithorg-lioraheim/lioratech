import type { Handler } from '@netlify/functions';

interface AuditRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  hasGrantedAccess?: boolean;
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
      hasGrantedAccess: data.hasGrantedAccess || false,
      timestamp: new Date().toISOString(),
    });

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
