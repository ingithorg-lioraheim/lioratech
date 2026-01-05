# Teya (Saltpay) Payment Gateway - Setup Documentation

**Dagsetning:** 2026-01-05
**Fyrirtæki:** Lioraheim ehf.
**Vefsíða:** www.lioratech.is
**Samningsnúmer:** 5135296
**Tengiliður Teya:** Magnús Benediktsson (hjalp@teya.is, 560-1600)

---

## 📋 Staða

- ✅ Vefsamningur stofnaður
- ✅ Áreiðanleikakönnun lokið
- ⏳ Bíður eftir verification staðfestingu
- ⏳ Production endpoint URL (fæst eftir verification)

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

1. ✅ Fá production endpoint URL frá Teya
2. ✅ Skipta um credentials í .env
3. ✅ Gera test transaction í production
4. ✅ Bakfæra test transaction
5. ✅ Fara live!

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

## 💾 Environment Variables (.env)

```bash
# Teya Payment Gateway - Test
VITE_TEYA_TEST_MERCHANT_ID=test_merchant_id
TEYA_TEST_SECRET_KEY=cdedfbb6ecab4a4994ac880144dd92dc

# Teya Payment Gateway - Production
VITE_TEYA_MERCHANT_ID=5135296
VITE_TEYA_GATEWAY_ID=97601
TEYA_SECRET_KEY=8b22f5be7648db800c56f0ba2e109a68

# Teya Endpoints
VITE_TEYA_TEST_ENDPOINT=https://test.borgun.is/SecurePay/default.aspx
VITE_TEYA_PROD_ENDPOINT=[VANTAR - fæst eftir verification]

# Callback URLs
VITE_PAYMENT_SUCCESS_URL=https://lioratech.is/payment-success
VITE_PAYMENT_ERROR_URL=https://lioratech.is/payment-error
VITE_PAYMENT_CALLBACK_URL=https://lioratech.is/.netlify/functions/payment-callback

# Mode
VITE_TEYA_MODE=test  # Skipta í 'production' þegar live
```

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

**Síðast uppfært:** 2026-01-05
**Næsta skref:** Implementa payment integration í test mode
