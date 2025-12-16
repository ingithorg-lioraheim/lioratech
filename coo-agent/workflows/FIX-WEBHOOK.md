# 🔧 FIX WEBHOOK - Production Mode

## Vandamálið

Webhook er í "Test" mode og virkar ekki fyrir production traffic.

## Lausnin

### 1️⃣ Opna workflow í n8n

Farðu á: https://lioratech.app.n8n.cloud

Opna "LioraTech AI-Greining - Email Workflow"

### 2️⃣ Opna Webhook node

- Smelltu á **"Webhook - Form Submit"** node (fyrsti node)
- Node settings opnast til hægri

### 3️⃣ Breyta í Production mode

Í node settings, finndu:

**Webhook URLs:**
- Test URL: `https://lioratech.app.n8n.cloud/webhook-test/roadmap-request`
- **Production URL:** `https://lioratech.app.n8n.cloud/webhook/roadmap-request`

Athugaðu hvort það er hakað við:
- ☑️ **"Production URL"** - Þetta ÞARF að vera virkt!

### 4️⃣ Vista og activate

- Smelltu **"Save"** (vista)
- Gakktu úr skugga um að workflow sé **Active** (grænn rofi efst)

### 5️⃣ Uppfæra form kóða

Við þurfum líka að uppfæra formið til að nota **production URL** í stað test URL.

**NÚVERANDI í RoadmapPurchasePage.tsx (línu 29):**
```typescript
const response = await fetch('https://lioratech.app.n8n.cloud/webhook-test/roadmap-request', {
```

**ÞARF AÐ VERA:**
```typescript
const response = await fetch('https://lioratech.app.n8n.cloud/webhook/roadmap-request', {
```

---

## ⚡ TL;DR - Quick Fix

1. **Í n8n:** Opna webhook node → Check "Production URL" er hakað við
2. **Í kóða:** Breyta `/webhook-test/` → `/webhook/`
3. **Test:** Submit formið aftur

---

**Skal ég uppfæra form kóðann fyrir þig núna?** ✅
