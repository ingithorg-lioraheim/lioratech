import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface AuditRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  adAccountId?: string;
  fbc?: string;
  fbp?: string;
  eventSourceUrl?: string;
  clientUserAgent?: string;
}

async function hashData(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sendCapiLeadEvent(data: AuditRequest, clientIp: string): Promise<void> {
  const PIXEL_ID = '1184093067198932';
  const ACCESS_TOKEN = process.env.FACEBOOK_CAPI_TOKEN || 'EAAXE1MYSkPwBRPe51iNJg8JrGJcGaESzqi6o7CZCATlnYcahyCz05iNTnZCRu9JPYcv17Iu0pMVyJqoG1mJ8ZA797TgFtUPfjj0gL5vYPZBePKIz20rTwDZA7YtaVscHEO8TNdQeB82MXg0rrms4QluTSrRMHxulpS7vCZBwZCul4NVLywIZAbOZANV4QKMdtvVweXwZDZD';
  if (!ACCESS_TOKEN) {
    console.log('CAPI: No token, skipping');
    return;
  }

  try {
    const hashedEmail = await hashData(data.email);
    const hashedName = await hashData(data.name.split(' ')[0]);

    const eventData: any = {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: data.eventSourceUrl || 'https://lioratech.is/audit',
      action_source: 'website',
      event_id: `lead_${Date.now()}`,
      user_data: {
        em: [hashedEmail],
        fn: [hashedName],
        client_ip_address: clientIp,
        client_user_agent: data.clientUserAgent || '',
      },
      custom_data: {
        content_name: 'Liora Audit',
        content_category: 'Meta Ads Audit',
      },
    };

    if (data.fbc) eventData.user_data.fbc = data.fbc;
    if (data.fbp) eventData.user_data.fbp = data.fbp;
    if (data.phone) eventData.user_data.ph = [await hashData(data.phone)];

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [eventData] }),
      }
    );
    const result = await res.json();
    console.log('CAPI Lead event sent:', JSON.stringify(result));
  } catch (err) {
    console.error('CAPI Lead event failed:', err);
  }
}

async function requestMetaAnalystAccess(adAccountId: string): Promise<boolean> {
  const cleanId = adAccountId.startsWith('act_') ? adAccountId : `act_${adAccountId}`;
  const BUSINESS_ID = '208274234254109';
  const ACCESS_TOKEN = process.env.META_SYSTEM_USER_TOKEN;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${BUSINESS_ID}/client_ad_accounts`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adaccount_id: cleanId,
          permitted_tasks: ['ANALYZE'],
          access_token: ACCESS_TOKEN,
        }),
      }
    );
    const data = await res.json();
    console.log('Meta access request result:', JSON.stringify(data));
    return data.success === true;
  } catch (err) {
    console.error('Meta access request failed:', err);
    return false;
  }
}

async function sendEmails(data: AuditRequest, metaAccessRequested: boolean = false) {
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

  // A) Tilkynning á Ingi — HTML
  const actionBlock = data.adAccountId
    ? `<div class="action">
  <strong>⚡ Meta access beiðni send sjálfkrafa!</strong><br>
  Staða: ${metaAccessRequested ? '✅ Tókst — beðið eftir samþykki viðskiptavinar' : '⚠️ Mistókst — þarf handvirkt'}<br><br>
  Reikningur: <strong>${data.adAccountId}</strong><br>
  Ef þarf handvirkt: <a href="https://business.facebook.com/settings/ad-accounts">Meta Business Suite</a> → Assign → ingi@lioratech.is → Analyst → Confirm
</div>`
    : '';

  const notifyHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }
  .card { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
  h2 { color: #1e3a8a; margin: 0 0 16px; font-size: 18px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
  td:first-child { color: #64748b; width: 130px; }
  td:last-child { color: #1e293b; font-weight: 500; }
  .action { background: #eff6ff; border-radius: 8px; padding: 12px 16px; margin-top: 16px; font-size: 13px; color: #1e3a8a; }
</style></head>
<body>
<div class="card">
  <h2>🔔 Nýtt Liora Audit lead</h2>
  <table>
    <tr><td>Nafn</td><td>${data.name}</td></tr>
    <tr><td>Netfang</td><td>${data.email}</td></tr>
    <tr><td>Fyrirtæki</td><td>${data.company}</td></tr>
    <tr><td>Sími</td><td>${data.phone || 'N/A'}</td></tr>
    <tr><td>Ad Account ID</td><td>${data.adAccountId || 'N/A'}</td></tr>
    <tr><td>Tími</td><td>${timestamp}</td></tr>
  </table>
  ${actionBlock}
</div>
</body>
</html>`;

  const notifyText = `🔔 Nýtt Liora Audit lead!\n\nNafn: ${data.name}\nNetfang: ${data.email}\nFyrirtæki: ${data.company}\nSími: ${data.phone || 'N/A'}\nAd Account ID: ${data.adAccountId || 'N/A'}\nTími: ${timestamp}${data.adAccountId ? `\n\nMeta access beiðni send sjálfkrafa: ${metaAccessRequested ? '✅ Tókst' : '⚠️ Mistókst — þarf handvirkt'}` : ''}`;

  try {
    await transporter.sendMail({
      from: `"LioraTech" <${process.env.SMTP_USER}>`,
      to: 'ingi@lioratech.is',
      subject: `🔔 Nýtt Liora Audit lead: ${data.company}`,
      html: notifyHtml,
      text: notifyText,
    });
    console.log('Notification email sent to ingi@lioratech.is');
  } catch (err) {
    console.error('Failed to send notification email:', err);
  }

  // B) Auto-reply á viðskiptavin — HTML
  // If we successfully requested access, show "approve the request" instructions
  // If adAccountId given but request failed, show manual 5-step instructions
  // If no adAccountId, show manual instructions without account ID
  const accessSection = data.adAccountId && metaAccessRequested
    ? `<div class="highlight-box">
  <h2>🔑 Næsta skref — samþykkja aðgangsleyfi</h2>
  <p style="font-size:14px;color:#374151;margin:0 0 12px;">Við höfum þegar sent beiðni um lesaðgang (Analyst) að auglýsingareikningnum þínum. Þú ættir að fá tilkynningu frá Meta — allt sem þú þarft að gera er:</p>
  <ol class="steps">
    <li><span class="step-num">1</span><span class="step-text">Opnaðu <a href="https://business.facebook.com/settings/ad-accounts" style="color:#2563eb;">Meta Business Suite → Stillingar → Auglýsingareikningar</a></span></li>
    <li><span class="step-num">2</span><span class="step-text">Smelltu á auglýsingareikninginn þinn: <strong>${data.adAccountId}</strong></span></li>
    <li><span class="step-num">3</span><span class="step-text">Þú sérð beiðni frá <strong>LioraTech</strong> — smelltu <strong>"Samþykkja"</strong></span></li>
  </ol>
</div>
<div class="ad-account-note">
  ✅ <strong>Analyst aðgangur</strong> er <em>lesaðgangur eingöngu</em> — við getum aðeins skoðað gögn, ekki breytt neinu í reikningnum þínum.
</div>`
    : data.adAccountId
    ? `<div class="highlight-box">
  <h2>🔑 Hvernig við fáum aðgang — 2 mínútur</h2>
  <ol class="steps">
    <li><span class="step-num">1</span><span class="step-text">Opnaðu <a href="https://business.facebook.com/settings/ad-accounts" style="color:#2563eb;">Meta Business Suite → Stillingar → Auglýsingareikningar</a></span></li>
    <li><span class="step-num">2</span><span class="step-text">Smelltu á auglýsingareikninginn þinn: <strong>${data.adAccountId}</strong></span></li>
    <li><span class="step-num">3</span><span class="step-text">Veldu <strong>"Assign People"</strong> eða <strong>"Add People"</strong></span></li>
    <li><span class="step-num">4</span><span class="step-text">Sláðu inn: <strong>ingi@lioratech.is</strong> og veldu hlutverkið <strong>"Analyst"</strong></span></li>
    <li><span class="step-num">5</span><span class="step-text">Smelltu <strong>"Confirm"</strong> — við fáum tilkynningu og byrjum strax 🚀</span></li>
  </ol>
</div>
<div class="ad-account-note">
  ✅ <strong>Analyst aðgangur</strong> er <em>lesaðgangur eingöngu</em> — við getum aðeins skoðað gögn, ekki breytt neinu í reikningnum þínum.
</div>`
    : `<div class="highlight-box">
  <h2>🔑 Næsta skref — veita okkur lesaðgang</h2>
  <p style="font-size:14px;color:#374151;margin:0 0 12px;">Til að geta hafið greiningu þurfum við lesaðgang (Analyst) að Meta auglýsingareikningnum þínum. Hér er hvernig:</p>
  <ol class="steps">
    <li><span class="step-num">1</span><span class="step-text">Opnaðu <a href="https://business.facebook.com/settings/ad-accounts" style="color:#2563eb;">Meta Business Suite → Stillingar → Auglýsingareikningar</a></span></li>
    <li><span class="step-num">2</span><span class="step-text">Smelltu á auglýsingareikninginn þinn</span></li>
    <li><span class="step-num">3</span><span class="step-text">Veldu <strong>"Assign People"</strong> eða <strong>"Add People"</strong></span></li>
    <li><span class="step-num">4</span><span class="step-text">Sláðu inn: <strong>ingi@lioratech.is</strong> og veldu hlutverkið <strong>"Analyst"</strong></span></li>
    <li><span class="step-num">5</span><span class="step-text">Smelltu <strong>"Confirm"</strong> — við fáum tilkynningu og byrjum strax 🚀</span></li>
  </ol>
</div>
<div class="ad-account-note">
  ✅ <strong>Analyst aðgangur</strong> er <em>lesaðgangur eingöngu</em> — við getum aðeins skoðað gögn, ekki breytt neinu í reikningnum þínum.
</div>`;

  const autoReplyHtml = `<!DOCTYPE html>
<html lang="is">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
  .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 40px 32px; text-align: center; }
  .header-icon { font-size: 48px; margin-bottom: 12px; }
  .header h1 { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 8px; }
  .header p { color: rgba(255,255,255,0.85); font-size: 15px; margin: 0; }
  .body { padding: 40px; }
  .greeting { font-size: 16px; color: #1e293b; margin-bottom: 20px; }
  .highlight-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
  .highlight-box h2 { font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; }
  .steps { list-style: none; padding: 0; margin: 0; }
  .steps li { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #dbeafe; }
  .steps li:last-child { border-bottom: none; padding-bottom: 0; }
  .step-num { background: #1e3a8a; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .step-text { font-size: 14px; color: #374151; line-height: 1.5; }
  .step-text strong { color: #1e3a8a; }
  .ad-account-note { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin: 20px 0; font-size: 14px; color: #166534; }
  .timeline { background: #fafafa; border-radius: 10px; padding: 16px 20px; margin: 24px 0; font-size: 14px; color: #475569; }
  .timeline strong { color: #1e293b; }
  .contact { margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; }
  .contact a { color: #2563eb; text-decoration: none; }
  .footer { padding: 24px 40px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; }
  .footer p { font-size: 12px; color: #94a3b8; margin: 0; }
  .brand { font-size: 18px; font-weight: 700; color: #1e3a8a; }
  .brand span { color: #3b82f6; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div class="header-icon">📊</div>
      <h1>Beiðni móttekin!</h1>
      <p>Við byrjum greiningu á auglýsingareikningnum þínum</p>
    </div>
    <div class="body">
      <p class="greeting">Hæ <strong>${data.name}</strong>,</p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin-bottom:20px;">
        Takk fyrir áhugann á <strong>Liora Audit</strong>! Við höfum móttekið beiðni þína og við byrjum greininguna eins fljótt og við fáum aðgang að auglýsingareikningnum þínum.
      </p>

      ${accessSection}

      <div class="timeline">
        <strong>⏱️ Tímalína:</strong> Við munum hafa samband við þig og senda þér fullgerða greiningu <strong>innan 24 klukkustunda</strong> frá því við fáum aðgang.
      </div>

      <div class="contact">
        <p>Einhverjar spurningar? Hafðu samband:</p>
        <p style="margin-top:8px;"><strong>Ingi Þór</strong> — LioraTech<br>
        📧 <a href="mailto:ingi@lioratech.is">ingi@lioratech.is</a> &nbsp;|&nbsp; 📞 <a href="tel:+3546960156">696-0156</a></p>
      </div>
    </div>
    <div class="footer">
      <p class="brand">Liora<span>Tech</span></p>
      <p style="margin-top:4px;">AI ráðgjöf og innleiðing fyrir íslensk fyrirtæki</p>
    </div>
  </div>
</div>
</body>
</html>`;

  const autoReplyText = `Hæ ${data.name},

Takk fyrir áhugann á Liora Audit!

Við höfum móttekið beiðni þína og byrjum greiningu á auglýsingareikningnum þínum eins fljótt og við fáum aðgang.

${data.adAccountId && metaAccessRequested
  ? `Næsta skref — samþykkja aðgangsleyfi:\nVið höfum þegar sent beiðni um lesaðgang (Analyst). Þú ættir að fá tilkynningu frá Meta:\n1. Opnaðu https://business.facebook.com/settings/ad-accounts\n2. Smelltu á auglýsingareikninginn þinn: ${data.adAccountId}\n3. Þú sérð beiðni frá LioraTech — smelltu "Samþykkja"\n\nAnalyst aðgangur er lesaðgangur eingöngu — við getum aðeins skoðað gögn, ekki breytt neinu.`
  : data.adAccountId
  ? `Hvernig við fáum aðgang (2 mínútur):\n1. Opnaðu https://business.facebook.com/settings/ad-accounts\n2. Smelltu á auglýsingareikninginn þinn: ${data.adAccountId}\n3. Veldu "Assign People" eða "Add People"\n4. Sláðu inn: ingi@lioratech.is og veldu hlutverkið "Analyst"\n5. Smelltu "Confirm" — við fáum tilkynningu og byrjum strax!\n\nAnalyst aðgangur er lesaðgangur eingöngu — við getum aðeins skoðað gögn, ekki breytt neinu.`
  : `Til að geta hafið greiningu þurfum við lesaðgang (Analyst) að Meta auglýsingareikningnum þínum:\n1. Opnaðu https://business.facebook.com/settings/ad-accounts\n2. Smelltu á auglýsingareikninginn þinn\n3. Veldu "Assign People" eða "Add People"\n4. Sláðu inn: ingi@lioratech.is og veldu hlutverkið "Analyst"\n5. Smelltu "Confirm"\n\nAnalyst aðgangur er lesaðgangur eingöngu — við getum aðeins skoðað gögn, ekki breytt neinu.`
}

Tímalína: Við munum hafa samband við þig og senda þér fullgerða greiningu innan 24 klukkustunda frá því við fáum aðgang.

Einhverjar spurningar? Hafðu samband:
Ingi Þór — LioraTech
ingi@lioratech.is | 696-0156`;

  try {
    await transporter.sendMail({
      from: `"Ingi Þór — LioraTech" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: '✅ Beiðni móttekin — við byrjum greiningu',
      html: autoReplyHtml,
      text: autoReplyText,
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

    // Request Meta Analyst access if adAccountId provided
    let metaAccessRequested = false;
    if (data.adAccountId) {
      metaAccessRequested = await requestMetaAnalystAccess(data.adAccountId);
      console.log('Meta analyst access requested:', metaAccessRequested);
    }

    // Send CAPI Lead event to Meta (server-side tracking)
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0].trim() || 
                     event.headers['client-ip'] || '';
    await sendCapiLeadEvent(data, clientIp);

    // Send email notifications (errors are caught internally)
    await sendEmails(data, metaAccessRequested);

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
          meta_access_status: data.adAccountId ? 'requested' : 'none',
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
