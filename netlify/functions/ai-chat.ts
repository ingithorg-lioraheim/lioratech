import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  question: string;
  conversationHistory?: ChatMessage[];
}

const SYSTEM_INSTRUCTION = `Þú ert AI ráðgjafi hjá LioraTech. Svaraðu ALLTAF á íslensku, stutt og skýrt.

UM LIORATECH:
- Hjálpum fyrirtækjum að nýta AI í rekstri
- Byrjum með fría greiningu sem sýnir 3-5 tækifæri
- 30 daga plan kostar 69.900 kr

MIKILVÆGT:
- Haltu svörum STUTTUM (2-4 setningar)
- ALDREI nota ** eða önnur format merki í textanum
- Svaraðu beint spurningunni
- Ekki selja aggressive
- Láttu fólk vita að við byrjum með fría greiningu

ALGENG SVÖR:
- Tími: AI sparar 5-15 klst/viku
- Verð: Frí greining fyrst, síðan 69.900 kr fyrir 30 daga plan
- Ferlið: Frí greining → 30 daga plan → Innleiðing (ef þú vilt)

Svaraðu ALLTAF á einfaldan og skýran hátt. Engin bullet points, engar stjörnur, bara venjulegur texti.`;

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { question, conversationHistory = [] }: ChatRequest = JSON.parse(event.body || '{}');

    if (!question || !question.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Question is required' })
      };
    }

    // Get OpenAI API key from environment
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      console.error('OpenAI API key not configured');
      return {
        statusCode: 200,
        body: JSON.stringify({
          answer: "AI aðstoðin er ekki tiltæk í augnablikinu. Vinsamlegast hafðu samband við okkur beint á ingi@lioratech.is eða bókaðu fund."
        })
      };
    }

    // Build messages array for OpenAI
    const messages = [
      {
        role: 'system',
        content: SYSTEM_INSTRUCTION
      }
    ];

    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current question
    messages.push({
      role: 'user',
      content: question
    });

    // Call OpenAI API
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Afsakið, ég náði ekki að svara þessu í augnablikinu.";

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer })
    };

  } catch (error) {
    console.error("Error in AI chat function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        answer: "Villa kom upp við að tengjast gervigreindinni. Vinsamlegast reyndu aftur síðar eða hafðu samband við ingi@lioratech.is"
      })
    };
  }
};

export { handler };
