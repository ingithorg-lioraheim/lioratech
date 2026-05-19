# Teya Payment Gateway - Setup Guide

**Dagsetning:** 2026-01-02
**Staða:** TILBÚIÐ TIL AÐ DEPLOYA (bíður eftir credentials)

---

## ✅ Hvað hefur verið gert?

### 1. **Kóði tilbúinn**
- ✅ `/netlify/functions/utils/teya.ts` - Teya API wrapper
- ✅ `/netlify/functions/create-checkout.ts` - Uppfært fyrir Teya
- ✅ `/netlify/functions/teya-webhook.ts` - Webhook handler fyrir Teya
- ✅ `.env.example` - Uppfært með Teya environment variables

### 2. **Hvað vantar?**
- ⏳ Teya API credentials (Private/Public tokens)
- ⏳ Webhook URL skráð í B-Online
- ⏳ Test payment til að staðfesta

---

## 📋 Næstu skref þegar þú færð credentials frá Teya

### Skref 1: Fá credentials frá Teya/B-Online

Þegar Teya samþykkir umsóknina þína, færðu aðgang að **B-Online** portal.

Þaðan færðu:
- **Private Access Token** (fyrir API calls)
- **Public Access Token** (optional)
- **Merchant ID** (ef við þurfum hann)

### Skref 2: Setja upp Environment Variables

#### A. Local Development (.env)

Búðu til `.env` skrá í rót verkefnisins:

```bash
# Copy example file
cp .env.example .env
```

Fylltu inn credentials:

```bash
# Teya API Tokens
TEYA_PRIVATE_TOKEN=<þinn private token frá B-Online>
TEYA_PUBLIC_TOKEN=<þinn public token frá B-Online>

# Test mode fyrst
TEYA_ENVIRONMENT=test
TEYA_BASE_URL=https://test.borgun.is/rpgapi

# n8n webhook (núverandi)
N8N_ROADMAP_WEBHOOK=https://lioratech.app.n8n.cloud/webhook/roadmap-request

# Site URL
URL=https://lioratech.is
```

#### B. Netlify Environment Variables

Setja sama credentials í Netlify:

1. Fara á https://app.netlify.com
2. Velja LioraTech site
3. Site Settings → Environment Variables
4. Bæta við:
   - `TEYA_PRIVATE_TOKEN`
   - `TEYA_PUBLIC_TOKEN`
   - `TEYA_ENVIRONMENT` = `test`
   - `TEYA_BASE_URL` = `https://test.borgun.is/rpgapi`
   - `N8N_ROADMAP_WEBHOOK` (ef ekki nú þegar)
   - `URL` = `https://lioratech.is`

5. **MIKILVÆGT:** Redeploy site eftir að variables eru sett

---

### Skref 3: Skrá Webhook URL í B-Online

1. Fara í **B-Online** portal (Teya merchant dashboard)
2. Navigate til **Webhooks** eða **Notifications**
3. Bæta við nýjum webhook:

   ```
   Webhook URL: https://lioratech.is/.netlify/functions/teya-webhook
   Event Type: PaymentCreate
   SSL: Required (við höfum SSL á lioratech.is)
   ```

4. Vista webhook

**Athugið:** Teya krefst SSL (HTTPS) fyrir webhooks - við erum með það ✅

---

### Skref 4: Deploy á Netlify

```bash
# Commit changes
git add .
git commit -m "Add Teya payment integration"

# Push to GitHub (triggers Netlify deploy)
git push origin main
```

Netlify mun automatically:
1. Detecta breytingarnar
2. Builda verkefnið
3. Deploya með nýjum environment variables
4. Netlify functions verða live

---

### Skref 5: Prófa Payment Flow í Test Mode

#### Test Flow:

1. **Fara á:** https://lioratech.is/30dagaplan
2. **Smella:** "Panta núna"
3. **Fylla út spurningalista** → Fá orderId
4. **Greiðslusíða** → Fylla út upplýsingar
5. **Smella "Halda áfram í greiðslu"**
6. **Redirected til Teya hosted page**
7. **Nota test kort** (Teya mun gefa þér test card numbers)
8. **Complete payment**
9. **Redirected til:** `/payment-success?orderId=AI-xxx`
10. **Webhook er send til** → `/.netlify/functions/teya-webhook`
11. **Webhook trigger-ar** → n8n → COO-Agent

#### Staðfesta árangur:

**Athuga Netlify Function Logs:**
```
1. Netlify Dashboard → Functions
2. Smelltu á "teya-webhook"
3. Skoða logs - ætti að sjá:
   - "Teya webhook received"
   - "Webhook verified successfully"
   - "Payment successful"
   - "COO-Agent triggered successfully"
```

**Athuga n8n:**
```
1. Fara á https://lioratech.app.n8n.cloud
2. Workflows → "30-Day Roadmap with Payment"
3. Executions → Nýjasta execution
4. Ætti að vera SUCCESS
```

**Athuga Google Drive:**
```
Pending-payment → in-progress mappa
Roadmap MD file búið til
```

---

## 🧪 Test Cards frá Teya

Þegar þú ert í **test mode**, mun Teya gefa þér test kort.

Dæmigert test kort format:
```
Card Number: [Teya mun gefa þér þetta]
CVV: 123
Expiry: 12/27 (eða eitthvað í framtíðinni)
Name: Test User
```

**Hafðu samband við Teya support** til að fá test card numbers.

---

## 🚀 Production Deployment

Þegar test er successful og þú ert tilbúinn fyrir production:

### 1. Fá Production Credentials

Hjá Teya/B-Online:
- Switch frá test → production environment
- Fá nýja production tokens

### 2. Uppfæra Environment Variables

**Netlify:**
```bash
TEYA_ENVIRONMENT=production
TEYA_BASE_URL=https://api.borgun.is/rpgapi  # (eða það sem Teya gefur þér)
TEYA_PRIVATE_TOKEN=<production token>
TEYA_PUBLIC_TOKEN=<production token>
```

**Local .env** (fyrir testing):
```bash
# Haltu test credentials líka til að geta prófað
# En nota production í Netlify
```

### 3. Uppfæra Webhook í B-Online

Staðfesta að webhook URL sé rétt:
```
https://lioratech.is/.netlify/functions/teya-webhook
```

### 4. Test með alvöru korti

- Prófa með raunverulegu korti (lítil upphæð fyrst)
- Staðfesta að allt flæðið virki
- Athuga email notification
- Staðfesta roadmap generation

---

## 📊 Verkflæði (Full Payment Flow)

```
Notandi → /30dagaplan
    ↓
Spurningalisti → Google Drive (pending-payment/)
    ↓
Payment síða → /.netlify/functions/create-checkout
    ↓
Teya API → createPayment() → Payment URL
    ↓
Redirect til Teya hosted page
    ↓
Notandi greiðir (Teya handles card processing)
    ↓
Teya sendir webhook → /.netlify/functions/teya-webhook
    ↓
Verify webhook → teya.verifyWebhookEvent()
    ↓
Trigger n8n → N8N_ROADMAP_WEBHOOK
    ↓
n8n workflow:
  - Download questionnaire JSON frá Drive
  - Move file: pending-payment/ → in-progress/
  - Generate roadmap með COO-Agent (Claude API)
  - Save MD file til Drive
  - Send email notification
    ↓
Notandi fær email innan 24 klst ✅
```

---

## 🔧 Debugging

### Netlify Function Logs

```
Netlify Dashboard → Functions → teya-webhook → View logs
```

Common log messages:
- ✅ "Teya webhook received" → Webhook kom í gegn
- ✅ "Webhook verified successfully" → Webhook er authentic
- ✅ "Payment successful" → Greiðsla tókst
- ✅ "COO-Agent triggered successfully" → n8n fékk data
- ❌ "Webhook verification failed" → Invalid webhook (possible fraud)
- ❌ "Failed to trigger n8n workflow" → n8n vandamál

### Common Issues

**Issue:** "Teya Private Token not configured"
- **Fix:** Athuga að environment variables séu settir í Netlify
- Redeploy site eftir að setja variables

**Issue:** "Webhook verification failed"
- **Fix:** Athuga að webhook sé skráður rétt í B-Online
- Verify að webhook URL sé nákvæmlega: `https://lioratech.is/.netlify/functions/teya-webhook`

**Issue:** "Failed to trigger n8n workflow"
- **Fix:** Athuga að n8n workflow sé ACTIVE
- Verify N8N_ROADMAP_WEBHOOK URL er rétt

**Issue:** Payment virkar en enginn roadmap
- **Fix:** Athuga n8n execution logs
- Verify Google Drive permissions
- Check COO-Agent error logs

---

## 📞 Support

### Teya Support
- Email: support@teya.com
- B-Online portal: [login URL frá Teya]
- Docs: https://docs.borgun.is/paymentgateways/bapi/rpg/

### Internal
- n8n: https://lioratech.app.n8n.cloud
- Google Drive: https://drive.google.com/drive/folders/[your folder ID]
- Netlify: https://app.netlify.com

---

## ✅ Checklist

- [ ] Fá credentials frá Teya (Private/Public tokens)
- [ ] Setja environment variables í Netlify
- [ ] Setja environment variables í local .env
- [ ] Skrá webhook URL í B-Online
- [ ] Deploy á Netlify
- [ ] Prófa test payment flow
- [ ] Staðfesta webhook virkar
- [ ] Staðfesta n8n trigger
- [ ] Staðfesta roadmap generation
- [ ] Prófa með production credentials
- [ ] Test með alvöru korti
- [ ] Go live! 🚀

---

**Búið til:** 2026-01-02
**Status:** Ready to deploy (awaiting Teya credentials)
**Next:** Wait for Teya approval email með API tokens
