import type { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

interface AuditInput {
  name: string;
  company: string;
  size: string;
  industry: string;
  timeWasters: string;
  tools: string;
  orderMethod: string;
  manualWork: string;
  biggestProblem: string;
  sixMonthGoal: string;
  email: string;
}

interface AuditReport {
  company: string;
  generatedAt: string;
  opportunities: string[];
  timeLoss: string;
  moneyLoss: string;
  automationOpportunities: string[];
  quickWins: string[];
  nextSteps: {
    diy: string[];
    withLioratech: string[];
  };
}

async function generateAuditReport(input: AuditInput): Promise<AuditReport> {
  const apiKey =
    process.env.ANTHROPIC_API_KEY ||
    '';

  const client = new Anthropic({ apiKey });

  const prompt = `Þú ert AI ráðgjafi hjá LioraTech á Íslandi. 
Þú hefur fengið svör frá fyrirtæki við greiningarspurningar.
Greindu svörin og skilaðu structured JSON report.

Fyrirtæki: ${input.company}
Stærð: ${input.size}
Atvinnugrein: ${input.industry}
Tímatap: ${input.timeWasters}
Kerfi í notkun: ${input.tools}
Pöntunarfyrirkomulag: ${input.orderMethod}
Handvirk vinna: ${input.manualWork}
Stærsta vandamál: ${input.biggestProblem}
Markmið eftir 6 mánuði: ${input.sixMonthGoal}

Skilaðu JSON með þessum fields:
- opportunities: array af 3 strings (stærstu tækifæri, bein og hagnýt)
- timeLoss: string (áhrifamat á tímatap, t.d. "8–12 klst/viku")
- moneyLoss: string (áhrifamat í kr, t.d. "300.000–500.000 kr/ár")
- automationOpportunities: array af 3–5 strings (ferlar sem hægt er að sjálfvirknivæða)
- quickWins: array af 2–3 strings (hvað hægt er að gera strax)
- nextSteps.diy: array af 2–3 strings
- nextSteps.withLioratech: array af 2–3 strings

Íslenska. Bein. Hagnýt. Engin fluff.`;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const rawText = message.content[0].type === 'text' ? message.content[0].text : '';

  // Extract JSON from response (may be wrapped in ```json blocks)
  const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/) || rawText.match(/({[\s\S]*})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : rawText;

  const parsed = JSON.parse(jsonStr.trim());

  return {
    company: input.company,
    generatedAt: new Date().toISOString(),
    opportunities: parsed.opportunities || [],
    timeLoss: parsed.timeLoss || '',
    moneyLoss: parsed.moneyLoss || '',
    automationOpportunities: parsed.automationOpportunities || [],
    quickWins: parsed.quickWins || [],
    nextSteps: {
      diy: parsed.nextSteps?.diy || parsed['nextSteps.diy'] || [],
      withLioratech: parsed.nextSteps?.withLioratech || parsed['nextSteps.withLioratech'] || [],
    },
  };
}

async function saveReportToHQ(
  report: AuditReport,
  input: AuditInput
): Promise<void> {
  const hqPath = path.join(
    '/Users/ingithor/Projects/lioraheim-hq/data',
    'audit-reports.json'
  );

  let existing: any[] = [];
  try {
    const raw = fs.readFileSync(hqPath, 'utf-8');
    existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  const entry = {
    id: randomUUID(),
    company: input.company,
    email: input.email,
    submittedAt: new Date().toISOString(),
    status: 'pending_review',
    report,
    rawInput: input,
  };

  existing.push(entry);
  fs.writeFileSync(hqPath, JSON.stringify(existing, null, 2), 'utf-8');
  console.log(`Report saved to HQ: ${entry.id}`);
}

async function sendEmailNotification(
  input: AuditInput,
  report: AuditReport
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const timestamp = new Date().toLocaleString('is-IS', {
    timeZone: 'Atlantic/Reykjavik',
  });

  const opportunitiesList = report.opportunities
    .map((o, i) => `<li>${i + 1}. ${o}</li>`)
    .join('');
  const quickWinsList = report.quickWins
    .map((w) => `<li>✅ ${w}</li>`)
    .join('');
  const automationList = report.automationOpportunities
    .map((a) => `<li>🤖 ${a}</li>`)
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }
  .card { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
  h2 { color: #1e3a8a; margin: 0 0 16px; }
  h3 { color: #1e3a8a; margin: 20px 0 8px; font-size: 15px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  td { padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
  td:first-child { color: #64748b; width: 140px; }
  td:last-child { color: #1e293b; font-weight: 500; }
  ul { margin: 4px 0 0 16px; padding: 0; font-size: 14px; color: #374151; line-height: 1.6; }
  .badge { display: inline-block; background: #eff6ff; color: #1e3a8a; border-radius: 6px; padding: 4px 10px; font-size: 13px; font-weight: 600; }
</style></head>
<body>
<div class="card">
  <h2>📊 Nýtt AI Audit Report — ${input.company}</h2>
  <table>
    <tr><td>Nafn</td><td>${input.name}</td></tr>
    <tr><td>Netfang</td><td>${input.email}</td></tr>
    <tr><td>Fyrirtæki</td><td>${input.company}</td></tr>
    <tr><td>Stærð</td><td>${input.size} starfsmenn</td></tr>
    <tr><td>Atvinnugrein</td><td>${input.industry}</td></tr>
    <tr><td>Tímatap</td><td><span class="badge">${report.timeLoss}</span></td></tr>
    <tr><td>Peningatap</td><td><span class="badge">${report.moneyLoss}</span></td></tr>
    <tr><td>Tími</td><td>${timestamp}</td></tr>
  </table>

  <h3>🎯 3 stærstu tækifærin</h3>
  <ul>${opportunitiesList}</ul>

  <h3>⚡ Quick Wins (0–30 dagar)</h3>
  <ul>${quickWinsList}</ul>

  <h3>🤖 Sjálfvirknivæðingarferlar</h3>
  <ul>${automationList}</ul>

  <h3>📋 Næstu skref — með LioraTech</h3>
  <ul>${report.nextSteps.withLioratech.map((s) => `<li>${s}</li>`).join('')}</ul>
</div>
</body>
</html>`;

  const text = `📊 Nýtt AI Audit Report — ${input.company}

Nafn: ${input.name}
Netfang: ${input.email}
Stærð: ${input.size}
Atvinnugrein: ${input.industry}
Tímatap: ${report.timeLoss}
Peningatap: ${report.moneyLoss}

Tækifæri:
${report.opportunities.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Quick Wins:
${report.quickWins.map((w) => `- ${w}`).join('\n')}

Sjálfvirknivæðingarferlar:
${report.automationOpportunities.map((a) => `- ${a}`).join('\n')}

Næstu skref með LioraTech:
${report.nextSteps.withLioratech.map((s) => `- ${s}`).join('\n')}`;

  await transporter.sendMail({
    from: `"LioraTech AI Audit" <${process.env.SMTP_USER}>`,
    to: 'ingi@lioratech.is',
    subject: `📊 Nýtt AI Audit: ${input.company} — ${report.timeLoss} tímatap`,
    html,
    text,
  });

  console.log('Email notification sent to ingi@lioratech.is');
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
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const input: AuditInput = JSON.parse(event.body || '{}');

    // Validate required fields
    const required = [
      'name', 'company', 'size', 'industry', 'timeWasters',
      'tools', 'orderMethod', 'manualWork', 'biggestProblem',
      'sixMonthGoal', 'email',
    ] as const;

    for (const field of required) {
      if (!input[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Svæðið "${field}" vantar` }),
        };
      }
    }

    console.log('AI Audit request received:', {
      company: input.company,
      email: input.email,
      timestamp: new Date().toISOString(),
    });

    // 1. Call Claude API to generate report
    const report = await generateAuditReport(input);

    // 2. Save to HQ (best effort — don't fail if file write fails in prod)
    try {
      await saveReportToHQ(report, input);
    } catch (hqErr) {
      console.error('HQ save failed (non-fatal):', hqErr);
    }

    // 3. Send email to Ingi (best effort)
    try {
      await sendEmailNotification(input, report);
    } catch (emailErr) {
      console.error('Email failed (non-fatal):', emailErr);
    }

    // 4. Return report to frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, report }),
    };
  } catch (error) {
    console.error('AI Audit error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Villa kom upp við greiningu. Reyndu aftur.' }),
    };
  }
};

export { handler };
