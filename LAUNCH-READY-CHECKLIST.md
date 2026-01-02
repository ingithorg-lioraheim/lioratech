# 🚀 Launch Ready Checklist - 30 Day Plan Product

**Dagsetning:** 2025-12-31
**Markmið:** Vera tilbúinn fyrir raunverulegar greiðslur

---

## ⚡ SKREF TIL AÐ VERA TILBÚINN NÚNA (< 30 mín)

### 1. Laga n8n workflow (5 mín)
- [x] Documentation búin til → **30-DAY-PAYMENT-FLOW-FIX.md**
- [ ] Opna n8n: https://lioratech.app.n8n.cloud
- [ ] Opna workflow: "30-Day Roadmap with Payment (New)"
- [ ] Finna node: "Extract OrderID from Payment"
- [ ] Skipta út code (sjá **30-DAY-PAYMENT-FLOW-FIX.md** línu 22-79)
- [ ] Vista workflow

### 2. Testa í sandbox mode (15 mín)
- [ ] Opna: http://localhost:3001 (eða https://lioratech.is)
- [ ] Fara í /30dagaplan
- [ ] Fylla út spurningalista
- [ ] Fara í payment með test korti: **4111 1111 1111 1111**
- [ ] Staðfesta að n8n execution er SUCCESS
- [ ] Staðfesta að email kemur
- [ ] Staðfesta að roadmap.md er í Google Drive

### 3. Verify Rapyd status (5 mín)
- [ ] Login: https://dashboard.rapyd.net
- [ ] Fara í Collect tab
- [ ] Check hvort þú sérð API keys
- [ ] Confirm sandbox mode er virkt

---

## 📋 NÚVERANDI STAÐA

### ✅ Hvað er TILBÚIÐ:
- ✅ Frontend (React app með öllum síðum)
- ✅ n8n workflow (þarf bara minor fix)
- ✅ Google Drive integration
- ✅ COO-Agent prompts
- ✅ Email notifications
- ✅ Rapyd sandbox account
- ✅ Payment pages og flow
- ✅ Success/Error handling

### ⚠️ Hvað þarf að LAGA:
- ⚠️ **n8n "Extract OrderID" node** - Þarf að uppfæra (5 mín fix)

### 🕒 Hvað BÍÐUR approval:
- 🕒 **Rapyd production verification** (2-5 daga wait frá Rapyd)

---

## 🎯 HVAÐ GERIST EFTIR RAPYD APPROVAL?

### Þegar Brynjar staðfestir að þú ert approved:

#### 1. Uppfæra API keys í Netlify (5 mín)
```bash
netlify env:set RAPYD_ACCESS_KEY "production_key_from_collect"
netlify env:set RAPYD_SECRET_KEY "production_secret_from_collect"
netlify env:set RAPYD_API_URL "https://api.rapyd.net"
netlify deploy --prod
```

#### 2. Testa með raunverulegri greiðslu (10 mín)
- Nota EKKI test kort
- Nota raunverulegt kort
- Test full flow með 69.900 kr
- Verify allt virkar

#### 3. GO LIVE! 🎉

---

## 🔧 TÆKNI STACK - YFIRLIT

### Frontend (Netlify)
```
lioratech.is
├── React + Vite + TypeScript
├── React Router (routes)
├── Tailwind CSS (styling)
└── Netlify Functions (backend)
    ├── create-checkout.ts → Rapyd Checkout API
    └── rapyd-webhook.ts → (not used - using n8n instead)
```

### Backend Automation (n8n)
```
lioratech.app.n8n.cloud
└── Workflow: "30-Day Roadmap with Payment (New)"
    ├── Webhook 1: Questionnaire submit
    ├── Webhook 2: Payment callback
    ├── Google Drive: File operations
    ├── Claude AI: Roadmap generation
    └── Gmail: Notifications
```

### Payment (Rapyd)
```
Rapyd Collect
├── Hosted Checkout Pages
├── ISK support
├── Metadata support (orderId)
└── Webhooks (via redirect)
```

### Storage (Google Drive)
```
LioraTech-COO/30-daga-plan/
├── pending-payment/     → Questionnaires waiting for payment
├── in-progress/         → Paid orders being processed
└── completed/           → Finished and delivered
```

---

## 💰 PRICING BREAKDOWN

| Item | Verð (án vsk) | VSK 24% | Heild |
|------|---------------|---------|-------|
| **30 daga plan** | 69.900 kr | 16.776 kr | **86.676 kr** |

### Kostnaður per pöntun:
- Claude AI API: ~300-500 kr (Haiku model)
- n8n: 0 kr (included í plan)
- Google Drive: 0 kr (free tier)
- Gmail: 0 kr
- Rapyd fees: ~2.9% + 15 kr = ~2,528 kr

**Nettó framlegð:** ~67.000 kr per pöntun (~96% margin)

---

## 📊 RAPYD COLLECT INFO (frá Brynjari)

Brynjar sagði:
> "Hér aettir þú að finna allt sem þú þarft. Þrátt fyrir að aðgangurinn sé ekki full-samþykktur þá aettir þú að hafa aðgang að þeim gögnum sem þú þarft inn á Dashboard aðganginum þínum undir liðnum **Collect**, þar aettir að vera allt lyklur sem þú þarft og slíkt."

> "Þú aettir þá í raun að geta gert allt sem þú þarft til þess að afgreiða þín megin á meðan compliance teymið fer yfir umsóknina frá ykkur."

**Þetta þýðir:**
- ✅ Þú getur notað Collect API keys NÚNA
- ✅ Þú getur testað í sandbox NÚNA
- ✅ Þú getur byggt allt NÚNA
- 🕒 Bara að bíða eftir compliance fyrir production

**Collect features sem við notum:**
- Hosted checkout pages (minimize PCI compliance)
- Metadata support (orderId tracking)
- ISK currency support
- Redirect-based flow (simplest integration)

---

## 🎨 FLOW DIAGRAM

```
USER                  FRONTEND                n8n                    GOOGLE DRIVE
│                     │                       │                      │
├─ Fills questionnaire│                       │                      │
│                     ├─ POST to n8n webhook  │                      │
│                     │                       ├─ Generate orderId    │
│                     │                       ├─ Save JSON ─────────>│ pending-payment/
│                     │<─ Return orderId      │                      │
│                     │                       │                      │
├─ Goes to payment    │                       │                      │
│                     ├─ Create Rapyd checkout│                      │
│                     │   (with orderId)      │                      │
│<─ Redirect to Rapyd │                       │                      │
│                     │                       │                      │
├─ Pays with card     │                       │                      │
│<─ Rapyd redirect ───┤                       │                      │
│                     │                       │                      │
├─ Success page       │                       │                      │
│                     ├─ POST to n8n webhook  │                      │
│                     │   (with orderId)      ├─ Find JSON file ────>│ pending-payment/
│                     │                       │<─ Download JSON ─────│
│                     │                       ├─ Move file ─────────>│ in-progress/
│                     │                       ├─ Generate roadmap    │
│                     │                       │   (Claude AI)         │
│                     │                       ├─ Save roadmap.md ───>│ in-progress/
│                     │                       ├─ Email CEO           │
│                     │<─ 200 OK              │                      │
│<─ Success message   │                       │                      │
```

---

## 🧪 TEST SCENARIOS

### Scenario 1: Happy Path ✅
1. User fills questionnaire
2. Questionnaire saved to pending-payment
3. User pays successfully
4. Webhook triggers n8n
5. Roadmap generated
6. Email sent
7. Files in correct folders

**Expected:** All green, email received, roadmap in Drive

### Scenario 2: Payment fails ❌
1. User fills questionnaire
2. User goes to payment
3. Payment FAILS (declined card)
4. User redirected to /payment-error
5. Questionnaire stays in pending-payment

**Expected:** File stays in pending-payment, user sees error page

### Scenario 3: Webhook fails 🐛
1. User fills questionnaire
2. User pays successfully
3. Webhook triggers but FAILS (n8n error)
4. n8n retry logic kicks in (if configured)
5. Manual intervention needed

**Expected:** n8n shows error, email NOT sent, manual fix needed

### Scenario 4: Duplicate payment 🔄
1. User pays once
2. Accidentally refreshes /payment-success
3. Webhook triggered TWICE
4. n8n tries to find file but it's already moved

**Expected:** Second webhook fails gracefully (file not found in pending-payment)

---

## 📞 CONTACT & SUPPORT

### Rapyd Support:
- **Brynjar Elvarsson:** brynjar@rapyd.net
- **Dashboard:** https://dashboard.rapyd.net
- **Docs:** https://docs.rapyd.net/en/rapyd-collect-363484.html

### n8n:
- **Dashboard:** https://lioratech.app.n8n.cloud
- **Workflows:** Personal project
- **Docs:** https://docs.n8n.io

### Netlify:
- **Dashboard:** https://app.netlify.com
- **Site:** lioratech.is
- **Docs:** https://docs.netlify.com

---

## ✅ FINAL CHECKLIST

**FYRIR SLEEPING Í KVÖLD:**
- [ ] n8n node lagaður
- [ ] Test payment í sandbox virkar
- [ ] Email notification confirmed
- [ ] Google Drive files confirmed
- [ ] Rapyd Collect keys accessible

**FYRIR LAUNCH (eftir Rapyd approval):**
- [ ] Production API keys settir
- [ ] Real payment test
- [ ] Monitoring setup
- [ ] Customer support ready

---

**Staða:** Ready to fix n8n and test
**ETA til production:** 2-5 dagar (waiting for Rapyd compliance)
**Confidence level:** 95% (just needs minor n8n fix)
