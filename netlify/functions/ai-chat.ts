import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  question: string;
  conversationHistory?: ChatMessage[];
}

const SYSTEM_INSTRUCTION = `Þú ert sérfræðingur hjá LioraTech, ráðgjafafyrirtæki í gervigreind (AI).

**Um LioraTech:**
- Við hjálpum íslenskum fyrirtækjum að innleiða AI í daglegan rekstur
- Byrjum alltaf með fría AI-greiningu sem sýnir 3-5 tækifæri
- Bjóðum 30 daga plan fyrir 69.900 kr
- Bjóðum innleiðingar og langtímasamstarf

**Tónn og stíll:**
- Faglegur en vinalegur
- Stuttir, hnitmiðaðir setningar
- Íslenska (aldrei enska)
- Skýrir án hype eða buzzwords
- Trúverðugur - ekki oversell

**Helstu svör:**
- Tími: AI getur sparað 5-15 klst á viku með sjálfvirkni
- Kostnaður: Frí greining, 30 daga plan 69.900 kr, innleiðing frá 129.000 kr
- Ferlið: (1) Frí greining → (2) 30 daga plan → (3) Innleiðing ef þú vilt
- Fyrir hverja: Fyrirtæki með 5+ starfsmenn, endurteknar verkefni, vaxandi fyrirtæki

**Markmið:**
Hjálpa fólki að skilja hvort AI geti hjálpat þeim, og hvetja til að bóka fría greiningu.

**Mikilvægt:**
- Aldrei selja aggressive
- Svara því sem var spurt
- Ef þú veist ekki svar, segðu það
- Vísa í fría greiningu sem næsta skref`;

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

    // Get Gemini API key from environment
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      console.error('Gemini API key not configured');
      return {
        statusCode: 200,
        body: JSON.stringify({
          answer: "AI aðstoðin er ekki tiltæk í augnablikinu. Vinsamlegast hafðu samband við okkur beint á ingi@lioratech.is eða bókaðu fund."
        })
      };
    }

    // Build conversation context
    let fullPrompt = SYSTEM_INSTRUCTION + '\n\n';
    if (conversationHistory.length > 0) {
      fullPrompt += conversationHistory
        .map(msg => `${msg.role === 'user' ? 'Notandi' : 'Þú'}: ${msg.content}`)
        .join('\n') + '\n';
    }
    fullPrompt += `Notandi: ${question}`;

    // Call Gemini API using REST endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Afsakið, ég náði ekki að svara þessu í augnablikinu.";

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
