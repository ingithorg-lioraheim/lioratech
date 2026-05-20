import type { Handler } from '@netlify/functions';

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

const N8N_WEBHOOK_URL = 'https://lioratech.app.n8n.cloud/webhook/roadmap-request';

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

    console.log('AI Greining request received:', {
      company: input.company,
      email: input.email,
      timestamp: new Date().toISOString(),
    });

    // Forward to n8n webhook — n8n handles Drive save + email notification
    // Use all original field names so n8n can access everything
    const n8nPayload = {
      // Original form fields (all of them)
      name: input.name,
      email: input.email,
      company: input.company,
      size: input.size,
      industry: input.industry,
      timeWasters: input.timeWasters,
      tools: input.tools,
      orderMethod: input.orderMethod,
      manualWork: input.manualWork,
      biggestProblem: input.biggestProblem,
      sixMonthGoal: input.sixMonthGoal,

      // Also map to n8n expected field names (for compatibility)
      companyName: input.company,
      employees: input.size,
      currentChallenges: [input.timeWasters, input.manualWork, input.biggestProblem].join('\n\n'),
      currentTools: input.tools,
      goals: input.sixMonthGoal,
      website: '',
      timeline: '',
    };

    try {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(n8nPayload),
      });

      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text();
        console.error('n8n webhook failed:', errorText);
        // Don't fail the user — log and continue
      } else {
        console.log('n8n webhook triggered successfully');
      }
    } catch (n8nErr) {
      console.error('n8n webhook error (non-fatal):', n8nErr);
      // Don't fail the user
    }

    // Always return success — n8n will handle email + Drive
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Beiðni móttekin. Þú færð tölvupóst fljótlega.',
      }),
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
