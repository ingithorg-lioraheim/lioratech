import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface AuditRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  adAccountId?: string;
}

async function sendEmails(data: AuditRequest, metaResult?: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const timestamp = new Date().toLocaleString('is-IS', { timeZone: 'Atlantic/Reykjavik' });

  // A) Tilkynning á Ingi
  const notifyBody = `
🔔 Nýtt Liora Audit lead!

Nafn: ${data.name}
Netfang: ${data.email}
Fyrirtæki: ${data.company}
Sími: ${data.phone || 'N/A'}
Ad Account ID: ${data.adAccountId || 'N/A'}
Tími: ${timestamp}

${metaResult ? `Meta API niðurstaða:\n${metaResult}` : ''}
  `.trim();

  try {
    await transporter.sendMail({
      from: `"LioraTech" <${process.env.SMTP_USER}>`,
      to: 'ingi@lioratech.is',
      subject: `🔔 Nýtt Liora Audit lead: ${data.company}`,
      text: notifyBody,
    });
    console.log('Notification email sent to ingi@lioratech.is');
  } catch (err) {
    console.error('Failed to send notification email:', err);
  }

  // B) Auto-reply á viðskiptavin
  const adAccountSection = data.adAccountId
    ? `Við höfum sent beiðni um lesaðgang (Analyst) á auglýsingareikninginn þinn. Þú ættir að fá tilkynningu í Meta Business Suite — smelltu bara "Samþykkja" til að veita okkur aðgang.`
    : `Til að geta hafið greininguna þurfum við lesaðgang (Analyst) að auglýsingareikningnum þínum. Við munum hafa samband og leiðbeina þér í gegnum það.`;

  const autoReplyBody = `
Hæ ${data.name},

Takk fyrir áhugann á Liora Audit!

Við höfum móttekið beiðni þína og byrjum greiningu á auglýsingareikningnum þínum eins fljótt og auðið er.

${adAccountSection}

Þú færð niðurstöður innan sólarhrings.

Kveðja,
Ingi Þór
LioraTech
ingi@lioratech.is | 696-0156
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Ingi Þór — LioraTech" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Takk fyrir beiðnina — LioraTech',
      text: autoReplyBody,
    });
    console.log(`Auto-reply sent to ${data.email}`);
  } catch (err) {
    console.error('Failed to send auto-reply:', err);
  }
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

    let metaResult: string | undefined;

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
        metaResult = JSON.stringify(metaData, null, 2);
      } catch (metaError) {
        console.error('Meta API error:', metaError);
        // Don't fail the form submission if Meta API fails
      }
    }

    // Send email notifications (errors are caught internally)
    await sendEmails(data, metaResult);

    // TODO: Send lead data to HQ via webhook
    // For now, log the lead data that would be sent
    console.log('Lead data for HQ:', {
      id: `lead-${Date.now()}`,
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone || '',
      adAccountId: data.adAccountId || '',
      status: 'new',
      metaAccessStatus: data.adAccountId ? 'pending' : 'none',
      createdAt: new Date().toISOString(),
      notes: '',
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
