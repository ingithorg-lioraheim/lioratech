# Teya (Saltpay) Payment Gateway - Setup Documentation

**Dagsetning:** 2026-01-05
**Fyrirtæki:** Lioraheim ehf.
**Vefsíða:** www.lioratech.is
**Samningsnúmer:** 5135296
**Tengiliður Teya:** Magnús Benediktsson (hjalp@teya.is, 560-1600)

---

## 📋 Staða

**Teya Account:**
- ✅ Vefsamningur stofnaður (Samningur #5135296)
- ✅ Áreiðanleikakönnun lokið
- ⏳ Bíður eftir verification staðfestingu
- ⏳ Production endpoint URL (fæst eftir verification)

**Implementation:**
- ✅ Backend functions búnar (create-payment-form, payment-callback)
- ✅ Frontend pages uppfærðar (Payment, Success, Error)
- ✅ n8n integration matching workflow format
- ✅ HMAC-SHA256 signature implementation
- ✅ OrderHash validation
- ✅ GA4 purchase tracking
- ✅ COO agent integration
- ✅ Built og deployed til Netlify
- ✅ **Netlify Environment Variables configured (12 variables)**
- ⏳ **Testing með test korti (NÆSTA SKREF)**

⚠️ **MIKILVÆGT:** Uppgjör eru EKKI greidd fyrr en verification er samþykkt.

---

## 🔑 Credentials

### Prófunarumhverfi (Test)

**Hosted Payment Page (SecurePay):**
- SecretKey: `cdedfbb6ecab4a4994ac880144dd92dc`

**Payment Gateway (RPG):**
- Public Key: `891451_puZw2H22X7Wcf5ErHxDmOmr1XlnlG6OhZn`
- Private Key: `856293_pr0lxnW8PG1SeCwVJ3WPH0lXCeU0/sYLtX`

**Test Kort:**
- Kortanúmer: `4176 6699 9900 0104`
- Gildistími: `12/31`
- CVC: `012`
- ⚠️ Athugið: Virkar EKKI með 3DS. Þarf raunkort til að prófa 3D Secure.

---

### Raunumhverfi (Production)

**VendorID/GatewayID:** `97601`
**MerchantID:** `5135296`
**SecretKey:** `8b22f5be7648db800c56f0ba2e109a68`

**Payment Gateway (RPG):**
- Public Key: `931896_puP4ZhX2RsBszmKpN9jlHTAaRBpRQOb2j1`
- Private Key: `612575_prc/xQEjOGNoYhVS101RjqXSax/iOjSXuW`

---

## 🌐 Endpoint URLs

### Prófunarumhverfi (Test)

**Hosted Payment Page:**
```
https://test.borgun.is/SecurePay/default.aspx
```

**RPG API:**
```
https://test.borgun.is/rpgapi/
```

**3D Secure MPI:**
```
POST https://test.borgun.is/rpgapi/api/mpi/v2/enrollment
POST https://test.borgun.is/rpgapi/api/mpi/v2/validation
```

**Payment Authorization:**
```
POST https://test.borgun.is/rpgapi/api/payment
```

---

### Raunumhverfi (Production)

⏳ **Vantar ennþá - verður sent eftir verification**

**Hvernig á að fá:**
- Sendu póst á: `greidslusida@borgun.is`
- Eða spyrðu Magnús beint

---

## 🛠️ Integration Aðferð - VALIÐ

**Notum: Hosted Payment Page (SecurePay)** ✅

### Ástæður:
1. ✅ Hraðari time-to-market (1-2 dagar)
2. ✅ Teya sér um PCI compliance
3. ✅ 3D Secure virkar automatically
4. ✅ Minni security áhætta
5. ✅ Best fyrir fyrsta útgáfu

### Annað valkostur (ekki notað):
- RPG API (Custom Payment Form) - flóknara, krefst PCI compliance

---

## 📝 Implementation Plan

### Phase 1: Test Environment (NÚNA)

**Backend (Netlify Functions):**
1. `netlify/functions/create-payment.ts`
   - Tekur við order data
   - Býr til HMAC-SHA256 signature
   - Skilar form data fyrir redirect

2. `netlify/functions/payment-callback.ts`
   - Tekur við staðfestingu frá Teya (returnurlsuccessserver)
   - Validates orderhash
   - Sendir pöntun í COO agent
   - Skilar: `<PaymentNotification>Accepted</PaymentNotification>`

**Frontend (React):**
1. `/30dagaplan/payment` - Payment síða
   - Sýnir order summary (69.900 kr)
   - Form sem POST-ar til Teya SecurePay
   - Auto-submit með JavaScript

2. `/payment-success` - Success callback
   - Takk fyrir message
   - Confirmation details
   - Track GA4 purchase event

3. `/payment-error` - Error callback
   - Error message
   - "Reyna aftur" takki

### Phase 2: Production (Eftir verification)

**MIKILVÆGT: Þetta er EINFALT - bara 2 variables!**

#### Skref 1: Fá Production Endpoint URL
- Sendu email á: `Inbound@teya.com` eða `greidslusida@borgun.is`
- Spurðu: "Hvernig er production endpoint URL fyrir SecurePay?"
- Þú færð URL á forminu: `https://[something].borgun.is/SecurePay/default.aspx`

#### Skref 2: Uppfæra Netlify Environment Variables
Farðu í Netlify Dashboard → Project Settings → Environment Variables

**Breyta BARA 2 VARIABLES:**

1. **VITE_TEYA_MODE**
   - Núverandi value: `test`
   - Nýtt value: `production`

2. **VITE_TEYA_PROD_ENDPOINT**
   - Núverandi value: `PENDING_VERIFICATION`
   - Nýtt value: `[URL sem þú fékkst frá Teya]`

**ALLT ANNAÐ ER ÞEGAR RÉTT!**
- Production credentials eru already configured
- Callback URLs eru already réttir
- n8n webhook er already rétt

#### Skref 3: Testing
1. ✅ Netlify mun auto-redeploy eftir að þú vistar
2. ✅ Gera test transaction með raunkorti
3. ✅ Staðfesta að uppgjör birtist í Teya portal
4. ✅ Bakfæra test transaction (ef þú vilt)
5. ✅ **PRODUCTION LIVE!**

---

## 🔒 Security - HMAC-SHA256

### CheckHash Creation (Merchant → Teya)

**Message format:**
```
MerchantId|ReturnUrlSuccess|ReturnUrlSuccessServer|OrderId|Amount|Currency
```

**Dæmi:**
```
5135296|https://lioratech.is/payment-success|https://lioratech.is/.netlify/functions/payment-callback|ORDER123|69900|ISK
```

**Apply HMAC-SHA256 með SecretKey**

### OrderHash Verification (Teya → Merchant)

**Message format:**
```
OrderId|Amount|Currency
```

**Validate með SecretKey til að koma í veg fyrir fraud**

---

## 📊 Required Parameters

### Merchant → Payment Page (POST)

| Parameter | Value fyrir 30-day roadmap |
|-----------|---------------------------|
| `merchantid` | `5135296` (production) |
| `paymentgatewayid` | `97601` (production) |
| `orderid` | Unique 12 char (t.d. `30D-20260105-ABC`) |
| `amount` | `69900` (ISK með 2 decimals = 69900.00) |
| `currency` | `ISK` |
| `language` | `IS` |
| `returnurlsuccess` | `https://lioratech.is/payment-success` |
| `returnurlsuccessserver` | `https://lioratech.is/.netlify/functions/payment-callback` |
| `returnurlcancel` | `https://lioratech.is/payment-error?status=cancel` |
| `returnurlerror` | `https://lioratech.is/payment-error?status=error` |
| `checkhash` | HMAC-SHA256 signature |
| `itemdescription_0` | `30 daga AI roadmap fyrir [Fyrirtæki]` |
| `itemcount_0` | `1` |
| `itemunitamount_0` | `69900` |
| `itemamount_0` | `69900` |

### Optional (notum):
- `skipreceiptpage` = `1` (skip Teya receipt, redirect beint)
- `buyername` = nafn úr questionnaire
- `buyeremail` = email úr questionnaire

---

## 🧪 Testing Checklist

### Test Environment
- [ ] POST til test endpoint virkar
- [ ] HMAC signature er rétt
- [ ] Test kortið virkar
- [ ] Success callback fær gögn rétt
- [ ] Server callback validates orderhash
- [ ] COO agent fær pöntun
- [ ] Error handling virkar

### Production (eftir verification)
- [ ] Production endpoint URL fengið
- [ ] Credentials uppfærð í .env
- [ ] Test transaction í production
- [ ] Staðfest að uppgjör birtist í Teya portal
- [ ] Bakfært test transaction
- [ ] Live test með raunkorti

---

## 📚 Documentation Links

**Teya/Borgun Docs:**
- Hosted Payments: https://docs.borgun.is/hostedpayments/securepay/
- Payment Gateway API: https://docs.borgun.is/paymentgateways/bapi/
- 3D Secure: https://docs.borgun.is/paymentgateways/bapi/rpg/3dsecure.html

**Teya Support:**
- Portal: https://business.teya.com
- Email: Inbound@teya.com
- Símanúmer: 560-1600
- Netspjall: business.teya.com

---

## 🚨 Mikilvægar Athugasemdir

### 1. 3D Secure - SKYLDA
- Greiðslugáttin VERÐUR að vera tengd við 3D Secure
- Teya gerir þetta automatically fyrir SecurePay
- Engar tæknilegar breytingar nauðsynlegar

### 2. ISK Currency
- Amount í ISK með 2 decimals: 69.900 kr = `69900`
- RPG notar exponent 2, MPI notar exponent 0

### 3. OrderID Format
- Max 12 alphanumeric characters
- EKKI extended characters (áéíóú)
- Mælt með: `30D-YYYYMMDD-XXX` (t.d. `30D20260105ABC`)

### 4. Server Callback CRITICAL
- **VERÐUR** að validate orderhash
- Prevents fraud attempts
- Skilar XML: `<PaymentNotification>Accepted</PaymentNotification>`

### 5. Uppgjör
- Uppgjör greidd EKKI fyrr en verification samþykkt
- Teya getur tekið 1-3 virka daga að settle funds
- Sjá uppgjör í Teya portal: Settlements

---

## 🎯 Business Flow

### 30 Daga Roadmap Kaup:

1. **Viðskiptavinur** → Fyllir út questionnaire á `/30dagaplan/questionnaire`
2. **Redirect** → `/30dagaplan/payment`
3. **Payment síða** → Sýnir order (69.900 kr), POST til Teya
4. **Teya** → Kortaform, 3D Secure, payment processing
5. **Success** → Teya POST til `payment-callback` function
6. **Callback** → Validates, sendir til COO agent, skilar Accepted
7. **Redirect** → Viðskiptavinur sér `/payment-success`
8. **COO Agent** → Býr til 30-day roadmap PDF, sendir email

---

## 💾 Environment Variables

### Local Development (.env file)

```bash
# Teya Payment Gateway - Test
TEYA_TEST_MERCHANT_ID=test_merchant_id
TEYA_TEST_SECRET_KEY=cdedfbb6ecab4a4994ac880144dd92dc

# Teya Payment Gateway - Production
TEYA_MERCHANT_ID=5135296
TEYA_GATEWAY_ID=97601
TEYA_SECRET_KEY=8b22f5be7648db800c56f0ba2e109a68

# Teya Endpoints
VITE_TEYA_TEST_ENDPOINT=https://test.borgun.is/SecurePay/default.aspx
VITE_TEYA_PROD_ENDPOINT=[VANTAR - fæst eftir verification]

# Callback URLs
VITE_PAYMENT_SUCCESS_URL=https://lioratech.is/payment-success
VITE_PAYMENT_ERROR_URL=https://lioratech.is/payment-error
VITE_PAYMENT_CALLBACK_URL=https://lioratech.is/.netlify/functions/payment-callback

# n8n Webhook
N8N_ROADMAP_WEBHOOK=https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback

# Mode
VITE_TEYA_MODE=test  # Skipta í 'production' þegar live
```

### Netlify Dashboard (Production - CONFIGURED ✅)

**Staðsetning:** Netlify Dashboard → Project Settings → Environment Variables

✅ **Öll 12 variables configured (2026-01-05):**

1. `N8N_ROADMAP_WEBHOOK` = `https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback`
2. `TEYA_GATEWAY_ID` = `97601`
3. `TEYA_MERCHANT_ID` = `5135296`
4. `TEYA_SECRET_KEY` = `8b22f5be7648db800c56f0ba2e109a68`
5. `TEYA_TEST_MERCHANT_ID` = `test_merchant_id`
6. `TEYA_TEST_SECRET_KEY` = `cdedfbb6ecab4a4994ac880144dd92dc`
7. `VITE_PAYMENT_CALLBACK_URL` = `https://lioratech.is/.netlify/functions/payment-callback`
8. `VITE_PAYMENT_ERROR_URL` = `https://lioratech.is/payment-error`
9. `VITE_PAYMENT_SUCCESS_URL` = `https://lioratech.is/payment-success`
10. `VITE_TEYA_MODE` = `test` ⚠️ **BREYTA Í 'production' ÞEGAR LIVE**
11. `VITE_TEYA_PROD_ENDPOINT` = `PENDING_VERIFICATION` ⚠️ **UPPFÆRA ÞEGAR FENGIÐ FRÁ TEYA**
12. `VITE_TEYA_TEST_ENDPOINT` = `https://test.borgun.is/SecurePay/default.aspx`

**Athugasemd um URL variable:**
- Netlify blokkerar að búa til `URL` variable (reserved)
- Þetta er EKKI vandamál - kóðinn hefur fallback: `process.env.URL || 'https://lioratech.is'`
- Explicit callback URLs eru already configured

---

## 📞 Ef Vandamál Koma Upp

### Error: "Cannot settle funds"
→ Áreiðanleikakönnun ekki lokið eða ekki samþykkt

### Error: "Invalid signature"
→ HMAC-SHA256 checkhash er rangt - athugaðu SecretKey og message format

### Error: "Cannot access endpoint"
→ Ef production: Verification ekki lokið ennþá

### Test kort virkar ekki
→ Athugaðu að þú sért að nota test endpoint, ekki production

### 3D Secure virkar ekki í test
→ Test kortið styður ekki 3DS - þarf raunkort til að prófa

---

---

## ✅ **IMPLEMENTATION STATUS (2026-01-05)**

### **Completed:**

**Backend (Netlify Functions):**
- ✅ `netlify/functions/create-payment-form.ts`
  - Generates HMAC-SHA256 signed form data
  - Returns all fields needed for SecurePay POST
  - Uses test credentials from .env

- ✅ `netlify/functions/payment-callback.ts`
  - Validates orderhash with HMAC-SHA256
  - Sends data to n8n in correct format
  - Returns XML response to Teya
  - Fraud prevention via signature validation

- ✅ `netlify/functions/utils/securepay.ts`
  - HMAC-SHA256 signature generation
  - OrderHash validation
  - Order ID generation (30D-YYYYMMDD-XXX format)
  - Amount formatting for ISK

**Frontend (React Pages):**
- ✅ `pages/ThirtyDayRoadmapPaymentPage.tsx`
  - Calls create-payment-form function
  - Creates hidden form with signed data
  - Auto-submits to Teya SecurePay
  - Shows 86.676 kr total (with VSK)

- ✅ `pages/PaymentSuccessPage.tsx`
  - Tracks GA4 purchase event
  - Shows success message
  - COO trigger handled by payment-callback

- ✅ `pages/PaymentErrorPage.tsx`
  - Error handling for failed payments
  - Retry button links to /30dagaplan/payment

**Integration:**
- ✅ n8n webhook URL: `/30-day-payment-callback`
- ✅ Data format matches n8n workflow expectations
- ✅ OrderID extracted from `data.metadata.orderId`
- ✅ Backward compatible with root `orderId` field

**Git Commits:**
1. `feat: Implement Teya SecurePay payment integration`
2. `fix: Match n8n workflow data format for payment callback`

### **Testing Checklist:**

- [ ] 1. Navigate to https://lioratech.is/30dagaplan/payment
- [ ] 2. Fill out payment form
- [ ] 3. Verify redirect to Teya test environment
- [ ] 4. Enter test card: 4176 6699 9900 0104, 12/31, 012
- [ ] 5. Complete payment
- [ ] 6. Verify redirect to /payment-success
- [ ] 7. Check browser console for GA4 purchase event
- [ ] 8. Check n8n executions for triggered workflow
- [ ] 9. Check Google Drive for questionnaire file
- [ ] 10. Check Google Drive for generated roadmap

### **Known Issues:**

1. **Test card does not support 3D Secure**
   - Workaround: Use real card for 3DS testing
   - Impact: Cannot test full payment flow with test card

2. **Production endpoint URL not yet received**
   - Status: Waiting for Teya verification completion
   - Action: Contact Inbound@teya.com when ready

### **Next Steps After Testing:**

1. **If tests pass:**
   - Mark testing complete
   - Wait for Teya verification
   - Get production endpoint URL
   - Switch to production mode

2. **If tests fail:**
   - Check browser console for errors
   - Check Netlify function logs
   - Check n8n execution logs
   - Debug and fix issues

---

## 🐛 **DEBUGGING SESSION (2026-01-05 14:30-15:00)**

### **Issue: Teya error "Innsend gögn eru ekki rétt formúð" (Error Code 1)**

**Problem discovered:**
User tested payment flow and Teya rejected with error:
```
status: ERROR
errorcode: 1
errordescription: Innsend gögn eru ekki rétt formúð
```

**Root causes found and fixed:**

1. **Fix #1: `paymentgatewayid` in test mode** (Commit: `0e3ba47`)
   - **Problem:** Was sending `paymentgatewayid: 'test_gateway_id'` (invalid placeholder)
   - **Solution:** Changed to empty string `''` for test mode
   - **File:** `netlify/functions/utils/securepay.ts` line 102
   - **Change:** `process.env.TEYA_TEST_GATEWAY_ID || ''`

2. **Fix #2: `merchantid` in test mode** (Commit: `6127a64`)
   - **Problem:** Was sending `merchantid: 'test_merchant_id'` (invalid placeholder)
   - **Solution:** Use production merchant ID (`5135296`) for both test and production
   - **Reason:** Test vs production is determined by endpoint URL, not merchant ID
   - **File:** `netlify/functions/utils/securepay.ts` lines 97-99
   - **Configuration:**
     - Test mode: Production merchant ID + Test secret key + Test endpoint
     - Production: Production merchant ID + Production secret key + Production endpoint

**Debugging process:**
- Used Chrome DevTools Network tab with "Preserve log"
- Examined Form Data being POSTed to Teya `default.aspx`
- Identified invalid `merchantid` and `paymentgatewayid` values
- Compared against Teya documentation requirements

**Status after fixes:**
- ✅ Both fixes committed and pushed
- ⏳ Waiting for Netlify deployment (~2-3 minutes)
- ⏳ Ready for testing with test card

---

**Síðast uppfært:** 2026-01-05 15:00
**Status:** Debugging fixes deployed, waiting for Netlify build
**Næsta skref:**
1. Wait for Netlify deployment to complete (check: https://app.netlify.com)
2. Test payment flow in incognito window: https://lioratech.is/30dagaplan/payment
3. Use test card: 4176 6699 9900 0104, 12/31, 012
4. Verify redirect to /payment-success (not /payment-error)
