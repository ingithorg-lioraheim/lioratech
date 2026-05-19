# Claude API Integration Guide

## Current Status

✅ **Completed:**
- Website field added to form
- n8n workflow updated to capture website URL
- COO-Agent prepared for website analysis

⏸️ **Pending:**
- Claude API key required
- Website fetching implementation
- AI-powered analysis

---

## Why Add Claude API?

**Current system:** Uses static template (instant, 0 ISK cost)
**With Claude API:** Real AI analysis (25s, ~15-30 ISK per analysis)

**Benefits:**
- Analyzes company website automatically
- Generates industry-specific opportunities
- Much better quality insights
- Personalized recommendations

**Recommended:** Keep it FREE for lead generation
- Cost: ~15-30 ISK per analysis (very low)
- ROI: If 1 in 10 converts to paid roadmap = 199x return

---

## What You'll Need

### 1. Claude API Key

**Get it from:** https://console.anthropic.com/

**Steps:**
1. Create Anthropic account (separate from Claude subscription)
2. Go to Settings → API Keys
3. Create new key
4. Copy the key (starts with `sk-ant-...`)

**Cost:** Pay-per-use (~$3 per million tokens)
- One analysis ≈ 5,000 tokens ≈ $0.015 (15 ISK)

### 2. Add to Environment

```bash
# In coo-agent/.env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

## Implementation Plan

### Step 1: Install Dependencies

```bash
cd coo-agent
npm install @anthropic-ai/sdk node-fetch
```

### Step 2: Update process-requests.js

Add website fetching and Claude API call:

```javascript
import Anthropic from '@anthropic-ai/sdk';
import fetch from 'node-fetch';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function fetchWebsiteContent(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    // Extract text content (simple version)
    const text = html.replace(/<[^>]*>/g, ' ')
                     .replace(/\s+/g, ' ')
                     .substring(0, 5000); // Limit to 5000 chars
    return text;
  } catch (error) {
    return `Unable to fetch website: ${error.message}`;
  }
}

async function generateAIGreining(data) {
  let websiteContent = '';

  if (data.website) {
    console.log(`   → Fetching website: ${data.website}`);
    websiteContent = await fetchWebsiteContent(data.website);
  }

  const prompt = `You are an AI business consultant analyzing an Icelandic company.

COMPANY INFO:
- Name: ${data.companyName}
- Industry: ${data.industry}
- Team size: ${data.employees}
- Website: ${data.website}
- Current challenges: ${data.currentChallenges}
- Goals: ${data.goals}

${websiteContent ? `WEBSITE CONTENT:\n${websiteContent}\n` : ''}

Generate 3-5 specific AI opportunities for this company.
For each opportunity:
1. Name and description
2. How it solves their challenges
3. Time savings (hours/week)
4. Cost savings (ISK/year)
5. Difficulty level (easy/medium/hard)
6. Priority (1-5)

Format as JSON array.`;

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: prompt
    }]
  });

  const opportunities = JSON.parse(message.content[0].text);

  // Format into template...
  return formattedAnalysis;
}
```

### Step 3: Test

```bash
# Add a test request with website
./coo check
```

---

## Security Notes

⚠️ **Never commit API keys to git!**

Add to `.gitignore`:
```
.env
```

---

## Cost Monitoring

Track usage at: https://console.anthropic.com/settings/usage

**Expected costs:**
- 10 analyses/day = 150 ISK/day = 4,500 ISK/month
- 50 analyses/day = 750 ISK/day = 22,500 ISK/month
- 100 analyses/day = 1,500 ISK/day = 45,000 ISK/month

If 1 in 10 converts to 49,900 ISK roadmap:
- 10/day → 1 sale → 49,900 ISK revenue vs 4,500 ISK cost = **45,400 ISK profit**
- 100/day → 10 sales → 499,000 ISK revenue vs 45,000 ISK cost = **454,000 ISK profit**

---

## When to Implement

**Option 1: Now** - Get better quality analyses immediately
**Option 2: Later** - Wait until you have more traffic to justify

**Recommendation:** Implement when you're ready to test on localhost, then deploy to production when it works well.

---

## Questions?

If you need help implementing this, just ask!
