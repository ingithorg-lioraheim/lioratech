# 30-Day Payment Flow - Fix & Test Guide

**Dagsetning:** 2025-12-31
**Staða:** READY TO FIX

---

## 🚨 VANDAMÁLIÐ

n8n workflow fær villu: **"No orderId found in payment webhook data [line 15]"**

### Orsök:
`Extract OrderID from Payment` nodinn í n8n er ekki að finna orderID í gögnunum sem PaymentSuccessPage sendir.

---

## ✅ LAUSNIN

### Skref 1: Uppfæra n8n "Extract OrderID from Payment" node

1. Opnaðu n8n workflow: **"30-Day Roadmap with Payment (New)"**
2. Finndu nodann **"Extract OrderID from Payment"**
3. Opnaðu hann og farðu í "Code" flipann
4. **SKIPTU ÚT** öllum code með þessum nýja kóða:

```javascript
// Extract orderId from payment webhook data
// This handles multiple possible data structures

const webhookData = $input.item.json;

console.log('=== DEBUG: Full webhook data ===');
console.log(JSON.stringify(webhookData, null, 2));

// Try multiple possible paths for orderId
let orderId = null;

// Path 1: data.metadata.orderId (from PaymentSuccessPage)
if (webhookData.data?.metadata?.orderId) {
  orderId = webhookData.data.metadata.orderId;
  console.log('Found orderId in data.metadata.orderId:', orderId);
}
// Path 2: metadata.orderId (direct)
else if (webhookData.metadata?.orderId) {
  orderId = webhookData.metadata.orderId;
  console.log('Found orderId in metadata.orderId:', orderId);
}
// Path 3: body.data.metadata.orderId (wrapped in body)
else if (webhookData.body?.data?.metadata?.orderId) {
  orderId = webhookData.body.data.metadata.orderId;
  console.log('Found orderId in body.data.metadata.orderId:', orderId);
}
// Path 4: Direct orderId field
else if (webhookData.orderId) {
  orderId = webhookData.orderId;
  console.log('Found orderId directly:', orderId);
}

if (!orderId) {
  console.error('=== ERROR: No orderId found ===');
  console.error('Available keys:', Object.keys(webhookData));
  throw new Error('No orderId found in payment webhook data. Check logs for structure.');
}

console.log('=== SUCCESS: OrderID extracted ===');
console.log('OrderID:', orderId);

// Extract other payment data
const paymentData = webhookData.data || webhookData;

return {
  json: {
    orderId: orderId,
    paymentId: paymentData.id || 'unknown',
    paymentStatus: paymentData.status || 'unknown',
    amount: paymentData.amount || 0,
    currency: paymentData.currency || 'ISK',
    paymentDate: new Date().toISOString(),
    rawData: webhookData // Keep raw data for debugging
  }
};
```

5. **Vista** (Save) nodann
6. **Vista** (Save) workflowið

---

## 🧪 TESTA FLÆÐIÐ (SANDBOX MODE)

### FORSENDUR:
- ✅ n8n workflow er virkt (Active)
- ✅ Frontend er deployed á Netlify eða keyrir locally
- ✅ Rapyd er í Sandbox mode
- ✅ Test kort: **4111 1111 1111 1111**

### FULLT TEST FLOW:

#### 1. Byrja á forsíðu
- Opna: https://lioratech.is eða http://localhost:3001

#### 2. Smelltu "Fá 30 daga plan"
- Route: `/30dagaplan`
- Smelltu "Panta núna"

#### 3. Fyltu út spurningalista
- Route: `/30dagaplan/questionnaire`
- Fylla út öll required fields
- Smelltu "Halda áfram í greiðslu"
- **✅ Checkpoint:** Þú ættir að fá orderId í response (skoða í network tab)

#### 4. Greiðslusíða
- Route: `/30dagaplan/payment?orderId=AI-2025-12-31-ABC123`
- Fylla út nafn, netfang, fyrirtæki
- Smelltu "Halda áfram í greiðslu"
- **✅ Checkpoint:** Þú verður redirected á Rapyd checkout page

#### 5. Rapyd Checkout (Sandbox)
- Nota test kort: **4111 1111 1111 1111**
- CVV: **123**
- Expiry: **12/27**
- Name: Any name
- Smelltu "Pay"

#### 6. Success Redirect
- Route: `/payment-success?orderId=AI-2025-12-31-ABC123&checkout=checkout_xxx`
- PaymentSuccessPage trigger n8n webhook
- **✅ Checkpoint:** Skoða n8n executions - ætti að vera SUCCESS

#### 7. n8n Workflow Execution
Skoða í n8n:
- **Webhook - Payment Callback:** ✅ Fékk data
- **Extract OrderID from Payment:** ✅ Fann orderId
- **HTTP - Search Questionnaire File:** ✅ Fann JSON file
- **Download Questionnaire:** ✅ Downloaded
- **Parse Questionnaire JSON:** ✅ Parsed
- **Move to in-progress:** ✅ Moved file
- **Build Master Prompt:** ✅ Built prompts
- **AI Agent 1 & 2:** ✅ Generated content
- **Merge & Combine:** ✅ Combined
- **Save Roadmap to Drive:** ✅ Saved MD file
- **Email Notification:** ✅ Sent email

#### 8. Staðfesta árangur
- **Email:** ingi@lioratech.is fékk email
- **Google Drive:** in-progress mappa hefur `AI-YYYY-MM-DD-XXXXXX-CompanyName.md`
- **Success page:** Notandi sér success message

---

## 🐛 DEBUGGING

### Ef n8n workflow failar:

#### 1. Skoða webhook data
- Opna failed execution
- Skoða "Webhook - Payment Callback" node output
- Copy JSON data úr "Output" tab
- Athuga structure:
  ```json
  {
    "data": {
      "metadata": {
        "orderId": "AI-..."
      },
      "id": "checkout_...",
      "status": "CLO",
      "amount": 69900,
      "currency": "ISK"
    }
  }
  ```

#### 2. Athuga Extract OrderID logs
- Opna "Extract OrderID from Payment" node
- Skoða "Executions" tab
- Check console.log outputs
- Ætti að sjá: `Found orderId in data.metadata.orderId: AI-...`

#### 3. Ef orderId finnst ekki
- Athuga hvort PaymentSuccessPage er að senda rétt
- Skoða browser Network tab
- Check webhook POST body
- Verify structure matches expected format

#### 4. Algeng vandamál:

**Vandamál:** "Questionnaire file not found"
- **Orsök:** orderId match-ar ekki file name
- **Lausn:** Athuga að orderId í URL sé nákvæmlega það sama og file name

**Vandamál:** "No binary data found from Download Questionnaire"
- **Orsök:** Google Drive download failaði
- **Lausn:** Check Google Drive credentials, verify file exists

**Vandamál:** AI Agent timeout
- **Orsök:** Prompts eru of stórir eða Claude API er slow
- **Lausn:** Breyta í Haiku model eða minnka prompt size

---

## 📊 GOOGLE DRIVE FOLDER STRUCTURE

```
LioraTech-COO/
└── 30-daga-plan/
    ├── pending-payment/        (ID: 1vRP5yGFdvUZnY2DjSgIivSLywoJS2n-6)
    │   └── AI-2025-12-31-ABC123-questionnaire.json
    ├── in-progress/            (ID: 1JVZf9s80Eyo3HOZY-SvFNG_HeG_D6eqN)
    │   ├── AI-2025-12-31-ABC123-questionnaire.json (moved from pending)
    │   └── AI-2025-12-31-ABC123-CompanyName.md (generated roadmap)
    └── completed/              (ID: 1IwgBvSwQqHeswhpwfjlhcIAuMAB5L_hh)
        └── (manual move after sending to customer)
```

---

## 🚀 PRODUCTION READINESS

### Þegar Rapyd er approved:

#### 1. Uppfæra Rapyd keys
```bash
# .env
RAPYD_ACCESS_KEY=<production_key>
RAPYD_SECRET_KEY=<production_secret>
RAPYD_API_URL=https://api.rapyd.net
```

#### 2. Deploy til Netlify
```bash
netlify env:set RAPYD_ACCESS_KEY "prod_key_here"
netlify env:set RAPYD_SECRET_KEY "prod_secret_here"
netlify deploy --prod
```

#### 3. Verify webhooks
- Rapyd dashboard → Webhooks
- Verify URL: `https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback`
- Events: `PAYMENT_COMPLETED`, `PAYMENT_FAILED`

#### 4. Test með raunverulegu korti
- Nota EKKI test kort
- Lítil upphæð first (69.900 kr)
- Verify full flow virkar

---

## ✅ CHECKLIST FYRIR LAUNCH

- [ ] n8n "Extract OrderID" node uppfærður
- [ ] n8n workflow tested í sandbox
- [ ] Frontend deployed á Netlify
- [ ] Environment variables settir
- [ ] Google Drive folders rétt uppsettir
- [ ] Email notification virkar
- [ ] Rapyd Collect setup reviewed
- [ ] Test payment flow successful
- [ ] Production Rapyd keys settir (eftir approval)
- [ ] Real payment test í production
- [ ] Monitoring setup (check n8n executions daily)

---

## 📞 SUPPORT

Ef eitthvað fer úrskeiðis:

1. **Skoða n8n executions:** https://lioratech.app.n8n.cloud
2. **Check email:** ingi@lioratech.is fyrir notifications
3. **Google Drive:** https://drive.google.com/drive/folders/1JVZf9s80Eyo3HOZY-SvFNG_HeG_D6eqN
4. **Rapyd logs:** https://dashboard.rapyd.net

**Emergency:** Ef workflow er að faila, deactivate það tímabundið til að stoppa errors.

---

**Búið til:** 2025-12-31
**Síðast uppfært:** 2025-12-31
**Staða:** Ready for implementation
