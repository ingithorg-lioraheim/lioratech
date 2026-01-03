# Google Analytics 4 - Professional Dashboard Setup fyrir LioraTech

## 📊 Tracking sem er núna virkt:

✅ **Page Views** - Allar síður tracked automatically
✅ **Form Submissions** - Ókeypis greining og verðtilboð
✅ **Lead Generation** - Tracking á öllum leads
✅ **CTA Clicks** - Tracking á CTA takka

---

## 🎯 Step 1: Setja upp Key Events (Conversions)

### 1.1 Opna GA4 Admin
1. Farðu á https://analytics.google.com
2. Veldu "LioraTech" property
3. Smelltu á ⚙️ **Admin** (neðst til vinstri)

### 1.2 Merkja sem "Key Events"
1. Veldu **Events** undir "Data display" (middle column)
2. Bíddu í 24 klst eftir að events byrja að koma inn
3. Þegar þú sérð þessa events, toggle "Mark as key event":
   - ✅ `generate_lead` - **MIKILVÆGAST!** (free analysis + quote)
   - ✅ `form_submit` - Form submissions
   - ✅ `purchase` - Kaup (þegar það kemur)
   - ✅ `cta_click` - CTA engagement

---

## 📈 Step 2: Búa til Custom Dashboard

### 2.1 Búa til nýtt Report
1. Farðu í **Reports** (til vinstri)
2. Smelltu á **Library** neðst
3. Smelltu á **Create new report**
4. Veldu **Blank report**

### 2.2 Bæta við þessum Cards:

#### Card 1: **Daily Conversions Overview**
- **Metric:** Key events
- **Dimension:** Event name
- **Filter:** Event name contains "lead" OR "purchase"
- **Time range:** Last 7 days

#### Card 2: **Conversion Funnel**
- **Metrics to track:**
  1. Page views (/greining) → 100%
  2. form_submit (free_analysis) → X%
  3. generate_lead → X%

- **Goal:** 5-10% conversion rate (page view → lead)

#### Card 3: **Traffic Sources**
- **Dimension:** First user source/medium
- **Metric:** Users, Key events
- **Chart type:** Pie chart
- **This tells you:** Hvaðan koma bestu leadsin?

#### Card 4: **Top Landing Pages**
- **Dimension:** Landing page
- **Metrics:** Users, Sessions, Key events
- **Filter:** Landing page contains "/greining" OR "/quote" OR "/"

#### Card 5: **Free Analysis Performance**
- **Filter:** Event name = "generate_lead" AND lead_type = "free_analysis"
- **Metrics:** Count, User count
- **Time comparison:** Compare to previous period

---

## 🎯 Step 3: Mikilvægustu Metrics að fylgjast með

### Daglega (2 mín):
```
📊 Opna GA4 Dashboard:

1. Total Users (today) → Er einhver traffic?
2. Key Events (today) → Hversu margir leads?
3. Top Channels → Hvaðan koma þeir?
```

### Vikulega (10 mín):
```
📈 Weekly Report:

1. Conversion Rate:
   - Visitors → Free Analysis: ____%
   - Visitors → Quote: ____%

2. Traffic Growth:
   - Users this week vs last week: ____%

3. Best Channels:
   - Google Organic: ____ leads
   - Facebook: ____ leads
   - Direct: ____ leads
   - LinkedIn: ____ leads

4. Page Performance:
   - Most visited: ________
   - Highest bounce rate: ________
   - Best converting: ________
```

### Mánaðarlega (30 mín):
```
📊 Monthly Analysis:

1. Total Leads:
   - Free Analysis: ____ (Goal: 85/month)
   - Quote Requests: ____

2. Conversion Funnel:
   - Visitors: ____
   - Free Analysis: ____ (___%)
   - 30-Day Plan Sales: ____ (___%)

3. Revenue:
   - Actual: ____ ISK
   - Goal: ____ ISK
   - Difference: ____

4. Channel Performance:
   - Best ROI channel: ________
   - Worst performing: ________
   - Action needed: ________
```

---

## 🎯 Conversion Goals fyrir 2026 (frá Draumaplan):

### Q1 2026 (Jan-Mar):
- **Free Analysis:** 85/month = **255 total**
- **Conversion Rate:** 20% = **51 30-day plans**
- **Revenue Goal:** 51 × 69,900 = **3.6M ISK**

### Key Metrics að tracka:
```
┌─────────────────────────────────────┐
│ WEEKLY DASHBOARD                    │
├─────────────────────────────────────┤
│ Visitors:          ____ (↑↓ __%)   │
│ Free Analysis:     ____ (↑↓ __%)   │
│ Quote Requests:    ____ (↑↓ __%)   │
│ Conv. Rate:        ____%            │
│                                      │
│ TOP CHANNELS:                        │
│ 1. _________: ____ leads            │
│ 2. _________: ____ leads            │
│ 3. _________: ____ leads            │
│                                      │
│ ON TRACK? ✅ / ⚠️ / ❌              │
└─────────────────────────────────────┘
```

---

## 🚨 Alerts að setja upp:

### Custom Alerts í GA4:
1. **Farðu í Admin → Custom alerts**
2. Búðu til þessar alerts:

#### Alert 1: Zero Conversions
- **Condition:** Key events < 1 fyrir 24 hours
- **Action:** Send email til ingi@lioratech.is
- **Why:** Ef engin lead kemur í 24h, er eitthvað að

#### Alert 2: Traffic Drop
- **Condition:** Users down 50% day-over-day
- **Action:** Send email
- **Why:** Kannski er síðan niðri eða eitthvað bilað

#### Alert 3: High Bounce Rate
- **Condition:** Bounce rate > 80%
- **Action:** Send email
- **Why:** Eitthvað er að UX eða hleðsluhraða

---

## 📱 Mobile App Setup (Optional):

### Google Analytics App
1. Sæktu **Google Analytics** app á símann
2. Skráðu þig inn
3. Veldu "LioraTech" property
4. Settu upp daily notifications

**Þá færðu dagleg update á símann!** 📲

---

## 🎯 Hvernig á að nota Analytics til að auka sölu:

### Week 1: Baseline
```
1. Skráðu niður núverandi conversion rates
2. Finndu veikustu punktinn í funnelinu
3. Settu markmið: +X% improvement
```

### Week 2-4: Test & Optimize
```
Test #1: Breyta CTA texta
- Mæla: CTR (click-through rate)
- Goal: +20% improvement

Test #2: Bæta við testimonials
- Mæla: Conversion rate
- Goal: +15% improvement

Test #3: Bæta hleðsluhraða
- Mæla: Bounce rate
- Goal: -30% bounce rate
```

### Hver vika:
```
1. Athugaðu hvað virkaði best
2. Double down á það
3. Test eitthvað nýtt
4. Repeat
```

---

## ✅ Checklist - Hvað er núna uppsett:

- [x] Google Analytics 4 uppsett (G-5MGS0GYZE3)
- [x] Page view tracking virkt
- [x] Form submission tracking bætt við
- [x] Lead generation tracking bætt við
- [x] CTA click tracking bætt við
- [ ] Key events merkt í GA4 admin (bíddu 24h)
- [ ] Custom dashboard búið til
- [ ] Weekly alerts settar upp
- [ ] Mobile app sett upp (optional)

---

## 🆘 Common Issues & Fixes:

### "Ég sé enga events í GA4"
→ **Fix:** Bíddu í 24-48 klst. GA4 tekur tíma að byrja að sýna gögn.

### "Conversion rate er of lág"
→ **Fix:** Athugaðu bounce rate og loading speed. Ef bounce rate > 70%, þá er eitthvað að UX.

### "Veit ekki hvað á að gera með gögnin"
→ **Fix:** Fylgdu Weekly Checklist í þessu skjali. Byrjaðu einfalt!

---

## 📞 Support:

Ef þú ert fastur, spurðu bara Claude Code! 🤖

```bash
# Opna terminal og spurðu:
"Claude, hjálpaðu mér að setja upp X í Google Analytics"
```

---

**Gerð:** 2026-01-03
**Version:** 1.0
**Fyrir:** LioraTech Analytics Setup
