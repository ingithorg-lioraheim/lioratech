# LioraTech Operating System (LTOS)
**Version 1.0 | January 2026**

> *Single source of truth fyrir mission, strategy, workflows, offers, delivery, marketing, og systems.*

---

## 🎯 MISSION

### Core Mission
**Að gera AI aðgengilegt og arðbært fyrir íslensk lítil og meðalstór fyrirtæki.**

Við hjálpum íslenskum fyrirtækjum að:
1. **Spara 5-15 klst/viku** með AI automation
2. **Auka tekjur** með betri viðskiptavinagögnum og personalization
3. **Draga úr kostnaði** með því að sjálfvirka handvirk verkefni
4. **Skilja AI tækifæri** án þess að vera tæknisnillingur

### Vision (3-5 ár)
**Verða "AI Operating System" fyrir íslensk fyrirtæki** - þar sem hvert fyrirtæki hefur AI leadership team (CMO, COO, CFO agents) sem vinna 24/7 að því að bæta reksturinn.

### Values
- **Gagnsæi** - Við erum alltaf hreinskilin um hvað AI getur og getur ekki
- **Raunverulegur ávinningur** - Við seldum ekki "tech for tech's sake", við selja tímasparnaðar og arðsemi
- **Íslenskt fyrst** - Við skiljum íslenskan markað, tungumál, og menningu
- **Execution > Ideas** - Við hjálpum fyrirtækjum að innleiða, ekki bara að plana

---

## 📈 STRATEGY

### Target Market

#### Primary (80% af efforts)
**Íslensk SMB fyrirtæki með 1-50 starfsmenn**
- Iðnaður: Þjónusta, ráðgjöf, smásala, heilsugæsla, fitness
- Pain points: Of mikill tími í handvirkum verkefnum, erfitt að halda utan um verkefni, vantar innsýn í tölur
- Budget: 50k-500k ISK/mánuði fyrir AI lausnir
- Decision maker: Eigandi eða framkvæmdastjóri

#### Secondary (20% af efforts)
**Stærri fyrirtæki (50-200 starfsmenn) sem þurfa custom lausnir**
- Iðnaður: Sama og að ofan, en með meira complexity
- Budget: 500k-2M ISK/mánuði
- Decision maker: CTO, COO, eða innovation team

### Competitive Positioning

**LioraTech vs Competitors:**

| | LioraTech | Alþjóðleg AI Consultants | Íslensk dev shops |
|---|---|---|---|
| **Verð** | 69k-349k fyrir roadmap | 500k-2M+ | 200k-1M+ |
| **Tími** | 24 klst - 30 dagar | 3-6 mánuði | 2-6 mánuði |
| **Fokus** | Execution-ready roadmaps | High-level strategy | Custom development |
| **Íslenska** | ✅ Native | ❌ Ekki | ✅ Já |
| **AI-first** | ✅ 100% | ⚠️ Sum | ⚠️ Traditional dev |

**Unique Selling Proposition:**
> "Fáðu 30-daga AI framkvæmdaáætlun fyrir 69.900 kr - sent innan 24 klst. Ekki ráðgjöf, heldur action plan sem þú getur keyrt á morgun."

### Growth Strategy (2026)

**Q1 2026: Foundation (jan-mar)**
- ✅ Website live með conversion tracking
- ✅ COO agent MVP live
- ✅ Facebook ads campaign running
- 🎯 Target: 10 free analysis, 3 paid roadmaps (209k revenue)

**Q2 2026: Scale (apr-jún)**
- Launch LinkedIn ads
- Add "AI Chatbot" quick-win product (99k for simple chatbot)
- Improve COO agent quality based on feedback
- 🎯 Target: 25 free analysis, 10 paid roadmaps (699k revenue)

**Q3 2026: Expansion (júl-sep)**
- Launch CMO agent (marketing automation)
- Add "12-month ongoing support" subscription (199k/mán)
- Partner with 1-2 Icelandic SaaS companies for referrals
- 🎯 Target: 40 free analysis, 15 roadmaps, 3 subscriptions (2.6M revenue)

**Q4 2026: Leadership (okt-des)**
- Launch CFO agent (financial tracking)
- Host AI workshop events (lead gen + brand)
- Publish case studies from 2026 clients
- 🎯 Target: 50 free analysis, 20 roadmaps, 8 subscriptions (5.3M revenue)

**Total 2026 Revenue Target: 8.8M ISK**

---

## 🛠️ WORKFLOWS

### Customer Journey Map

```
AWARENESS → INTEREST → EVALUATION → PURCHASE → DELIVERY → RETENTION → ADVOCACY
```

#### Stage 1: AWARENESS
**How they find us:**
- Facebook/Instagram ads (primary)
- LinkedIn organic posts
- Google search ("AI ráðgjöf Island")
- Referrals from previous clients

**Goal:** Get them to click ad → land on lioratech.is

#### Stage 2: INTEREST
**What they see:**
- Homepage: Value prop, social proof, clear CTA
- /greining: Free AI analysis offer
- Pain point resonance: "Of mikill tími í handvirkum verkefni?"

**Goal:** Get them to click "Fá fría greiningu"

#### Stage 3: EVALUATION
**What happens:**
- They fill out /greining questionnaire (8 questions)
- CompleteRegistration event tracked → Facebook sees lead
- Email confirmation sent: "Greining þín kemur innan 24 klst"

**Goal:** Complete form submission

#### Stage 4: PURCHASE (for paid products)
**What happens:**
- COO agent generates free analysis → emails it
- Email includes CTA: "Viltu fá full 30-day roadmap? 69.900 kr"
- They click → /30dagaplan → questionnaire → payment → success
- Teya payment processed, n8n webhook triggers COO agent

**Goal:** Convert free → paid

#### Stage 5: DELIVERY
**What happens:**
- COO agent generates roadmap (30-day or 12-month)
- Uploads to Google Drive
- Emails PDF + Drive link to customer
- Timeline: 24-48 hours

**Goal:** Deliver high-quality output on time

#### Stage 6: RETENTION
**What happens:**
- Follow-up email (1 week later): "Hvernig gekk að lesa roadmap-ið?"
- Offer implementation support: "Viltu hjálp við að keyra þetta?"
- Monthly check-in: "Hvernig gengur innleiðingin?"

**Goal:** Keep them engaged, upsell implementation

#### Stage 7: ADVOCACY
**What happens:**
- Request testimonial/case study
- Ask for referrals: "Þekkir þú einhvern sem þyrfti þetta?"
- Feature them on LinkedIn/website
- Offer referral discount: "10% off fyrir hvern vin sem kaupir"

**Goal:** Generate word-of-mouth growth

---

### Internal Operations Workflows

#### Workflow 1: Free Analysis Request
```
1. User submits /greining form
2. n8n webhook receives data
3. n8n writes JSON to coo-agent/requests/pending/
4. n8n sends confirmation email via Gmail
5. COO agent (manual or cron):
   - Reads pending/*.json
   - Generates analysis with Claude AI
   - Creates PDF
   - Moves to products/
   - Emails customer with PDF attachment
6. n8n follow-up sequence:
   - Day 1: Confirmation email
   - Day 2: "Hvernig líst þér á greininguna?"
   - Day 7: "Viltu fá full roadmap?"
```

#### Workflow 2: Paid 30-Day Roadmap
```
1. User completes /30dagaplan/questionnaire
2. User pays via Teya (69,900 kr)
3. Teya webhook → n8n
4. n8n writes JSON to coo-agent/requests/pending/
5. COO agent:
   - Reads pending/*.json
   - Generates detailed 30-day roadmap
   - Creates multi-page PDF
   - Uploads to Google Drive
   - Emails customer with PDF + Drive link
6. Follow-up:
   - Day 7: "Hvernig gekk?"
   - Day 30: "Viltu implementation hjálp?"
```

#### Workflow 3: 12-Month Roadmap (same as 30-day, more depth)

#### Workflow 4: Marketing Content Creation
```
1. CMO (Ingi) drafts content idea
2. Review brand guidelines (BRAND_GUIDE.md)
3. Create content (LinkedIn post, FB ad, blog)
4. Post via KIWI (FB/IG) or manually (LinkedIn)
5. Track performance in Google Analytics
6. Iterate based on data
```

#### Workflow 5: Facebook Ad Campaign Management
```
1. Define campaign objective (Sales → CompleteRegistration)
2. Create 3 ad variations with different angles
3. Set budget (5000 ISK/day)
4. Launch campaign
5. Monitor daily:
   - CTR, CPC, CPM
   - Landing page views
   - Form submissions (conversions)
6. Optimize:
   - Pause low CTR ads
   - Increase budget on high performers
   - Test new creative
```

---

## 💼 OFFERS

### Product Portfolio

#### 1. **Frí AI Greining** (Free)
**What it is:**
- 3-5 skýr AI tækifæri fyrir fyrirtækið
- Sent innan 24 klst
- Eingöngu byggt á questionnaire svörum

**Purpose:**
- Lead generation
- Build trust
- Demonstrate value
- Upsell to paid roadmap

**Delivery:**
- AI-generated analysis (2-3 pages)
- PDF sent via email
- Google Drive link

**Revenue:**
- kr.0 direct
- ~30% conversion to paid = kr.20,970 per free analysis (indirect)

---

#### 2. **30 Daga AI Framkvæmdaáætlun** (69,900 kr)
**What it is:**
- Detailed 30-day implementation roadmap
- Week-by-week breakdown með action items
- Tool recommendations með pricing
- ROI estimates
- Implementation complexity ratings

**Includes:**
- 15-20 page roadmap document
- Svona 10-15 concrete initiatives
- Resource requirements (time, budget, skills)
- Risk assessment
- Success metrics

**Target customer:**
- SMB 1-20 starfsmenn
- Budget: 50k-200k/mán for AI tools
- Want quick wins, not long strategy

**Delivery:**
- 24-48 hour turnaround
- PDF + Google Drive
- Email follow-up after 7 days

**Unit economics:**
- Price: kr.69,900
- COGS: kr.~5,000 (Claude API + time)
- Margin: 93%
- Target: 10 per month = kr.699,000/mán revenue

---

#### 3. **12 Mánaða AI Roadmap** (349,000 kr)
**What it is:**
- Strategic 12-month plan fyrir stærri fyrirtæki
- Quarterly breakdown með phases
- Change management strategy
- Team training plan
- Vendor evaluation

**Includes:**
- 40-60 page comprehensive document
- Executive summary
- Quarterly OKRs
- Budget breakdown by quarter
- Risk mitigation strategies
- Implementation timeline with dependencies

**Target customer:**
- 20-200 starfsmenn
- Budget: 500k-2M/mán for AI
- Need board buy-in, structured approach

**Delivery:**
- 5-7 day turnaround
- PDF + Google Drive + presentation deck
- Optional: 1 hour Q&A call

**Unit economics:**
- Price: kr.349,000
- COGS: kr.~15,000
- Margin: 96%
- Target: 3 per month = kr.1,047,000/mán revenue

---

#### 4. **AI Implementation Support** (Custom pricing)
**What it is:**
- Vi help actually implement the roadmap
- Can include:
  - Chatbot development
  - Workflow automation (n8n, Zapier, Make)
  - Custom AI agents
  - Integration with existing tools
  - Training sessions

**Pricing models:**
- **Project-based:** kr.500k - kr.3M depending on scope
- **Hourly:** kr.25,000/hour (consulting + implementation)
- **Retainer:** kr.199k/mán (10 hours/month ongoing support)

**Target customer:**
- Clients who bought roadmap and want help executing
- Enterprises without internal tech team

**Delivery:**
- Timeline: 4-12 weeks depending on project
- Milestones with deliverables
- Weekly check-ins

---

#### 5. **AI Chatbot Quickstart** (99,000 kr) - COMING Q2 2026
**What it is:**
- Ready-to-deploy AI chatbot fyrir website
- Trained on company's FAQ, products, services
- Integrates with Messenger, WhatsApp, or website widget

**Includes:**
- Setup + training (1 week)
- 3 months hosting included
- Basic analytics dashboard
- Up to 1000 conversations/month

**Target customer:**
- E-commerce, service businesses
- High volume customer inquiries
- Want to reduce support burden

**Add-on:** kr.19,900/mán after 3 months for hosting + support

---

### Pricing Philosophy

**Why these prices?**

1. **Frí greining:** Loss leader - cost us time/API, but generates qualified leads
2. **30-day roadmap (69,900 kr):**
   - Affordable for SMBs
   - Cheaper than 1 day of traditional consultant (100k-150k/day)
   - High margin (93%)
   - Easily justifiable ROI (if roadmap saves 5 hrs/week = 20 hrs/month = ~100k value)
3. **12-month roadmap (349,000 kr):**
   - Still cheap vs competitors (500k-2M)
   - Serious commitment price - filters out tire-kickers
   - Positions us as strategic partner, not just vendor
4. **Implementation:** Custom - depends on scope, but always aim for 3-5x ROI for customer

**Value-based pricing approach:**
- Always anchor to customer's ROI, not our costs
- "Ef þetta sparar þér 10 klst/viku, það er 40 klst/mán × kr.10k/hr = kr.400k/mán value. Roadmap kostar kr.69,900 - það borgar sig á 5 dögum."

---

## 🚀 DELIVERY

### Quality Standards

**Every deliverable must:**
1. ✅ **Be executable** - Customer can hand it to their team tomorrow
2. ✅ **Have clear ROI** - Show expected time/cost savings
3. ✅ **Be realistic** - No pie-in-the-sky "implement GPT-5" suggestions
4. ✅ **Be prioritized** - High-impact, low-effort first
5. ✅ **Be Icelandic** - Language, currency, local tool recommendations
6. ✅ **Look professional** - Clean PDF design, no typos, branded

### Delivery Process

#### For AI Roadmaps:

**Step 1: Request received (0 hours)**
- JSON file written to coo-agent/requests/pending/
- Customer gets confirmation email

**Step 2: Analysis (1-4 hours)**
- COO agent reviews:
  - Customer questionnaire answers
  - Company website (if provided)
  - Industry best practices
  - Current tool stack
- Claude AI generates recommendations
- Agent formats output

**Step 3: Quality Check (30 mins - 2 hours)**
- Ingi reviews output
- Checks for:
  - Hallucinations or bad suggestions
  - Icelandic language quality
  - Realistic timelines
  - ROI calculations accuracy
- Edits/improves where needed

**Step 4: PDF Generation (15 mins)**
- Agent converts to PDF
- Applies LioraTech branding
- Adds cover page, table of contents
- Uploads to Google Drive

**Step 5: Delivery (5 mins)**
- Email sent with:
  - PDF attachment
  - Google Drive link (backup)
  - Thank you message
  - CTA for next step (implementation/follow-up call)

**Step 6: Follow-up (ongoing)**
- Day 7: "Hvernig líst þér á roadmap-ið?"
- Day 30: "Hvernig gengur innleiðingin?"
- Ongoing: Monthly check-in emails

**Total time per roadmap:**
- 30-day: 2-6 hours
- 12-month: 6-12 hours

### Service Level Agreements (SLAs)

| Product | Delivery Time | Response Time | Revision Policy |
|---|---|---|---|
| Frí greining | 24 hours | 12 hours | N/A (free) |
| 30-day roadmap | 24-48 hours | 6 hours | 1 free revision within 7 days |
| 12-month roadmap | 5-7 days | 12 hours | 2 free revisions within 14 days |
| Implementation | Per contract | 24 hours | Per milestone |

### Tech Stack for Delivery

**COO Agent:**
- Runtime: Node.js
- AI: Claude 3.5 Sonnet (Anthropic API)
- PDF: Puppeteer (HTML → PDF)
- Storage: Google Drive API
- Email: n8n → Gmail
- Tracking: Custom JSON logs in coo-agent/tracking/

**Website:**
- Frontend: React 19 + Vite + TypeScript
- Hosting: Netlify
- Analytics: Google Analytics 4 + Facebook Pixel
- Payments: Teya (Icelandic payment processor)
- Forms: Custom React forms → n8n webhook

**Automation:**
- Workflow engine: n8n (cloud hosted)
- Integrations: Gmail, Google Drive, Teya webhooks, Claude API

---

## 📣 MARKETING

### Marketing Strategy

**Core principle: Education-first marketing**

We don't sell "AI" - we sell outcomes:
- "Sparaðu 5-15 klst/viku"
- "Sjálfvirkaðu 80% af customer support"
- "Fáðu innsýn í CAC/ROI án þess að vera tölfræðingur"

### Marketing Channels

#### 1. **Facebook/Instagram Ads** (Primary)

**Current campaign:**
- Objective: Sales (CompleteRegistration)
- Budget: 5,000 ISK/day
- Target audience:
  - Iceland
  - Age: 30-60
  - Interests: Business, entrepreneurship, technology
  - Job titles: Owner, CEO, Manager
- Ad variations:
  - Ad 1: "3-5 tækifæri" angle (rational)
  - Ad 2: "Spara 5-15 klst" angle (time savings)
  - Ad 3: "Mannamál" angle (social proof)
- Landing page: lioratech.is/greining
- Tracking: Facebook Pixel + Conversions API

**Performance benchmarks:**
- CTR target: >1.2%
- CPC target: <150 ISK
- Landing page conversion: >10%
- Lead → Paid conversion: >20%

**Optimization cadence:**
- Daily: Check CTR, pause low performers
- Weekly: Test new creative
- Monthly: Audience refresh

---

#### 2. **LinkedIn Organic** (Secondary)

**Content strategy:**
- Post 3-5x per week
- Content mix:
  - 40% Educational (AI tips, case studies, how-tos)
  - 30% Social proof (client wins, testimonials)
  - 20% Company updates (new products, features)
  - 10% Personal (Ingi's journey, behind-the-scenes)

**Content calendar:**
- Monday: AI tip of the week
- Wednesday: Case study or client story
- Friday: Weekend thought/reflection

**Engagement strategy:**
- Comment on 10 posts per day in target audience
- Engage with Icelandic business community
- Join relevant LinkedIn groups

**Goal:** Build personal brand for Ingi as "AI expert fyrir íslensk fyrirtæki"

---

#### 3. **Google Search** (Organic - Long-term)

**SEO strategy:**
- Target keywords:
  - "AI ráðgjöf Ísland"
  - "gervigreind fyrir fyrirtæki"
  - "AI automation Iceland"
  - "chatbot Iceland"
- Content:
  - Blog posts (2-4 per month)
  - Case studies
  - FAQ pages
- Technical SEO:
  - Fast site (Vite build)
  - Mobile-first
  - Schema.org markup (already implemented)

**Timeline:** 6-12 months to see results

---

#### 4. **Email Marketing** (Nurture)

**Sequences:**

**Sequence 1: Free Analysis Follow-up**
- Day 0: Confirmation email
- Day 1: Analysis delivered
- Day 2: "Hvað hélst þú?" (ask for feedback)
- Day 7: "Viltu fá full 30-day roadmap?" (upsell)
- Day 30: "Hvernig gengur?" (check-in)

**Sequence 2: Paid Roadmap Follow-up**
- Day 0: Payment confirmation
- Day 1-2: Roadmap delivered
- Day 7: "Spurningar?" (Q&A offer)
- Day 30: "Implementation hjálp?" (upsell to implementation)
- Monthly: Check-in + tips

**Sequence 3: Newsletter (Future)**
- Monthly: AI news, tips, case studies
- Goal: Stay top-of-mind for future needs

---

#### 5. **Referral Program** (Future - Q2 2026)

**Structure:**
- Give: 10% discount for referrer
- Get: 10% discount for referred
- Track: Custom referral codes

---

### Content Assets

**Current assets:**
- Website: lioratech.is
- Brand guidelines: BRAND_GUIDE.md
- Social media strategy: FACEBOOK-STEFNA-2026.md, LINKEDIN-STEFNA-2026.md
- Ad creative: 3 variations (clock, handshake, lightbulbs)

**Needed assets (Q1 2026):**
- Case studies (need 3 successful clients first)
- Video testimonials
- Demo video showing COO agent workflow
- LinkedIn carousel posts (educational content)

---

### Brand Voice

**How we sound:**
- **Confident but humble** - We know AI, but we're not arrogant
- **Clear and direct** - No jargon, no buzzwords (unless explaining)
- **Icelandic-first** - We speak Icelandic naturally, not translations
- **Results-focused** - Always tie back to ROI, time savings, revenue

**How we DON'T sound:**
- ❌ Over-hyped ("AI will revolutionize everything!")
- ❌ Technical jargon ("Implement RAG with vector embeddings...")
- ❌ Corporate speak ("Synergize your digital transformation journey...")
- ❌ Salesy ("Limited time offer! Act now!")

---

## 🖥️ SYSTEMS

### Tech Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                    LIORATECH TECH STACK                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FRONTEND                                               │
│  ├─ Website: React 19 + Vite + TypeScript              │
│  ├─ Hosting: Netlify (auto-deploy from GitHub)         │
│  ├─ Analytics: GA4 + Facebook Pixel                    │
│  └─ Payments: Teya (Icelandic processor)               │
│                                                          │
│  BACKEND / AUTOMATION                                   │
│  ├─ n8n (cloud): Workflow orchestration                │
│  │   ├─ Webhooks (form submissions, payments)          │
│  │   ├─ Gmail integration (emails)                     │
│  │   └─ File system (write JSON to coo-agent/)         │
│  └─ COO Agent (Node.js):                               │
│      ├─ Claude API (AI generation)                     │
│      ├─ Puppeteer (PDF generation)                     │
│      ├─ Google Drive API (storage)                     │
│      └─ Gmail (delivery)                               │
│                                                          │
│  INFRASTRUCTURE                                         │
│  ├─ Git: GitHub (version control)                      │
│  ├─ Secrets: .env files (not committed)                │
│  └─ Backup: Google Drive                               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### System Architecture

**Current state (January 2026):**

```
User fills form on lioratech.is
        ↓
Netlify frontend (React)
        ↓
n8n webhook receives data
        ↓
n8n writes JSON → coo-agent/requests/pending/
        ↓
n8n sends confirmation email (Gmail)
        ↓
COO agent (manual/cron):
  ├─ Reads pending/*.json
  ├─ Calls Claude API
  ├─ Generates roadmap
  ├─ Creates PDF (Puppeteer)
  ├─ Uploads to Google Drive
  ├─ Emails customer
  └─ Moves JSON to tracking/
```

**Future state (Q3-Q4 2026):**

```
Company OS Dashboard
        ↓
┌───────┴────────┬──────────┬──────────┐
│               │          │          │
CMO Agent    COO Agent   CFO Agent   [Future: CTO, HR]
│               │          │
├─ Marketing   ├─ Ops     ├─ Finance
├─ Ad mgmt     ├─ Tasks   ├─ Budgets
├─ Content     ├─ Support ├─ ROI
└─ Analytics   └─ Alerts  └─ Reports
        ↓
Customer dashboard (self-service)
```

---

### Data & Security

**Customer data:**
- Stored: coo-agent/requests/, coo-agent/products/
- Backup: Google Drive (private folder per customer)
- Retention: Indefinite (unless customer requests deletion)
- Access: Only Ingi (owner)

**Secrets management:**
- .env files (not committed to git)
- Includes:
  - Anthropic API key
  - Google Drive credentials
  - Gmail OAuth tokens
  - Teya payment keys
  - Facebook Pixel ID
- Backup: 1Password (personal)

**GDPR Compliance:**
- Privacy policy: /skilmalar page
- Data deletion: Available on request (email ingi@lioratech.is)
- Cookie consent: CookieConsent component on website

---

### Development Workflow

**Code management:**
- Repo: https://github.com/ingithorg-lioraheim/lioratech.git
- Branch strategy:
  - `main` - production (auto-deploys to Netlify)
  - Feature branches for major changes
- Commit messages: Descriptive, include context

**Deployment:**
- Website: Push to `main` → Netlify auto-builds → Live in ~2 mins
- COO agent: SSH to server (or local) → pull latest → restart service

**Testing:**
- Manual testing before deploy
- Test order flow end-to-end weekly
- Monitor GA4 for errors (drop-offs, broken funnels)

---

### Monitoring & Metrics

**Key metrics to track:**

**Marketing:**
- Ad CTR, CPC, CPM (Facebook Ads Manager)
- Landing page conversion rate (GA4)
- Traffic sources (GA4)
- Cost per lead (Ad spend ÷ leads)

**Product:**
- Free analysis requests per week
- Paid roadmap purchases per week
- Conversion rate (free → paid)
- Average order value

**Operations:**
- COO agent uptime
- Average delivery time (request → delivered)
- Customer satisfaction (NPS or simple feedback)
- Support inquiries (volume, type)

**Financial:**
- Revenue (monthly, quarterly)
- COGS (API costs, hosting, tools)
- Profit margin
- CAC (customer acquisition cost)
- LTV (lifetime value)

**Dashboard:**
- Currently: Manual tracking in spreadsheet
- Future (Q2): Custom dashboard (React + GA4 API + Stripe API)

---

### Tools & Subscriptions

| Tool | Purpose | Cost (ISK/month) | Status |
|---|---|---|---|
| Netlify | Website hosting | Free (hobby plan) | Active |
| Anthropic API | Claude AI | ~10k (usage-based) | Active |
| n8n Cloud | Workflow automation | ~8k | Active |
| Google Workspace | Email, Drive | ~1,500 | Active |
| Facebook Ads | Marketing | 150k (budget) | Active |
| Teya | Payment processing | 0 + 1.5% fees | Active |
| GitHub | Code hosting | Free | Active |
| Claude Code | AI coding assistant | ~$20/mo (~3k) | Active |

**Total monthly cost: ~23k ISK + 150k ad spend = 173k ISK**

---

## 📊 SUCCESS METRICS (2026 GOALS)

### Revenue Goals
- Q1: 209k ISK (3 paid roadmaps)
- Q2: 699k ISK (10 roadmaps)
- Q3: 2.6M ISK (15 roadmaps + 3 subscriptions)
- Q4: 5.3M ISK (20 roadmaps + 8 subscriptions)
- **Total 2026: 8.8M ISK revenue**

### Customer Goals
- Free analyses delivered: 125 (avg ~10/month)
- Paid roadmaps sold: 48 (avg ~4/month)
- Subscription customers: 11 by year-end
- Customer satisfaction: >4.5/5 average

### Marketing Goals
- Website traffic: 2,000 monthly visitors by Q4
- Facebook ad CTR: >1.5% consistently
- LinkedIn followers: 500+ by Q4
- Email list: 300+ subscribers

### Product Goals
- COO agent quality: <5% revision requests
- Delivery time: <24 hours for 80% of free analyses
- New product launches: 2 (Chatbot Quickstart + CMO agent)

---

## 🚦 NEXT ACTIONS (January 2026)

### Immediate (This week)
- [x] Fix /greining mobile scroll issue
- [x] Monitor Facebook campaign performance
- [ ] Respond to any leads within 6 hours
- [ ] Generate first paid roadmap (when order comes)

### Short-term (This month)
- [ ] Create 3 case study drafts (need clients first)
- [ ] Set up automated weekly performance report (GA4 + FB data)
- [ ] Improve COO agent prompt based on first deliveries
- [ ] Launch LinkedIn content calendar (3x/week)

### Medium-term (Q1 2026)
- [ ] Execute repository refactor (LTOS structure)
- [ ] Reach 10 free analysis delivered
- [ ] Close 3 paid roadmap deals
- [ ] Collect first testimonials
- [ ] Optimize Facebook ads based on conversion data

### Long-term (2026)
- [ ] Build CMO agent (Q3)
- [ ] Build CFO agent (Q4)
- [ ] Launch AI Chatbot Quickstart product (Q2)
- [ ] Host first AI workshop event (Q3)
- [ ] Hit 8.8M ISK revenue target

---

## 📝 NOTES

**This document is a living document.**

Update it:
- When strategy changes
- When new products launch
- When processes improve
- When metrics/goals change

**Owner:** Ingi Þór (ingi@lioratech.is)
**Last updated:** January 13, 2026
**Next review:** February 1, 2026

---

*🤖 Generated with assistance from Claude Code*
