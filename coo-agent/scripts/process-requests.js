#!/usr/bin/env node

/**
 * COO-AGENT REQUEST PROCESSOR
 *
 * This script:
 * 1. Monitors requests/pending/ for new JSON files
 * 2. Processes each request and generates AI-greining
 * 3. Saves completed product to products/completed/
 * 4. Moves request to requests/completed/
 * 5. Updates tracking and notifies CEO
 *
 * Usage:
 *   node process-requests.js           # Process all pending requests
 *   node process-requests.js --watch   # Continuous monitoring mode
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { getDriveClient, uploadFile, loadConfig } from './drive-helper.js';
import { fetchFromDrive } from './fetch-from-drive.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const BASE_DIR = path.join(__dirname, '..');
dotenv.config({ path: path.join(BASE_DIR, '.env') });

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Paths
const PENDING_DIR = path.join(BASE_DIR, 'requests', 'pending');
const PROCESSING_DIR = path.join(BASE_DIR, 'requests', 'processing');
const COMPLETED_DIR = path.join(BASE_DIR, 'requests', 'completed');
const PRODUCTS_DIR = path.join(BASE_DIR, 'products', 'completed');
const TRACKING_FILE = path.join(BASE_DIR, 'tracking', 'orders.md');
const TEMPLATE_FILE = path.join(BASE_DIR, 'templates', 'ai-greining-free-template.md');

/**
 * Process a single request
 */
async function processRequest(requestFile) {
  const startTime = Date.now();
  console.log(`\n⚙️  COO-Agent: Processing ${requestFile}...`);

  try {
    // 1. Read request data
    const requestPath = path.join(PENDING_DIR, requestFile);
    let requestData = JSON.parse(fs.readFileSync(requestPath, 'utf8'));

    // Handle n8n's nested array format: [{orderData: {...}}]
    if (Array.isArray(requestData) && requestData[0]?.orderData) {
      console.log(`   → Extracting orderData from n8n array format...`);
      requestData = requestData[0].orderData;
    }

    console.log(`   → Customer: ${requestData.companyName}`);
    console.log(`   → Industry: ${requestData.industry}`);

    // 2. Move to processing
    const processingPath = path.join(PROCESSING_DIR, requestFile);
    fs.renameSync(requestPath, processingPath);
    console.log(`   → Moved to processing...`);

    // 3. Generate product
    console.log(`   → Generating AI-greining...`);
    const product = await generateAIGreining(requestData);

    // 4. Save product locally
    const orderId = requestData.orderId || `AI-${Date.now()}`;
    const productFileName = `${orderId}-${sanitizeFilename(requestData.companyName)}-ai-greining.md`;
    const productPath = path.join(PRODUCTS_DIR, productFileName);
    fs.writeFileSync(productPath, product, 'utf8');
    console.log(`   → Product saved locally: ${productFileName}`);

    // 4b. Upload to Google Drive processing/ folder
    try {
      console.log(`   → Uploading to Google Drive processing/...`);
      const config = await loadConfig();
      const drive = await getDriveClient();
      const processingFolderId = config.folders.processing;

      const uploadedFile = await uploadFile(
        drive,
        productFileName,
        product,
        processingFolderId,
        'text/markdown'
      );

      console.log(`   → Uploaded to Drive: ${uploadedFile.name}`);
      console.log(`   → View: ${uploadedFile.webViewLink || 'Google Drive processing/'}`);
    } catch (uploadError) {
      console.error(`   ⚠️  Drive upload failed: ${uploadError.message}`);
      console.log(`   → Product still saved locally for manual upload`);
    }

    // 5. Move request to completed
    const completedPath = path.join(COMPLETED_DIR, requestFile);
    fs.renameSync(processingPath, completedPath);
    console.log(`   → Request completed`);

    // 6. Calculate delivery time
    const deliveryTime = ((Date.now() - startTime) / 1000 / 60).toFixed(2); // minutes
    const deliveryHours = (deliveryTime / 60).toFixed(2);

    // 7. Update tracking
    updateTracking(orderId, requestData, productFileName, deliveryHours);

    console.log(`\n✅ COMPLETED in ${deliveryTime} minutes`);
    console.log(`   Product: products/completed/${productFileName}`);
    console.log(`   Google Drive: LioraTech-COO/processing/`);
    console.log(`   Status: AWAITING CEO REVIEW IN PROCESSING/\n`);

    // 8. Notify CEO (would send email here in production)
    notifyCEO(orderId, requestData, productFileName, deliveryHours);

    return { success: true, orderId, deliveryTime };

  } catch (error) {
    console.error(`\n❌ ERROR processing ${requestFile}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch website content
 */
async function fetchWebsiteContent(url) {
  return new Promise((resolve, reject) => {
    try {
      // Ensure URL starts with https://
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;

      https.get(fullUrl, { timeout: 10000 }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
          // Limit to first 100KB
          if (data.length > 100000) {
            res.destroy();
          }
        });

        res.on('end', () => {
          // Remove HTML tags and extract text
          const text = data
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 3000); // Limit to 3000 chars for API

          resolve(text);
        });
      }).on('error', (err) => {
        console.log(`   ⚠️  Could not fetch website: ${err.message}`);
        resolve(''); // Return empty string on error
      }).on('timeout', () => {
        console.log(`   ⚠️  Website fetch timeout`);
        resolve('');
      });
    } catch (error) {
      console.log(`   ⚠️  Error fetching website: ${error.message}`);
      resolve('');
    }
  });
}

/**
 * Generate AI-greining product from request data using Claude API
 */
async function generateAIGreining(data) {
  const currentDate = new Date().toISOString().split('T')[0];

  // Fetch website content if provided (with 5 min timeout)
  let websiteContent = '';
  if (data.website) {
    console.log(`   → Fetching website: ${data.website}`);
    try {
      // Race between fetch and 5-minute timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout after 5 minutes')), 300000)
      );
      websiteContent = await Promise.race([
        fetchWebsiteContent(data.website),
        timeoutPromise
      ]);
      if (websiteContent) {
        console.log(`   → Website fetched: ${websiteContent.length} characters`);
      }
    } catch (error) {
      console.log(`   → Website fetch failed or timed out: ${error.message}`);
      console.log(`   → Continuing without website content...`);
    }
  }

  // Call Claude API to analyze and generate opportunities
  console.log(`   → Calling Claude API for analysis...`);

  const prompt = `Þú ert reynslumikill viðskiptaráðgjafi með djúpa þekkingu á AI-lausnum fyrir ${data.industry} iðnaðinn á Íslandi.

═══════════════════════════════════════
FYRIRTÆKIÐ SEM ÞÚ ERT AÐ GREINA
═══════════════════════════════════════

Nafn: ${data.companyName}
Iðnaður: ${data.industry}
Starfsmannafjöldi: ${data.employees || 'Ekki tilgreint'}
Vefsíða: ${data.website || 'Ekki tilgreint'}

Núverandi áskoranir: ${data.currentChallenges || 'Ekki tilgreint'}
Markmið: ${data.goals || 'Ekki tilgreint'}
Núverandi tól: ${data.currentTools || 'Ekki tilgreint'}

${websiteContent ? `\n═══ INNIHALD AF VEFSÍÐU ═══\n${websiteContent}\n` : ''}

═══════════════════════════════════════
ÞÍN VERKEFNI
═══════════════════════════════════════

Þú þarft að greina þetta fyrirtæki og finna 3-5 MJÖG SPECIFÍSK AI tækifæri sem eru:

1. **Sniðin að þessum iðnaði** - ekki generic "chatbot" eða "automation"
2. **Byggð á raunverulegum pain points** - leysa RAUNVERULEG vandamál
3. **Hagnýt og actionable** - hægt að innleiða strax
4. **Með mælanlegum ávinningi** - nákvæmur ROI
5. **Raðað eftir value** - mest áhrif fyrst

═══════════════════════════════════════
HUGSA FYRST - CHAIN OF THOUGHT
═══════════════════════════════════════

Áður en þú svarar, hugsaðu:

A) Hverjir eru BIGGEST pain points í ${data.industry}?
B) Hvaða tasks taka MEST tíma hjá ${data.companyName}?
C) Hvar er MESTUM peningum að spara?
D) Hvað gerir ${data.industry} UNIQUE samanborið við aðra?
E) Hvernig geta AI lausnir leyst SPECIFÍK vandamál í þessum iðnaði?

EKKI bara svara með generic "automation" - vertu SPECIFIC!

═══════════════════════════════════════
OUTPUT FORMAT (MJÖG MIKILVÆGT)
═══════════════════════════════════════

Svaraðu EINGÖNGU með JSON array af þessu format:

[
  {
    "name": "Specific nafn (EKKI generic, t.d. 'Invoice Processing Automation' EKKI bara 'Automation')",
    "description": "1-2 setningar á ÍSLENSKU sem útskýra nákvæmlega hvað þetta gerir fyrir ÞETTA fyrirtæki",
    "benefits": ["Specifik ávinningur 1", "Specifik ávinningur 2", "Specifik ávinningur 3"],
    "timeValue": "X-Y tímar/viku",
    "costValue": "X-Y ISK/ári",
    "qualityValue": "Specifik gæðabót fyrir þennan iðnað",
    "difficulty": "Auðvelt|Miðlungs|Erfitt",
    "priority": 1-5,
    "steps": ["Actionable skref 1", "Actionable skref 2", "Actionable skref 3"]
  }
]

═══════════════════════════════════════
REIKNIREGLUR (VERTU NÁKVÆMUR)
═══════════════════════════════════════

Tímagjald á Íslandi: 3.000-5.000 ISK/klst
Kostnaður = tímasparnaður × 52 vikur × ISK/klst

Dæmi:
- 15 tímar/viku → 780 tímar/ári × 4.000 = 3.120.000 ISK/ári
- 8 tímar/viku → 416 tímar/ári × 4.000 = 1.664.000 ISK/ári

Notaðu RAUNHÆFAR tölur fyrir ${data.industry}!

═══════════════════════════════════════
REMEMBER: SPECIFIC > GENERIC
═══════════════════════════════════════

SVARAÐU EINGÖNGU MEÐ JSON ARRAY - ENGIN ÖNNUR TEXTI!`;

  const message = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 4000,
    messages: [{
      role: "user",
      content: prompt
    }]
  });

  // Parse Claude's response
  const responseText = message.content[0].text;
  console.log(`   → Claude response received (${message.usage.input_tokens} in, ${message.usage.output_tokens} out)`);

  let opportunities;
  try {
    // Extract JSON from response (in case Claude adds extra text)
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      opportunities = JSON.parse(jsonMatch[0]);
    } else {
      opportunities = JSON.parse(responseText);
    }
  } catch (error) {
    console.error(`   ⚠️  Error parsing Claude response, using fallback`);
    opportunities = getFallbackOpportunities();
  }

  // Extract pain points from challenges
  const painPoints = extractPainPoints(data.currentChallenges || data.challenges || '');

  // Build the analysis (simplified - in production would use Claude API)
  const analysis = `# AI-GREINING: ${data.companyName}

**Order Type:** Ókeypis AI-greining
**Order ID:** ${data.orderId || 'PENDING'}
**Customer:** ${data.companyName}
**Industry:** ${data.industry}
**Generated:** ${currentDate}
**Delivery:** PDF (5-8 pages)

---

## COVER PAGE

\`\`\`
[LIORATECH LOGO]

AI GREINING FYRIR ${data.companyName.toUpperCase()}

3-5 Tækifæri til úrbóta með gervigreind

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prepared by: LioraTech ehf.
Date: ${currentDate}
Type: Ókeypis AI-greining
Project ID: ${data.orderId || 'PENDING'}

lioratech.is
info@lioratech.is
\`\`\`

---

## PAGE 1: INTRO

### Takk fyrir að prófa AI-greininguna okkar!

Þessi greining er byggð á þeim upplýsingum sem þú gafst okkur um ${data.companyName}.

**Hvað þú færð í þessari skýrslu:**
- ✅ Stutt yfirlit yfir núverandi stöðu
- ✅ 3-5 tækifæri til úrbóta með AI
- ✅ Forgangsröðun (hvað á að byrja á)
- ✅ Áætlað gildi hvers tækifæris

**Hvað þú færð EKKI:**
- ❌ Nákvæman implementation plan
- ❌ Tól og verkfæri tillögur
- ❌ ROI útreikninga
- ❌ Tímasetningar og milestones

*(Þetta er allt innifalið í 30-daga roadmap-inu)*

---

## PAGE 2: NÚVERANDI STAÐA

### Um ${data.companyName}

**Grunnupplýsingar:**
- Industry: ${data.industry}
- Team size: ${data.employees || 'Not specified'}
- Main goals: ${data.goals || 'Not specified'}
${data.website ? `- Vefsíða: ${data.website}` : ''}

### Þín helstu áskoranir

${painPoints.map((point, i) => `
**${i + 1}. ${point.title}**
- Þetta er algengt í ${data.industry} geiranum
- Áætlað tap: ${point.estimatedLoss}
- AI getur hjálpað: ${point.aiCanHelp}
`).join('\n')}

---

## PAGE 3-6: TÆKIFÆRI

${formatOpportunities(opportunities)}

---

## PAGE 7: FORGANGSRÖÐUN

### Hvað áttu að gera fyrst?

Byggt á þinni stöðu, mælum við með að byrja hér:

**Skref 1: Innleiða Tækifæri #1**
- Hvers vegna: Mest áhrif á skammtíma markmiðin þín
- Áætlaður tími: 2-4 vikur
- Þú þarft: Teymi sem getur tekið að sér innleiðingu

**Skref 2: Innleiða Tækifæri #2**
- Hvers vegna: Byggir á Tækifæri #1
- Áætlaður tími: 3-6 vikur
- Þú þarft: Samþætting við núverandi kerfi

**Skref 3: Meta árangur og halda áfram**
- Mæla árangur af #1 og #2
- Ákveða hvort halda áfram með #3
- Eða finna ný tækifæri

---

## PAGE 8: NÆSTU SKREF

### Hvað gerist núna?

**Option 1: Innleiða sjálfur** ✅ Free

Þú getur notað þessa greiningu til að byrja sjálfur.

**Kostar:**
- 0 ISK fyrir þessa greiningu
- Þú þarft að finna tól og byggja sjálfur

**Hæfir fyrir:**
- Þá sem hafa tíma og tæknilega færni
- Þá sem vilja læra og prófa sjálf

---

**Option 2: Fá nákvæman 30-daga plan** 💎 49.900 ISK + VSK

Við búum til nákvæman, step-by-step implementation plan:

**Þú færð:**
- ✅ Nákvæman 30-daga plan (dag fyrir dag)
- ✅ Tiltekin tól og verkfæri
- ✅ ROI útreikninga
- ✅ Success metrics
- ✅ Forgangsröðun og tímasetningar
- ✅ Áhættumöt og lausnir
- ✅ Email support

**Delivery:** Innan 24 klst

👉 **[Panta 30-daga roadmap](https://lioratech.is/quote)**

---

**Option 3: Full innleiðing með okkur** 🚀 Custom verð

Við innleiðum allt fyrir þig:

**Þú færð:**
- ✅ Allt úr Option 2
- ✅ Við byggjum automation fyrir þig
- ✅ Við setjum upp öll tól
- ✅ Við þjálfum teymið þitt
- ✅ Viðvarandi support

👉 **[Bóka samtal](https://lioratech.is/quote)**

---

## CLOSING

### Takk fyrir að prófa LioraTech! 🎉

Við vonumst til að þessi greining hafi gefið þér skýrari mynd af því hvar AI getur hjálpað þér.

**Spurningar?**
- Email: info@lioratech.is
- Website: lioratech.is

**Viltu eitthvað meira?**
- 30-daga roadmap: Nákvæmur plan → [Panta hér](https://lioratech.is/roadmap)
- Full innleiðing: Done-for-you → [Bóka samtal](https://lioratech.is/quote)

---

**Gangi þér vel!**

Ingi Þór Gunnarsson
LioraTech ehf.
info@lioratech.is

---

*This analysis was generated using AI and is provided as-is. For detailed recommendations and implementation support, consider ordering the 30-Day AI Roadmap.*
`;

  return analysis;
}

/**
 * Extract pain points from customer challenges text
 */
function extractPainPoints(challengesText) {
  // Simple extraction - in production would use AI to analyze
  const points = challengesText.split(/[,;\n]/).filter(p => p.trim().length > 0).slice(0, 3);

  return points.map(point => ({
    title: point.trim(),
    estimatedLoss: '5-10 tímar/viku', // Would be calculated by AI
    aiCanHelp: 'Já' // Would be analyzed by AI
  }));
}

/**
 * Get fallback opportunities if Claude API fails
 */
function getFallbackOpportunities() {
  return [
    {
      rank: '🥇',
      number: 1,
      name: 'Automated Data Processing',
      description: 'Sjálfvirk vinnsla og greining á gögnum með AI, minnkar handvirka vinnu og bætir nákvæmni.',
      benefits: [
        'Sparar 20-30 tíma á viku',
        'Minnkar villur um 90%',
        'Gerir ráð fyrir real-time insights'
      ],
      timeValue: '20-30 tímar/viku',
      costValue: '400.000-600.000 ISK/ári',
      qualityValue: 'Minni villur, betri gæði',
      difficulty: '🟡 Miðlungs',
      priority: '⭐⭐⭐⭐⭐ (5/5)',
      steps: [
        'Greina núverandi data flows',
        'Velja automation verkfæri',
        'Innleiða og prófa'
      ]
    },
    {
      rank: '🥈',
      number: 2,
      name: 'AI-powered Customer Communication',
      description: 'Sjálfvirkir viðskiptavinasamskipti með AI chatbot og email automation.',
      benefits: [
        'Svara fyrirspurnum 24/7',
        'Minnkar response time',
        'Bætir customer satisfaction'
      ],
      timeValue: '15-20 tímar/viku',
      costValue: '300.000-400.000 ISK/ári',
      qualityValue: 'Betri þjónusta, ánægðari viðskiptavinir',
      difficulty: '🟢 Auðvelt',
      priority: '⭐⭐⭐⭐ (4/5)',
      steps: [
        'Setja upp chatbot',
        'Þjálfa á common queries',
        'Samþætta við CRM'
      ]
    },
    {
      rank: '🥉',
      number: 3,
      name: 'Process Documentation & Optimization',
      description: 'AI greining á núverandi processes og tillögur að úrbótum.',
      benefits: [
        'Sýnileiki á bottlenecks',
        'Mælanlegar úrbætur',
        'Betri teamwork'
      ],
      timeValue: '10-15 tímar/viku',
      costValue: '200.000-300.000 ISK/ári',
      qualityValue: 'Skýrari processes, minni óskilvirkni',
      difficulty: '🟢 Auðvelt',
      priority: '⭐⭐⭐ (3/5)',
      steps: [
        'Kortleggja núverandi processes',
        'AI greining á bottlenecks',
        'Innleiða betrumbætur'
      ]
    }
  ];
}

/**
 * Format opportunities section
 */
function formatOpportunities(opportunities) {
  const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  const difficultyEmojis = {
    'Auðvelt': '🟢',
    'Miðlungs': '🟡',
    'Erfitt': '🔴'
  };

  return opportunities.map((opp, index) => `
### ${rankEmojis[index] || '⭐'} TÆKIFÆRI #${index + 1}: ${opp.name}

**Hvað þetta er:**
${opp.description}

**Hvernig það hjálpar þér:**
${opp.benefits.map(b => `- ${b}`).join('\n')}

**Áætlað gildi:**
- ⏰ Tímasparnaður: ${opp.timeValue}
- 💰 Kostnaðarsparnaður: ${opp.costValue}
- 📈 Gæðabót: ${opp.qualityValue}

**Erfiðleikastig:** ${difficultyEmojis[opp.difficulty] || '🟡'} ${opp.difficulty}

**Forgangsröðun:** ${'⭐'.repeat(opp.priority)} (${opp.priority}/5)

**Næstu skref ef þú vilt innleiða:**
${opp.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

*(Nákvæm innleiðingaráætlun er í 30-daga roadmap)*
`).join('\n---\n');
}

/**
 * Update tracking file with new order
 */
function updateTracking(orderId, requestData, productFileName, deliveryHours) {
  try {
    let tracking = fs.readFileSync(TRACKING_FILE, 'utf8');

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);

    const newEntry = `| ${orderId} | ${requestData.companyName} | AI-Greining (Free) | ${currentDate} ${currentTime} | ${deliveryHours}h | Industry: ${requestData.industry}, Pain: ${(requestData.currentChallenges || requestData.challenges || 'Not specified').slice(0, 50)}... Path: products/completed/${productFileName} |`;

    // Add to AWAITING CEO REVIEW section
    tracking = tracking.replace(
      /## AWAITING CEO REVIEW\n\n\| Order ID.*?\n\|[-|]+\n/,
      match => match + newEntry + '\n'
    );

    // Remove "No active orders" row if this is the first order
    tracking = tracking.replace(/\| - \| - \| - \| - \| - \| No active orders \|/, '');

    fs.writeFileSync(TRACKING_FILE, tracking, 'utf8');
    console.log(`   → Tracking updated`);
  } catch (error) {
    console.error(`   ⚠️  Warning: Could not update tracking: ${error.message}`);
  }
}

/**
 * Notify CEO (email in production, console for now)
 */
function notifyCEO(orderId, requestData, productFileName, deliveryHours) {
  console.log(`\n━━━ CEO NOTIFICATION ━━━`);
  console.log(`\n✅ AI-GREINING COMPLETE\n`);
  console.log(`Order ${orderId} is ready for your review.\n`);
  console.log(`Customer: ${requestData.companyName}`);
  console.log(`Email: ${requestData.email}`);
  console.log(`Industry: ${requestData.industry}\n`);
  console.log(`Analysis generated:`);
  console.log(`- 3-5 AI opportunities identified`);
  console.log(`- Ranked by priority`);
  console.log(`- Tailored to ${requestData.industry}\n`);
  console.log(`Deliverable: products/completed/${productFileName}`);
  console.log(`Generation time: ${deliveryHours} hours\n`);
  console.log(`━━━ ACTIONS ━━━\n`);
  console.log(`✅ Review analysis`);
  console.log(`✅ If approved: Send to customer at ${requestData.email}`);
  console.log(`✅ If changes needed: Reply to COO with revisions\n`);
  console.log(`Status: AWAITING CEO APPROVAL`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━\n`);
}

/**
 * Sanitize filename
 */
function sanitizeFilename(name) {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

/**
 * Check for and process all pending requests
 */
async function processPendingRequests() {
  // First, fetch new requests from Google Drive
  try {
    await fetchFromDrive();
  } catch (error) {
    console.error('⚠️  Warning: Could not fetch from Google Drive:', error.message);
    console.log('   → Continuing with local pending requests...\n');
  }

  console.log('⚙️  COO-Agent: Checking for pending requests...\n');

  if (!fs.existsSync(PENDING_DIR)) {
    console.log('❌ Pending directory does not exist:', PENDING_DIR);
    return;
  }

  const files = fs.readdirSync(PENDING_DIR).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('✓ No pending requests found.\n');
    return;
  }

  console.log(`Found ${files.length} pending request(s):\n`);

  for (const file of files) {
    await processRequest(file);
  }

  console.log('\n⚙️  COO-Agent: All pending requests processed.\n');
}

/**
 * Watch mode - continuously monitor for new requests
 */
function watchMode() {
  console.log('\n⚙️  COO-Agent: Starting in WATCH mode...');
  console.log(`   Monitoring: ${PENDING_DIR}`);
  console.log(`   Checking every 30 seconds\n`);

  // Initial check
  processPendingRequests();

  // Check every 30 seconds
  setInterval(() => {
    processPendingRequests();
  }, 30000);
}

// Main execution - always run when executed directly
const args = process.argv.slice(2);

if (args.includes('--watch') || args.includes('-w')) {
  watchMode();
} else {
  processPendingRequests().then(() => {
    console.log('✓ Processing complete.\n');
  }).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}

export { processRequest, processPendingRequests };
