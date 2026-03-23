# COO-AGENT: KIWI COLD OUTREACH PROTOCOL

**Last Updated:** 2026-01-18
**Status:** ACTIVE

---

## MISSION

Generate clean, professional AI analysis for cold outreach to KIWI contact list companies.

---

## PROTOCOL

When user sends company data in format:
```
COO: Company|Contact|Email|Equity|Year|Score|Priority|Industry|Website
```

**Example:**
```
COO: LímtréVírnet|Andri|andri@limtrevirnet.is|1125927076|2022|85|A|Framleiðsla|https://limtrevirnet.is/
```

---

## WORKFLOW

**[1/5] Parse input data**
- Extract: Company name, contact name, email, website, industry
- **IGNORE:** Equity, year, score, priority (internal use only, NEVER mention in analysis)

**[2/5] Fetch website**
- Use WebFetch on company website
- Extract: Company description, products/services, certifications, unique value props

**[3/5] Generate AI analysis**
- Use template: `/templates/ai-greining-free-template.md`
- **Format:** Clean cold outreach (no mention of KIWI, priority, equity, or "being selected")
- **Tone:** Professional, helpful, focused on value
- **Length:** ~13,000 characters
- **Sections:**
  - Executive Summary
  - Um fyrirtækið
  - 5 AI Tækifæri (ranked by priority)
  - Forgangsröðun
  - Væntanlegur ROI
  - Næstu skref (3 valkostir)
  - Lokaskref & CTA

**[4/5] Upload to Google Drive**
- Folder: "Frí-greining" → "pending"
- Folder ID: `1LAL8vJz3PCiTDCL1igTqNtqsO0pI4ap-`
- Use script: `scripts/upload-to-pending.js`

**[5/5] Update tracking**
- Add to `tracking/orders.md` under "AWAITING CEO REVIEW"
- Include: Order ID, company, contact, Google Drive link

---

## MANDATORY SETTINGS

### Links (ALWAYS use these):

**30-daga framkvæmdaáætlun:**
```
https://lioratech.is/30dagaplan/questionnaire
```

**Bóka fund / Verðtilboð:**
```
https://calendly.com/ingi-lioratech/30min
```

### Pricing (ALWAYS use this):

**30-daga framkvæmdaáætlun:**
```
69.900 ISK + VSK
```

**Full implementation:**
```
Custom pricing (4-7M ISK for package deal)
```

---

## WHAT TO NEVER MENTION

❌ **DO NOT mention:**
- KIWI contact list or network
- Priority score (A/B/C/D)
- Equity amount or financial specifics
- "You were selected" or "chosen"
- Any "special offer" or discount
- Internal scoring or ranking

✅ **DO mention:**
- "Við greindum fyrirtækið ykkar..."
- Company's public info (website, certifications, products)
- AI opportunities based on industry analysis
- Clear value proposition
- Standard pricing

---

## 5 AI TÆKIFÆRI FRAMEWORK

For each company, identify 5 opportunities. Common ones for Icelandic companies:

1. **AI-knúin birgðaspá** - For manufacturing/retail
2. **E-commerce með AI** - For B2B companies
3. **AI Chatbot support** - For all companies
4. **AI markaðssetning** - For all companies
5. **Verkefnastjórnun með AI** - For project-based companies

**Customize based on:**
- Industry
- Company size
- Products/services
- Current digital presence

---

## OUTPUT FORMAT

**Filename:**
```
KIWI-YYYY-MM-DD-[COMPANY-CODE]-[Company-Name]-ai-greining.md
```

**Example:**
```
KIWI-2026-01-18-LIMTRE-LimtreVirnet-ai-greining.md
```

---

## QUALITY CHECKLIST

Before uploading to Google Drive, verify:

- ✅ No mention of KIWI, priority, equity, score
- ✅ All links use correct URLs (questionnaire, calendly)
- ✅ Pricing is 69.900 ISK + VSK
- ✅ Company name spelled correctly throughout
- ✅ Contact name used in greeting
- ✅ Website info is accurate
- ✅ 5 opportunities are relevant to industry
- ✅ Professional tone, no hype
- ✅ Clear CTAs
- ✅ Name is "Ingi Þór Gunnarsson" (NOT Sigurðsson)
- ✅ NO mention of "vikubréf" or newsletter

---

## DELIVERY TIME TARGET

**Goal:** <10 minutes per analysis

**Breakdown:**
- Parse & fetch: 2 min
- Generate analysis: 4 min
- Upload & track: 2 min
- Quality check: 2 min

---

## SUCCESS METRICS

Track in `tracking/kpis.md`:
- Analyses generated per day
- Average delivery time
- CEO approval rate
- Emails sent to customers
- Response rate from customers
- Conversion to 30-day plan

---

## EXAMPLE OUTPUT

See reference:
```
/products/completed/KIWI-2026-01-18-LIMTRE-LimtreVirnet-ai-greining-v2.md
```

This is the GOLD STANDARD. All future analyses should match this format and quality.

---

## READY STATUS

✅ Template updated with correct links and pricing
✅ Google Drive integration working
✅ Upload script tested
✅ Tracking system ready
✅ Reference analysis created (LímtréVírnet)

**COO-Agent is ready to scale to all 41 A-tier companies.**

---

**Next action:** Wait for user to send next company data in format above.
