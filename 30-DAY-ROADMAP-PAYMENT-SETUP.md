# 30-Day Roadmap Payment Integration - Setup Documentation

**Date:** 2025-12-30
**Status:** Ready for testing
**Developer:** Claude + Ingi

---

## 📋 Project Overview

We implemented a **questionnaire → payment → roadmap generation** flow for the 30-day AI roadmap product using:
- **n8n** for workflow automation
- **Rapyd** for payment processing (sandbox mode)
- **Google Drive** for file storage
- **Claude AI** for roadmap generation

---

## 🎯 The Problem

Originally, the 30-day roadmap workflow was:
```
Form Submit → Generate Roadmap → Email → Done
```

We needed to add a **paid flow** where:
1. User fills questionnaire
2. User pays (69,900 ISK)
3. **After payment confirmed** → Generate roadmap

### Challenge: Rapyd Account Not Verified

Rapyd account status: **PENDING**
- Cannot access full webhook functionality
- Limited API features until verified

### Solution: Redirect-Based Flow (Option B)

Instead of relying on Rapyd webhooks, we use **redirect URLs**:
```
Questionnaire → Payment → Rapyd redirects to success page →
Success page triggers n8n → Roadmap generation
```

This works **immediately in sandbox** without waiting for account verification.

---

## 🏗️ Architecture

### New Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. QUESTIONNAIRE SUBMISSION                                  │
│                                                              │
│  User fills form                                            │
│     ↓                                                        │
│  POST /webhook/30-day-questionnaire-submit                  │
│     ↓                                                        │
│  n8n: Generate orderId (AI-2025-12-30-ABC123)              │
│     ↓                                                        │
│  n8n: Save JSON to "pending-payment" folder                 │
│     ↓                                                        │
│  n8n: Respond with { orderId: "..." }                       │
│     ↓                                                        │
│  Frontend: Redirect to /30dagaplan/payment?orderId=XXX     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. PAYMENT                                                   │
│                                                              │
│  User on payment page                                        │
│     ↓                                                        │
│  Netlify Function: create-checkout                          │
│     ↓                                                        │
│  Rapyd: Create checkout (with orderId in metadata)          │
│     ↓                                                        │
│  User pays                                                   │
│     ↓                                                        │
│  Rapyd redirects: /payment-success?orderId=XXX&checkout=YYY │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. ROADMAP GENERATION                                        │
│                                                              │
│  PaymentSuccessPage loads                                   │
│     ↓                                                        │
│  Parse orderId from URL                                     │
│     ↓                                                        │
│  POST /webhook/30-day-payment-callback                      │
│     ↓                                                        │
│  n8n: Search for orderId in "pending-payment"               │
│     ↓                                                        │
│  n8n: Download questionnaire JSON                           │
│     ↓                                                        │
│  n8n: Move to "in-progress"                                 │
│     ↓                                                        │
│  n8n: Merge payment + questionnaire data                    │
│     ↓                                                        │
│  n8n: Build master prompt                                   │
│     ↓                                                        │
│  n8n: AI Agent 1 (Opportunities) + AI Agent 2 (Impl.)       │
│     ↓                                                        │
│  n8n: Merge & combine roadmap                               │
│     ↓                                                        │
│  n8n: Save roadmap.md to "in-progress"                      │
│     ↓                                                        │
│  n8n: Email notification to ingi@lioratech.is               │
│     ↓                                                        │
│  Frontend: Show success message                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Files Changed

### 1. **Frontend Pages**

#### `/pages/ThirtyDayRoadmapQuestionnairePage.tsx`
**Changed:**
- Webhook URL: `https://lioratech.app.n8n.cloud/webhook/30-day-questionnaire-submit`
- Request body: `{ body: formData }`
- Receives `orderId` in response
- Stores in localStorage
- Redirects to `/30dagaplan/payment?orderId=XXX`

**Key code:**
```typescript
const response = await fetch('https://lioratech.app.n8n.cloud/webhook/30-day-questionnaire-submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ body: formData }),
});

const data = await response.json();
const orderId = data.orderId;

localStorage.setItem('roadmap_order_id', orderId);
localStorage.setItem('roadmap_form_data', JSON.stringify(formData));

window.location.href = `/30dagaplan/payment?orderId=${orderId}`;
```

#### `/pages/PaymentSuccessPage.tsx`
**Changed:**
- Added `useSearchParams` to parse URL
- Added `useEffect` to trigger n8n webhook on page load
- Parses `orderId` from URL
- Calls `/webhook/30-day-payment-callback` with payment data
- Shows loading screen while processing
- Shows error if webhook fails

**Key code:**
```typescript
const orderId = searchParams.get('orderId');

await fetch('https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    body: {
      data: {
        metadata: { orderId: orderId },
        id: checkout || 'manual-trigger',
        status: 'CLO',
        amount: 69900,
        currency: 'ISK'
      }
    }
  }),
});
```

### 2. **Netlify Functions**

#### `/netlify/functions/create-checkout.ts`
**Changed:**
- Extracts `orderId` from `metadata`
- Passes `orderId` to Rapyd in checkout metadata
- Updated redirect URLs:
  - Success: `/payment-success?orderId=${orderId}`
  - Error: `/payment-error`

**Key code:**
```typescript
const orderId = requestData.metadata?.orderId;

const checkout = await rapyd.createCheckout({
  // ... other params
  metadata: {
    product: '30-day-roadmap',
    company: requestData.companyName,
    orderId: orderId, // IMPORTANT!
    ...requestData.metadata,
  },
  complete_payment_url: `${siteUrl}/payment-success?orderId=${orderId}`,
  error_payment_url: `${siteUrl}/payment-error`,
});
```

### 3. **n8n Workflow**

#### New workflow: `n8n-30-day-roadmap-with-payment.json`

**Two separate webhook triggers:**

**Webhook 1: `/webhook/30-day-questionnaire-submit`**
- Receives questionnaire data
- Generates unique orderId: `AI-YYYY-MM-DD-XXXXXX`
- Converts to binary
- Saves to Google Drive: `pending-payment/{orderId}-questionnaire.json`
- Responds with `{ success: true, orderId: "..." }`

**Webhook 2: `/webhook/30-day-payment-callback`**
- Receives payment confirmation with orderId
- Searches for `{orderId}-questionnaire.json` in `pending-payment`
- Downloads the file
- Moves file to `in-progress` folder
- Merges payment data + questionnaire data
- Builds master prompt (Part 1 + Part 2)
- Runs 2 AI agents in parallel:
  - AI Agent 1: Opportunities & Analysis (pages 1-11)
  - AI Agent 2: Implementation Plan (pages 12-16)
- Merges AI outputs
- Saves roadmap to `in-progress/{orderId}-{companyName}.md`
- Sends email to `ingi@lioratech.is`
- Responds with success

**Import this file into n8n to get the complete workflow.**

---

## 🗂️ Google Drive Structure

```
LioraTech-COO/
└── 30-daga-plan/
    ├── pending-payment/        (NEW - stores questionnaires awaiting payment)
    │   └── AI-2025-12-30-ABC123-questionnaire.json
    ├── in-progress/            (stores paid questionnaires + generated roadmaps)
    │   ├── AI-2025-12-30-ABC123-questionnaire.json (moved from pending-payment)
    │   └── AI-2025-12-30-ABC123-CompanyName.md (generated roadmap)
    ├── incoming/               (old folder - may deprecate)
    └── completed/              (final approved roadmaps)
```

**Folder IDs:**
- `pending-payment`: `1vRP5yGFdvUZnY2DjSgIivSLywoJS2n-6`
- `in-progress`: `1JVZf9s80Eyo3HOZY-SvFNG_HeG_D6eqN`
- `incoming`: `1SZ2CHqOdntp7jYza2eKmLfF3pczvmlbD`
- `completed`: `1IwgBvSwQqHeswhpwfjlhcIAuMAB5L_hh`

---

## 🔐 Environment Variables

**File:** `.env`

```bash
# Rapyd Payment Gateway - Sandbox Credentials
RAPYD_ACCESS_KEY=rak_6C3B6AF2FFFDBD11B843
RAPYD_SECRET_KEY=rsk_d9732afcf83d0e25370f3943684059a16cd39a95e67792fb4f7c46fc7a5c1f18c87f30f06d01c670
RAPYD_ENVIRONMENT=sandbox
RAPYD_BASE_URL=https://sandboxapi.rapyd.net

# n8n Webhook URLs
N8N_QUESTIONNAIRE_WEBHOOK=https://lioratech.app.n8n.cloud/webhook/30-day-questionnaire-submit
N8N_PAYMENT_WEBHOOK=https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback
```

**Note:** Rapyd account is in **PENDING** status. Webhooks will work once verified, but redirect-based flow works now.

---

## ✅ Current Status

### Completed
- ✅ Created `pending-payment` folder in Google Drive
- ✅ Built new n8n workflow with 2 webhooks
- ✅ Updated `ThirtyDayRoadmapQuestionnairePage.tsx`
- ✅ Updated `PaymentSuccessPage.tsx`
- ✅ Updated `create-checkout.ts` Netlify function
- ✅ Saved Rapyd credentials in `.env`
- ✅ Documented everything in this file

### Ready for Testing
- 🧪 Deploy to Netlify
- 🧪 Test questionnaire submission
- 🧪 Test payment flow (Rapyd sandbox)
- 🧪 Verify roadmap generation
- 🧪 Check email notification

### Not Yet Done
- ⏳ Rapyd account verification (waiting on Rapyd support)
- ⏳ Production testing with real payments
- ⏳ Setup Rapyd webhooks (when account is verified)

---

## 🧪 Testing Checklist

### 1. Pre-Testing Setup

- [ ] **Deploy to Netlify:**
  ```bash
  git add .
  git commit -m "Add payment flow for 30-day roadmap"
  git push origin main
  ```

- [ ] **Verify n8n workflow is ACTIVE:**
  - Open n8n: https://lioratech.app.n8n.cloud
  - Find "30-Day Roadmap with Payment (New)"
  - Toggle to **Active** (green)

- [ ] **Check webhook URLs are accessible:**
  - Questionnaire: `https://lioratech.app.n8n.cloud/webhook/30-day-questionnaire-submit`
  - Payment: `https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback`

### 2. Test Questionnaire Flow

- [ ] Go to: `https://lioratech.is/30dagaplan/questionnaire`
- [ ] Fill out the form completely
- [ ] Submit form
- [ ] **Expected:** Redirect to `/30dagaplan/payment?orderId=AI-YYYY-MM-DD-XXXXXX`
- [ ] **Verify in n8n:** Check execution log - should see questionnaire saved
- [ ] **Verify in Google Drive:** Check `pending-payment/` folder - should have JSON file

### 3. Test Payment Flow

- [ ] On payment page, verify orderId is in URL
- [ ] Fill in payment details
- [ ] Click "Halda áfram í greiðslu"
- [ ] **Expected:** Redirect to Rapyd sandbox checkout page
- [ ] Use Rapyd test card:
  - Card: `4111 1111 1111 1111`
  - CVV: `123`
  - Expiry: Any future date
- [ ] Complete payment
- [ ] **Expected:** Redirect to `/payment-success?orderId=XXX`

### 4. Test Roadmap Generation

- [ ] On success page, verify loading spinner appears
- [ ] Wait ~30-60 seconds for AI generation
- [ ] **Expected:** Success message appears
- [ ] **Verify in n8n:** Check execution log - should see payment webhook triggered
- [ ] **Verify in Google Drive:**
  - `in-progress/` should have questionnaire JSON (moved from pending-payment)
  - `in-progress/` should have roadmap MD file
- [ ] **Verify email:** Check ingi@lioratech.is for notification

### 5. Debugging

If anything fails:

**Check n8n execution logs:**
1. Go to n8n
2. Click "Executions" tab
3. Find failed execution
4. Click to see error details

**Common issues:**
- **Questionnaire not saved:** Check n8n webhook URL is correct
- **Payment not triggering:** Check PaymentSuccessPage console logs
- **Roadmap not generated:** Check n8n AI agent has Claude API credentials
- **File not found:** Check orderId matches between questionnaire and payment

**n8n Credentials Needed:**
- Google Drive OAuth2 (ID: `wwpyqnDEeHfqxBt5`)
- Anthropic API (ID: `jhXu8cCaS35ENh09`)
- Gmail OAuth2 (ID: `DMOMr6YNj60YMfxL`)

---

## 🔄 Future Improvements

### When Rapyd Account is Verified

1. **Add webhook listener in n8n:**
   - Rapyd will send webhooks directly
   - Can remove redirect-based trigger
   - More reliable than frontend trigger

2. **Update Rapyd dashboard:**
   - Add webhook URL: `/webhook/30-day-payment-callback`
   - Subscribe to `PAYMENT_COMPLETED` event

3. **Update PaymentSuccessPage:**
   - Can simplify to just show success
   - No need to trigger n8n manually

### Other Improvements

- [ ] Add payment failure handling
- [ ] Add retry logic if n8n webhook fails
- [ ] Add status page to check roadmap progress
- [ ] Email customer when roadmap is ready
- [ ] Add COO agent integration for review

---

## 📞 Support

If you encounter issues:

1. Check this documentation first
2. Check n8n execution logs
3. Check browser console for errors
4. Check Netlify function logs
5. Contact: ingi@lioratech.is

---

## 🎯 Quick Reference

**n8n Webhooks:**
- Questionnaire: `https://lioratech.app.n8n.cloud/webhook/30-day-questionnaire-submit`
- Payment: `https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback`

**Rapyd Sandbox:**
- Dashboard: https://dashboard.rapyd.net
- Test Card: `4111 1111 1111 1111`
- CVV: `123`

**Google Drive Folders:**
- pending-payment: `1vRP5yGFdvUZnY2DjSgIivSLywoJS2n-6`
- in-progress: `1JVZf9s80Eyo3HOZY-SvFNG_HeG_D6eqN`

**Price:** 69,900 ISK (86,676 ISK with VAT)

---

**Last Updated:** 2025-12-30 01:45 UTC
**Next Step:** Deploy and test! 🚀
