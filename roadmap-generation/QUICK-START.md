# Quick Start Guide - 5 Minute Setup

## ⚡ Step-by-Step Setup (n8n Cloud)

### 1️⃣ Búa til n8n Cloud Account (2 mín)

1. **Farðu á:** https://n8n.io/
2. **Smelltu:** "Get started for free"
3. **Sign up með:**
   - Email: info@lioratech.is (eða þitt email)
   - Password: [veldu sterkt password]
4. **Verify email**
5. **Þú ert inni!**

---

### 2️⃣ Import Workflow (1 mín)

1. **Í n8n, smelltu:** "Add workflow" (efst til vinstri)
2. **Veldu:** "Import from File"
3. **Veldu file:**
   ```
   /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/roadmap-generation/n8n-workflow.json
   ```
4. **Imported!** ✅

Þú ættir að sjá workflow með 8 nodes.

---

### 3️⃣ Add Anthropic API Key (2 mín)

**A) Fáðu API key:**

1. Farðu á: https://console.anthropic.com/
2. Log in (eða sign up ef þú ert ekki með account)
3. Settings → API Keys
4. Create new key
5. Copy key (byrjar á `sk-ant-...`)

**B) Bæta við í n8n:**

1. Í n8n, smelltu á **"Claude API"** node í workflow
2. Smelltu á **"Create New Credential"**
3. Veldu **"HTTP Header Auth"**
4. Fylltu út:
   - **Name:** "Anthropic API Key"
   - **Header Name:** `x-api-key`
   - **Header Value:** `sk-ant-[ÞITT API KEY]`
5. **Save**

---

### 4️⃣ Add Gmail Credentials (2 mín)

1. Smelltu á **"Send Email"** node
2. Smelltu **"Create New Credential"**
3. Veldu **"Gmail OAuth2"**
4. Fylgdu leiðbeiningunum:
   - Connect Google account
   - Allow permissions
5. **Done!**

---

### 5️⃣ Activate Workflow (30 sek)

1. **Efst til hægri:** Smelltu á toggle switch til að activate
2. Þú ættir að sjá **"Active"** í grænu

---

### 6️⃣ Get Webhook URL (30 sek)

1. Smelltu á **"Webhook"** node (fyrsti node)
2. Sjáðu **"Webhook URLs"** section
3. Copy **"Production URL"**
   - Ætti að líta út eins og: `https://xxx.app.n8n.cloud/webhook/roadmap-request`

**Vistaðu þessa URL - þú þarft hana síðar!**

---

### 7️⃣ Update Website Code (1 mín)

Opnaðu `/pages/RoadmapPurchasePage.tsx` og update línu ~35:

**Núverandi:**
```typescript
const response = await fetch('https://lioratech.app.n8n.cloud/webhook-test/roadmap-request', {
```

**Breyta í:**
```typescript
const response = await fetch('https://YOUR-ACTUAL-WEBHOOK-URL', {
```

Paste inn þína webhook URL.

**Save file.**

---

### 8️⃣ TEST! (2 mín)

**Option A: Test með script**

```bash
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/roadmap-generation

# Edit test-workflow.sh - update WEBHOOK_URL
nano test-workflow.sh
# Change line 13 to your webhook URL

# Run test
./test-workflow.sh
```

**Option B: Test manually með curl**

```bash
curl -X POST https://YOUR-WEBHOOK-URL \
  -H "Content-Type: application/json" \
  -d '{
    "email": "info@lioratech.is",
    "companyName": "Test Fyrirtæki",
    "industry": "Test",
    "employees": "5",
    "currentChallenges": "Testing roadmap generation",
    "goals": "See if this works",
    "currentTools": "Excel, Email",
    "timeline": "asap"
  }'
```

**Option C: Test í gegnum website**

```bash
# Make sure dev server is running
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf
npm run dev

# Open browser
open http://localhost:3000/greining

# Fill out form and submit
```

---

### 9️⃣ Check Results! (1 mín)

**A) Check n8n execution:**
- Farðu í n8n → "Executions" tab
- Þú ættir að sjá execution með ✅ eða ❌

**B) Check email:**
- Opnaðu inbox fyrir info@lioratech.is
- Þú ættir að hafa email með subject: "🚀 Nýtt Roadmap tilbúið: Test Fyrirtæki"
- Open attachment → Review roadmap!

---

## ✅ Success!

Ef þú sérð:
1. ✅ Green execution í n8n
2. ✉️ Email í inbox
3. 📄 Roadmap í viðhengi

**ÞÁ VIRKAR ÞETTA!** 🎉

---

## 🐛 Troubleshooting

### "Webhook not found"
- Check að workflow sé activated
- Check að þú notir rétta URL
- Try deactivate/reactivate

### "Claude API error"
- Check API key er correct
- Check API credits
- Try test með minni prompt

### "Email not sent"
- Check Gmail credentials
- Check email address
- Try reconnect Gmail

### "Execution failed"
- Click á failed execution
- Sjáðu error message
- Fix og try aftur

---

## 📊 What to Check

**In email, you should see:**
- Subject: "🚀 Nýtt Roadmap tilbúið: Test Fyrirtæki"
- Body: Customer info, TODO list
- Attachment: Markdown file með roadmap

**In roadmap, you should see:**
- Executive Summary
- 30 daga plan (Day 1-30)
- Tool recommendations
- Etc.

---

## 🎯 Next Steps After Success

1. **Review roadmap quality**
   - Er það good enough?
   - Þarf að refine prompt?

2. **Test með real data**
   - Prófa með raunverulegu company example
   - See if output is better

3. **Deploy website**
   - Push changes til Netlify
   - Test í production

4. **Set up Stripe**
   - Fyrir real payments
   - Then go live!

---

## ⏱️ Total Setup Time: ~15 mínútur

- n8n signup: 2 mín
- Import workflow: 1 mín
- Add credentials: 4 mín
- Activate: 1 mín
- Update code: 1 mín
- Test: 2 mín
- Review: 4 mín

**Ready to go live!** 🚀
