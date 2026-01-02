# 30 Daga AI Roadmap - Complete Setup Guide

## 🎯 Overview

Þetta system býr sjálfkrafa til sérsniðin 30 daga AI roadmap fyrir viðskiptavini sem kaupa á `/greining`.

**Flow:**
```
Viðskiptavinur → Kaupir roadmap → Svarar spurningum → Greiðir
                                                           ↓
                                              n8n webhook móttekur data
                                                           ↓
                                              Claude API býr til roadmap
                                                           ↓
                                              Email sent með PDF/Markdown
                                                           ↓
                                              Viðskiptavinur fær roadmap
```

---

## 📁 Files í þessari möppu:

```
roadmap-generation/
├── SETUP-GUIDE.md              ← Þú ert hér!
├── README.md                   ← Technical documentation
├── prompt-template.md          ← Prompt fyrir Claude API
├── example-roadmap-output.md   ← Dæmi um output
├── pdf-template.html           ← HTML template (ef þú vilt PDF)
├── n8n-workflow.json           ← n8n workflow (import þetta)
└── test-workflow.sh            ← Test script
```

---

## 🚀 Quick Start (10 mínútur)

### Step 1: n8n Setup

**A) Búa til n8n account**
```bash
# Option 1: n8n Cloud (easiest)
# Farðu á: https://n8n.io
# Sign up for free account

# Option 2: Self-hosted (advanced)
npx n8n
```

**B) Import workflow**
1. Opnaðu n8n
2. Smelltu "Add workflow" → "Import from File"
3. Veldu `n8n-workflow.json`
4. Workflow er núna imported!

---

### Step 2: Set up Credentials

**A) Anthropic (Claude) API Key**

1. Farðu á: https://console.anthropic.com/
2. Búðu til API key
3. Í n8n:
   - Settings → Credentials
   - Add "HTTP Header Auth"
   - Name: "Anthropic API Key"
   - Header Name: `x-api-key`
   - Header Value: `sk-ant-YOUR_KEY_HERE`

**B) Gmail Account**

1. Í n8n:
   - Settings → Credentials
   - Add "Gmail OAuth2"
   - Fylgdu leiðbeiningum til að tengja Gmail

---

### Step 3: Update Webhook URL

**A) Activate workflow í n8n**
- Opnaðu workflow-ið
- Smelltu "Activate" takkann efst til hægri

**B) Fáðu webhook URL**
- Smelltu á "Webhook" node
- Copy webhook URL (t.d. `https://xxx.app.n8n.cloud/webhook/greining-request`)

**C) Uppfæra í website kóðanum**

Opnaðu `/pages/RoadmapPurchasePage.tsx`:

```typescript
// Línu ~35
const response = await fetch('https://YOUR-N8N-URL/webhook/greining-request', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

Skiptu út fyrir þína webhook URL.

---

### Step 4: Test!

**Option A: Test með script**
```bash
cd roadmap-generation
./test-workflow.sh
```

**Option B: Test manually**
```bash
curl -X POST https://YOUR-N8N-URL/webhook/greining-request \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "companyName": "Test Company",
    "industry": "Test",
    "employees": "5",
    "currentChallenges": "Testing",
    "goals": "Test goals",
    "currentTools": "Excel",
    "timeline": "asap"
  }'
```

**Option C: Test í gegnum website**
1. Farðu á `http://localhost:3000/greining`
2. Fylltu út formið
3. "Submit"
4. Athugaðu email

---

## ⚙️ Customization

### Breyta Prompt-inu

Opnaðu `prompt-template.md` og breyttu eftir þörfum.

Svo uppfærðu **"Prepare Prompt"** node í n8n með nýja prompt-inu.

### Breyta Email Template

Í n8n, opnaðu **"Prepare Email"** node og breyttu:
- Subject line
- Email body
- Calendly link

### Bæta við PDF Generation

Núna sendir workflow bara Markdown file. Ef þú vilt PDF:

**Option 1: Nota Gotenberg**
```bash
# Start Gotenberg með Docker
docker run -d -p 3000:3000 gotenberg/gotenberg:7
```

Svo bættu við **HTTP Request** node í n8n:
- URL: `http://localhost:3000/forms/chromium/convert/html`
- Method: POST
- Body: Upload `pdf-template.html` filled með data

**Option 2: Nota online service**
- ConvertAPI
- CloudConvert
- Etc.

---

## 📊 Monitoring & Analytics

### n8n Execution Log

- Farðu á "Executions" í n8n
- Sjáðu öll workflows
- Debug errors

### Success Rate

Fylgstu með:
- Hversu mörg roadmaps eru búin til
- Hversu oft tekst það
- Error rate

### Customer Feedback

Bættu við survey í email:
```
Var roadmap-ið gagnlegt?
[Já] [Nei] [Feedback]
```

---

## 💰 Costs

**Monthly (með 20 roadmaps/mán):**
- Claude API: ~$40 (20 roadmaps × $2)
- n8n: $20 (Pro plan) eða $0 (self-hosted)
- Email: $0 (Gmail)
- Total: **~$60/mán** fyrir 20 roadmaps

**Per roadmap:** ~$2-3

**Revenue per roadmap:** 49,900 kr = ~$350

**Profit margin:** ~99% 🚀

---

## 🔐 Security & Privacy

### Important:
- **NEVER** commit API keys til git
- Notaðu environment variables
- Claude API er GDPR compliant
- Gmail er öruggur
- Vistáðu gögn encrypted

### GDPR Compliance:
- Viðskiptavinir gefa consent þegar þeir kaupa
- Þú varðveitir gögn í 30 daga
- Þeir geta beðið um deletion

---

## 🐛 Troubleshooting

### "Webhook not responding"
- Check ef workflow er activated
- Check webhook URL er rétt
- Check n8n er running

### "Claude API error"
- Check API key er correct
- Check API credits
- Check quota limits

### "Email not sent"
- Check Gmail credentials
- Check "Less secure apps" setting
- Check email quota

### "Roadmap quality is bad"
- Refine prompt í `prompt-template.md`
- Add more examples
- Increase max_tokens

---

## 📈 Next Level (Optional)

### 1. Notion Integration
Vistaðu roadmaps í Notion database:
- Add "Notion" node í n8n
- Create new page per customer
- Share link með customer

### 2. Airtable Tracking
Fylgstu með öllum roadmaps:
- Customer info
- Purchase date
- Delivery status
- Follow-up call scheduled?

### 3. Slack Notifications
Fáðu notification þegar roadmap er búið til:
- Add "Slack" node
- Send to #sales channel
- "New roadmap delivered to [Company]"

### 4. Calendar Booking
Auto-schedule 20 mín follow-up:
- Integrate Calendly API
- Auto-create event
- Send invite

### 5. Stripe Webhook Integration
Þegar greiðsla tekst, trigger roadmap generation automatically.

---

## ✅ Production Checklist

Áður en þú færð þetta live:

- [ ] n8n workflow tested með real data
- [ ] Claude API key virkar
- [ ] Gmail integration virkar
- [ ] Webhook URL uppfærður í website code
- [ ] Test email sent og received
- [ ] Roadmap quality validated
- [ ] Pricing confirmed (49,900 kr + vsk)
- [ ] Calendly link correct
- [ ] Terms & conditions added
- [ ] GDPR compliance checked
- [ ] Stripe payment integration (fyrir /greining)
- [ ] Error handling tested
- [ ] Backup plan ef n8n er down

---

## 🎉 Launch Day!

Þegar allt er tilbúið:

1. **Activate workflow** í n8n
2. **Deploy website** með updated code
3. **Test purchase** frá live site
4. **Monitor** fyrstu kaupin
5. **Celebrate!** 🎊

---

## 📞 Support

Ef eitthvað kemur upp:

1. Check n8n execution log
2. Check Claude API dashboard
3. Check email logs
4. Debug með `test-workflow.sh`

Ef samt vandamál:
- n8n community: https://community.n8n.io/
- Claude docs: https://docs.anthropic.com/
- Eða email: support@lioratech.is

---

**Gangi þér vel með setup-ið!** 🚀

Ef þú þarft aðstoð, láttu mig vita!
