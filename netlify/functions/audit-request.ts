import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface AuditRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  adAccountId?: string;
}

async function sendEmails(data: AuditRequest) {
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
  const adAccountNote = data.adAccountId
    ? `\n📋 NÆSTA SKREF: Sendu Analyst access beiðni á þennan reikning:\n   1. Opnaðu https://business.facebook.com/settings/ad-accounts\n   2. Smelltu "Add" → "Request access to an ad account"\n   3. Sláðu inn Ad Account ID: ${data.adAccountId}\n   4. Veldu "Analyst" aðgang\n   5. Smelltu "Request Access"\n`
    : '';

  const notifyBody = `
🔔 Nýtt Liora Audit lead!

Nafn: ${data.name}
Netfang: ${data.email}
Fyrirtæki: ${data.company}
Sími: ${data.phone || 'N/A'}
Ad Account ID: ${data.adAccountId || 'N/A'}
Tími: ${timestamp}
${adAccountNote}
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
    ? `Við sendum þér beiðni um lesaðgang (Analyst) á auglýsingareikninginn þinn á næstu mínútum. Þú færð tilkynningu í Meta Business Suite — smelltu bara "Samþykkja" til að veita okkur aðgang.`
    : `Til að geta hafið greininguna þurfum við lesaðgang (Analyst) að auglýsingareikningnum þínum. Við munum hafa samband og leiðbeina þér í gegnum það.`;

  const autoReplyBody = `
Hæ ${data.name},

Takk fyrir áhugann á Liora Audit!

Við höfum móttekið beiðni þína og byrjum greiningu á auglýsingareikningnum þínum eins fljótt og auðið er.

${adAccountSection}

Ef þú lendir í vandræðum eða finnur ekki tilkynninguna, sendu okkur línu á ingi@lioratech.is eða hringdu í 696-0156 og við aðstoðum þig.

Þú færð niðurstöður innan sólarhrings, eftir að við erum komin með aðgang í auglýsingareikninginn.

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

    // Send email notifications (errors are caught internally)
    await sendEmails(data);

    // Write lead to Supabase
    try {
      const supabaseUrl = process.env.SUPABASE_URL || 'https://mikkzhvjkxhnjwuubeti.supabase.co';
      const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pa2t6aHZqa3hobmp3dXViZXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTQyMDYsImV4cCI6MjA4NzY5MDIwNn0.M9rOK5MEnU8yg0cPCRyTI71P2bIrdaSluplj7G2B-zQ';

      const leadRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone || null,
          ad_account_id: data.adAccountId || null,
          status: 'new',
          meta_access_status: data.adAccountId ? 'pending' : 'none',
          notes: '',
        }),
      });
      const leadData = await leadRes.json();
      console.log('Lead saved to Supabase:', leadData);
    } catch (leadError) {
      console.error('Failed to save lead to Supabase:', leadError);
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
