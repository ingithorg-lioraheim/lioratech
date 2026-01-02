# 🚀 LAUNCH CHECKLIST - LioraTech

**Dagsetning:** 2026-01-02
**Status:** ✅ LIVE á lioratech.is (bíður eftir Teya credentials)

---

## ✅ LOKIÐ Í DAG (2026-01-02)

### 🎉 Vefsíðan er LIVE!
- ✅ Deploy-að á Netlify
- ✅ SEO optimization (meta tags, Open Graph, Schema.org)
- ✅ Google Analytics 4 uppsett (G-5MGS0GYZE3)
- ✅ Sitemap.xml og robots.txt
- ✅ Cookie consent banner
- ✅ Scroll-to-top fix
- ✅ Footer navigation fix

### 🤖 n8n Workflows - Öll 3 virka!
- ✅ **Ókeypis AI Greining** - `/webhook/roadmap-request`
  - Sendir email til ingi@lioratech.is
  - Sendir confirmation til viðskiptavinar
  - Vistar í Google Drive
- ✅ **30 Daga Roadmap** - `/webhook/30-day-*`
  - Payment flow tilbúið
  - COO-Agent integration
- ✅ **Verðtilboð** - `/webhook/quote-request`
  - JSON workflow file búinn til
  - Imported og tested
  - Virkar á https://lioratech.is/quote

### 🎨 UI Updates
- ✅ Newsletter section falið tímabundið
  - Kóði preserved í comments
  - "Fréttabréf" fjarlægt úr navigation
  - Auðvelt að virkja aftur síðar

### 📝 Documentation
- ✅ TEYA-SETUP-GUIDE.md búinn til
- ✅ n8n workflow JSON files tilbúin
- ✅ Testing procedures skráðar

---

## ⏳ FYRIR LAUNCH (Bíðum eftir)

### 1. 🔑 Teya Payment Gateway Credentials
**Status:** ⏳ Bíðum eftir svari frá Magnúsi
**Timeline:** 1-5 virkir dagar

**Þegar credentials koma:**
- [ ] Fá Private Access Token frá B-Online
- [ ] Fá Public Access Token frá B-Online
- [ ] Setja í Netlify Environment Variables:
  ```
  TEYA_PRIVATE_TOKEN=xxx
  TEYA_PUBLIC_TOKEN=xxx
  TEYA_ENVIRONMENT=test
  TEYA_BASE_URL=https://test.borgun.is/rpgapi
  ```
- [ ] Skrá webhook URL í B-Online:
  ```
  URL: https://lioratech.is/.netlify/functions/teya-webhook
  Event: PaymentCreate
  ```
- [ ] Test payment með test korti
- [ ] Verify webhook virkar (sjá n8n execution)
- [ ] Verify COO-Agent fær order data

**Skjöl:** `TEYA-SETUP-GUIDE.md`

---

### 2. 🎨 Myndir fyrir SEO & Social Media
**Status:** ⏳ Vantar
**Priority:** HIGH

#### Þarf að búa til:

**A. Open Graph Image (Social Sharing)**
```
Filename: og-image.jpg
Size: 1200 x 630 px
Format: JPG or PNG
Location: /public/og-image.jpg

Innihald:
- LioraTech logo
- Headline: "AI Ráðgjöf fyrir Íslensk Fyrirtæki"
- Subheadline: "30 Daga AI Framkvæmdaáætlun - 69.900 kr"
- Brand colors: #1e3a8a (primary), #3b82f6 (accent)
```

**B. Logo**
```
Filename: logo.png
Size: 512 x 512 px (square)
Format: PNG (transparent background)
Location: /public/logo.png
```

**C. Favicon** (optional en recommended)
```
Filename: favicon.ico
Size: 32 x 32 px
Location: /public/favicon.ico
```

**Verkfæri til að búa til:**
- Canva.com (free)
- Figma (free)
- Adobe Express

---

## 🚀 VIÐ LAUNCH (Same day)

### 1. 📊 Google Search Console Setup
**Timeline:** 10 mínútur
**URL:** https://search.google.com/search-console

**Skref:**
- [ ] Fara á Google Search Console
- [ ] Add property: `https://lioratech.is`
- [ ] Verify ownership með einhverri af:
  - HTML file upload
  - Meta tag (add to index.html)
  - Google Analytics (already have!)
  - Domain DNS (best fyrir subdomain)
- [ ] Submit sitemap: `https://lioratech.is/sitemap.xml`
- [ ] Request indexing fyrir key pages:
  - `/` (homepage)
  - `/30dagaplan`
  - `/greining`
  - `/quote`

**Eftir submit:**
- Bíða 1-7 daga fyrir indexing
- Check "Coverage" report fyrir errors

---

### 2. 🔍 Google Business Profile (Optional)
**Timeline:** 15 mínútur
**URL:** https://business.google.com

**Ef þú vilt birtast í Google Maps:**
- [ ] Búa til Google Business Profile
- [ ] Add business info:
  - Name: LioraTech
  - Category: Business Consultant / IT Services
  - Address: (ef þú vilt)
  - Phone: (optional)
  - Website: https://lioratech.is
  - Email: info@lioratech.is
- [ ] Verify business

---

### 3. 📧 Email Setup Verification
**Status:** ✅ Virkar (Gmail Workspace)

**Double-check:**
- [ ] info@lioratech.is virkar
- [ ] ingi@lioratech.is virkar
- [ ] Test: Send email til bæði
- [ ] SPF/DKIM records OK (fyrir deliverability)

---

### 4. 🔔 n8n Workflows Active
**Status:** ✅ Uppsett

**Verify:**
- [ ] "30-Day Roadmap with Payment" workflow er ACTIVE
- [ ] Test webhook manually:
  ```bash
  curl -X POST https://lioratech.app.n8n.cloud/webhook/roadmap-request \
    -H "Content-Type: application/json" \
    -d '{"test": true}'
  ```
- [ ] Check execution logs

---

### 5. 🤖 COO-Agent Ready
**Status:** ✅ Uppsett

**Verify:**
- [ ] Google Drive folders tilbúnar:
  - `pending-payment/`
  - `in-progress/`
  - `completed/`
- [ ] Claude API key virkar (test prompt)
- [ ] PDF generation virkar
- [ ] Email notification virkar

---

## 📈 EFTIR LAUNCH (Week 1)

### 1. 📊 Analytics Monitoring
**Day 1-7:**
- [ ] Check Google Analytics Realtime
- [ ] Verify events eru að track-a:
  - Page views
  - Product views (view_item)
  - Purchases (conversion)
- [ ] Check conversion rate

**Tools:**
- Google Analytics 4: https://analytics.google.com
- Netlify Analytics: https://app.netlify.com

---

### 2. 💳 Test Payment Flow (End-to-End)
**When:** Teya test mode virkar

**Test scenario:**
- [ ] Fara á `/30dagaplan`
- [ ] Fylla út questionnaire
- [ ] Greiðslusíða → Teya hosted page
- [ ] Nota test kort
- [ ] Verify success redirect
- [ ] Check n8n execution
- [ ] Verify roadmap generation byrjar
- [ ] Check email notification

**Test kort frá Teya:**
```
Card: [Teya gefur test card number]
CVV: 123
Expiry: 12/27
```

---

### 3. 🐛 Error Monitoring
**Week 1:**
- [ ] Check Netlify function logs daglega
- [ ] Monitor n8n execution errors
- [ ] Check for 404 errors í Google Search Console
- [ ] Monitor payment failures (if any)

---

### 4. 🔐 Security Checklist
- [ ] HTTPS virkar á öllum síðum
- [ ] Environment variables eru SECRET (ekki í git)
- [ ] Webhook signature verification virkar (Teya)
- [ ] Cookie consent banner virkar
- [ ] GDPR compliant

---

## 🎯 PRODUCTION READINESS

### Teya Production Setup
**When:** Test mode successful

- [ ] Fá production credentials frá Teya
- [ ] Update Netlify env vars:
  ```
  TEYA_ENVIRONMENT=production
  TEYA_BASE_URL=https://api.borgun.is/rpgapi
  TEYA_PRIVATE_TOKEN=<prod_token>
  ```
- [ ] Update webhook í B-Online (verify URL)
- [ ] Test með ALVÖRU korti (lítil upphæð)
- [ ] Monitor first real payment closely

---

## 📱 MARKETING & CONTENT (Weeks 1-4)

### 1. 📰 Fréttabréf/Grein
**Priority:** HIGH
**Timeline:** Week 1-2

- [ ] Skrifa launch fréttabréf:
  - Headline: "LioraTech lanserar - AI ráðgjöf fyrir íslensk fyrirtæki"
  - Kynna free analysis
  - Kynna 30-day plan
  - Success story eða case study
  - CTA: "Fáðu ókeypis greining"
- [ ] Senda á email lista (ef þú ert með)
- [ ] Publish á LinkedIn (Ingi Þór profile)
- [ ] Publish á Facebook
- [ ] Íhuga: Senda til viðskiptablaða (Viðskiptablaðið, etc.)

---

### 2. 📘 Facebook Business Manager & Ads
**Priority:** HIGH
**Timeline:** Week 1

#### A. Facebook Business Manager Setup
- [ ] Búa til Facebook Business Manager account
  - URL: https://business.facebook.com
  - Add business: Lioraheim ehf. (kt. 6606251860)
- [ ] Add assets:
  - Facebook Page (búa til ef ekki til)
  - Instagram account (optional)
  - lioratech.is domain
  - Ad account
- [ ] Add people/roles:
  - Ingi Þór (admin)
  - Add backup admin (ingithorg@gmail.com)

#### B. Facebook Pixel Setup
**Status:** ⏳ VANTAR - CRITICAL!

**Skref:**
- [ ] Búa til Facebook Pixel í Business Manager
- [ ] Copy Pixel ID (líkist: 1234567890123456)
- [ ] Install pixel code í index.html:

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

- [ ] Add conversion events:
  - ViewContent (product page)
  - AddToCart (questionnaire filled)
  - InitiateCheckout (payment page)
  - Purchase (success page) ← IMPORTANT!
- [ ] Test með Facebook Pixel Helper extension
- [ ] Verify events í Facebook Events Manager

**Integration með analytics.ts:**
```typescript
// Add to utils/analytics.ts
export function trackFacebookPixel(eventName: string, params?: any) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}
```

#### C. Facebook Auglýsingar
**Budget:** 20.000-50.000 kr/mán (byrja lítið)
**Timeline:** Week 2-3

**Campaign 1: Free Analysis Lead Gen**
- [ ] Objective: Lead generation
- [ ] Target: Íslenskir business owners, 30-55 ára
- [ ] Ad creative:
  - Image: og-image.jpg eða custom
  - Headline: "Ókeypis AI Greining fyrir Fyrirtækið Þitt"
  - Description: "Finndu hvernig AI getur hjálpað þér"
  - CTA: "Fá ókeypis greining"
- [ ] Landing page: /greining
- [ ] Budget: 10.000 kr/mán
- [ ] A/B test: 2-3 variations

**Campaign 2: 30-Day Plan Conversion**
- [ ] Objective: Conversions (Purchase)
- [ ] Target: Íslenskir business owners með meiri interest
- [ ] Ad creative:
  - Headline: "30 Daga AI Framkvæmdaáætlun - 69.900 kr"
  - Social proof: "Þróað með Claude AI"
  - CTA: "Panta núna"
- [ ] Landing page: /30dagaplan
- [ ] Budget: 20.000 kr/mán
- [ ] Track conversions með Pixel

**Campaign 3: Retargeting**
- [ ] Target: Visitors sem sáu /30dagaplan en keyptu ekki
- [ ] Offer: "Takmarkað tilboð" eða "Ókeypis 20 mín símtal"
- [ ] Budget: 10.000 kr/mán

---

### 3. 🌍 Ensk Útgáfa (English Version)
**Priority:** MEDIUM
**Timeline:** Month 2-3

**Why:**
- Expand to Nordic market
- English-speaking companies í Iceland
- International SEO

**Plan:**
- [ ] Create `/en/` route structure
- [ ] Translate key pages:
  - `/en/` (homepage)
  - `/en/30-day-plan`
  - `/en/free-analysis`
  - `/en/quote`
- [ ] Update meta tags með hreflang:
  ```html
  <link rel="alternate" hreflang="is" href="https://lioratech.is/" />
  <link rel="alternate" hreflang="en" href="https://lioratech.is/en/" />
  ```
- [ ] Language switcher í navbar
- [ ] Translate email templates
- [ ] Update n8n workflows fyrir English

**Alternative:** Start með English landing page fyrir specific product

---

### 4. 📧 Póstkerfi (Email Service Provider)
**Priority:** HIGH
**Timeline:** Week 1-2

**Options to evaluate:**

**A. Mailchimp** (Popular choice)
- Free tier: 500 contacts, 1000 emails/mán
- Pros: Easy, templates, automation
- Cons: Dýrt þegar þú vex

**B. Brevo (formerly Sendinblue)** ← RÁÐLAGT
- Free tier: Unlimited contacts, 300 emails/dag
- Pros: Generous free tier, CRM included
- Cons: Slightly less polished

**C. ConvertKit** (For creators)
- Free tier: 1000 subscribers
- Pros: Great for newsletters, landing pages
- Cons: Limited automation

**D. n8n + Gmail** (DIY)
- Pros: Already have n8n, full control
- Cons: More manual work, deliverability issues

**Recommendation: Brevo**

**Setup checklist:**
- [ ] Búa til Brevo account (brevo.com)
- [ ] Verify domain (lioratech.is)
  - Add SPF record
  - Add DKIM record
  - Verify sender: info@lioratech.is
- [ ] Import contact list (if any)
- [ ] Create email templates:
  - Welcome email
  - Free analysis confirmation
  - Order confirmation (30-day plan)
  - Newsletter template
- [ ] Setup automation:
  - Welcome series (3-5 emails)
  - Abandoned cart (questionnaire started but not paid)
  - Post-purchase follow-up
- [ ] Integration:
  - Add signup form to website
  - Connect n8n to Brevo API
  - Track conversions

---

### 5. 📬 Fréttabréf (Newsletter)
**Priority:** MEDIUM
**Timeline:** Week 2-3

**Strategy:**
- **Frequency:** 1-2x per month
- **Day:** Þriðjudagur kl. 10:00 (best open rates)
- **Content mix:**
  - AI news & trends
  - Case studies
  - Tips & tricks
  - Product updates
  - Success stories

**First 3 newsletters:**

**Newsletter #1: "Velkomin!"**
- Kynna LioraTech
- Hvað við bjóðum
- Free resource: "5 AI Tools Every Business Should Use"
- CTA: Book free consultation

**Newsletter #2: "AI fyrir Byrjendur"**
- Myth-busting about AI
- Easy wins með AI
- Customer spotlight
- CTA: Free analysis

**Newsletter #3: "Case Study: 30-Day Success"**
- Real example (þegar þú færð fyrsta client)
- ROI calculation
- Testimonial
- CTA: Get your roadmap

**Newsletter signup incentive:**
```
"Fáðu ókeypis AI Guide þegar þú skráir þig!"
→ Create simple PDF: "10 AI Tools fyrir Íslensk Fyrirtæki"
```

**Setup:**
- [ ] Design newsletter template (Brevo eða Canva)
- [ ] Create signup form for website
- [ ] Add to footer: "Skráðu þig á fréttabréfið"
- [ ] Write first 3 newsletters
- [ ] Schedule sending

---

### 6. 💼 LinkedIn Strategy
**Priority:** HIGH (B2B focus)
**Timeline:** Ongoing from Week 1

**Ingi Þór Personal Brand:**
- [ ] Update LinkedIn profile:
  - Headline: "AI Ráðgjafi | Founder @ LioraTech | Hjálpa Íslenskum Fyrirtækjum að Innleiða AI"
  - About: Value proposition + link to lioratech.is
  - Featured: Pin post about LioraTech launch
  - Experience: Add LioraTech as current role

**Content Strategy:**
- **Post 3-5x per week**
- **Content pillars:**
  1. AI education (40%)
  2. Behind-the-scenes (30%)
  3. Client success (20%)
  4. Personal insights (10%)

**First Month Content Plan:**

**Week 1:**
- Mon: Launch announcement
- Wed: "Why I started LioraTech" (story)
- Fri: AI tip of the week

**Week 2:**
- Mon: Free analysis offer
- Wed: "Common AI misconceptions"
- Fri: Weekend read: AI article

**Week 3:**
- Mon: 30-day plan deep dive
- Wed: Client testimonial (when available)
- Fri: AI tool recommendation

**Week 4:**
- Mon: Month in review
- Wed: Behind-the-scenes: How we build roadmaps
- Fri: "What's next for AI in Iceland?"

**Tactics:**
- [ ] Use hashtags: #AI #GerviGreind #Ísland #Fyrirtæki #Innovation
- [ ] Engage: Comment á öðrum AI posts
- [ ] DM: Reach out til potential clients
- [ ] LinkedIn Articles: Long-form content monthly
- [ ] Video: Byrja með 1-2 short videos

**LinkedIn Ads (optional - Month 2):**
- Sponsored posts til target audience
- Budget: 15.000 kr/mán

---

### 7. 🎨 Facebook/Instagram Organic
**Timeline:** Ongoing

**Facebook Page Setup:**
- [ ] Create LioraTech Facebook Page
- [ ] Add cover photo + profile picture
- [ ] Complete About section
- [ ] Add CTA button: "Fá tilboð" → /quote
- [ ] Post 2-3x per week:
  - Educational content
  - Client wins
  - Free resources
  - Behind-the-scenes

**Instagram (optional):**
- [ ] Create @lioratech account
- [ ] Post AI tips, infographics
- [ ] Stories: Daily tips
- [ ] Reels: Short AI explainers

---

### 8. 📊 Analytics & Tracking Setup
**Beyond GA4:**

- [ ] **Hotjar** (heatmaps, recordings)
  - Free tier: 35 sessions/day
  - See where users click, scroll
  - Find UX issues

- [ ] **Microsoft Clarity** (free alternative)
  - Unlimited sessions
  - Heatmaps + session recordings
  - Free forever

- [ ] **Facebook Pixel** (already covered above)

- [ ] **LinkedIn Insight Tag**
  - Track conversions from LinkedIn
  - Build retargeting audiences

---

## 🚀 PHASE 2: GROWTH (Month 2-6)

### Content Marketing
- [ ] Start blog on lioratech.is/blog
  - SEO-optimized articles
  - 2-4 posts per month
  - Topics: AI guides, case studies, news
- [ ] Guest post á öðrum blogum
- [ ] Podcast appearances (AI þættir)

### Partnerships
- [ ] Reach out til viðskiptaráðgjafa
- [ ] Partner með web development agencies
- [ ] Affiliate program (10% commission?)

### Case Studies & Testimonials
- [ ] Document first 3-5 clients
- [ ] Create case study template
- [ ] Get video testimonials
- [ ] Feature on homepage

### Referral Program
- [ ] "Refer a friend, get 10% discount"
- [ ] Track með unique codes
- [ ] Automate með n8n

### Webinars/Events
- [ ] Monthly webinar: "AI fyrir Fyrirtæki"
- [ ] Free 1-hour workshop
- [ ] Lead generation machine

---

## 🛠️ TECHNICAL & OPERATIONS

### CRM Setup
**Options:**
- HubSpot (free tier)
- Pipedrive
- Google Sheets + n8n (DIY)

**Track:**
- Leads (from forms)
- Opportunities (in negotiation)
- Customers (paid)
- Follow-ups

### Customer Support
- [ ] Live chat widget? (Crisp.chat, Intercom)
- [ ] FAQ page
- [ ] Email templates fyrir common questions
- [ ] Response time goal: <24 hours

### Legal & Compliance
- [ ] Privacy Policy page (GDPR)
- [ ] Terms of Service page
- [ ] Cookie policy (already have consent)
- [ ] Data processing agreement (DPA) template

### Backup & Security
- [ ] GitHub repository backup
- [ ] Google Drive backup
- [ ] Database backup (n8n?)
- [ ] SSL certificate monitored

---

## 📈 SUCCESS METRICS (Track Monthly)

**Website:**
- Unique visitors
- Bounce rate
- Time on site
- Conversion rate

**Marketing:**
- Email list size
- Newsletter open rate (goal: >20%)
- Social media followers
- Engagement rate

**Sales:**
- Free analysis requests
- 30-day plan sales
- 12-month roadmap sales
- Average order value

**Customer:**
- Customer satisfaction (NPS score)
- Retention rate
- Referral rate

---

## ✅ FINAL PRE-LAUNCH CHECKLIST

**Daginn fyrir launch:**

### Code & Deployment
- [ ] All code committed to Git
- [ ] Pushed to GitHub
- [ ] Netlify build successful
- [ ] No errors í browser console
- [ ] Mobile responsive test
- [ ] All links work

### Content
- [ ] Verð rétt (69.900 kr + VSK = 86.676 kr)
- [ ] Email addresses rétt (info@lioratech.is)
- [ ] Engar stafsetningarvillur
- [ ] Terms page tilbúin (`/skilmalar`)

### SEO
- [ ] Meta tags OK
- [ ] og-image.jpg uploaded
- [ ] logo.png uploaded
- [ ] Sitemap.xml accessible
- [ ] robots.txt accessible

### Analytics & Tracking
- [ ] Google Analytics tracking code
- [ ] Cookie consent banner
- [ ] Purchase tracking virkar

### Payment
- [ ] Teya credentials í Netlify
- [ ] Webhook registered í B-Online
- [ ] Test payment successful

### Backup Plan
- [ ] Old version backup (git tag)
- [ ] Rollback plan ef eitthvað fer úrskeiðis
- [ ] Contact: Netlify support, Teya support

---

## 🎊 LAUNCH DAY!

1. **Deploy á production** (Netlify automatic)
2. **Verify site is live:** https://lioratech.is
3. **Test critical paths:**
   - Homepage loads
   - /30dagaplan works
   - /greining works
   - Links work
4. **Submit to Google Search Console**
5. **Monitor first hour:**
   - No errors
   - Analytics tracking
   - Forms working
6. **Announce!** 🎉

---

## 📞 SUPPORT CONTACTS

**Teya Support:**
- Email: support@teya.com
- B-Online portal: [URL from Teya]

**Netlify:**
- Support: https://answers.netlify.com
- Status: https://netlifystatus.com

**Google:**
- Search Console Help: https://support.google.com/webmasters
- Analytics Help: https://support.google.com/analytics

**n8n:**
- Dashboard: https://lioratech.app.n8n.cloud
- Community: https://community.n8n.io

---

## 📊 SUCCESS METRICS (Week 1)

**Track these:**
- [ ] Unique visitors: _____
- [ ] Free analysis requests: _____
- [ ] 30-day plan purchases: _____
- [ ] Conversion rate: _____
- [ ] Average time on site: _____
- [ ] Bounce rate: _____

**Goals for Month 1:**
- 100+ visitors
- 5+ free analysis requests
- 1-3 paid roadmap purchases
- <60% bounce rate

---

**Síðast uppfært:** 2026-01-02
**Eftir deployment, update þetta skjal með actual timeline og results!**
