# PRODUCTION AUTOMATION WORKFLOW
## lioratech.is/roadmap → COO-Agent → Email Notification

**Status:** Ready to implement
**Last updated:** 2026-01-15

---

## ARCHITECTURE OVERVIEW

```
┌────────────────────────────────────────────────────────────────┐
│                    LIORATECH AUTOMATION PIPELINE                │
└────────────────────────────────────────────────────────────────┘

1. USER FILLS FORM
   lioratech.is/roadmap
   ↓

2. FORM SUBMITS
   POST → https://lioratech.app.n8n.cloud/webhook-test/roadmap-request
   ↓

3. N8N RECEIVES & STORES
   → Save JSON to coo-agent/requests/pending/
   → Send confirmation email to customer
   ↓

4. COO-AGENT DETECTS
   → Monitors requests/pending/ folder
   → Picks up new request
   → Moves to requests/processing/
   ↓

5. COO-AGENT GENERATES
   → Builds AI-greining using template
   → Saves to products/completed/
   → Moves request to requests/completed/
   ↓

6. COO-AGENT NOTIFIES CEO
   → Sends email to Ingi
   → "New analysis ready for review"
   → Link to product file
   ↓

7. CEO REVIEWS & SENDS
   → Ingi reviews analysis
   → Approves or requests changes
   → Sends to customer
```

---

## N8N WORKFLOW IMPLEMENTATION

###WORKFLOW NAME: "LioraTech AI-Greining Pipeline"**Webhook URL:** `https://lioratech.app.n8n.cloud/webhook-test/roadmap-request`

### NODE 1: Webhook Trigger ✅ (Already exists)

**Type:** Webhook
**Method:** POST
**Path:** `/webhook-test/roadmap-request`

**Payload received:**
```json
{
  "email": "jon@fyrirtaeki.is",
  "companyName": "Fyrirtæki ehf",
  "industry": "Retail",
  "employees": "6-20",
  "currentChallenges": "Too much manual work...",
  "goals": "Automate 40%...",
  "currentTools": "Excel, Gmail...",
  "timeline": "asap"
}
```

---

### NODE 2: Generate Order ID

**Type:** Function (JavaScript)
**Purpose:** Create unique order ID and timestamp

```javascript
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const orderId = `AI-${timestamp.slice(0,10)}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

return {
  json: {
    ...items[0].json,
    orderId: orderId,
    timestamp: new Date().toISOString(),
    status: 'pending',
    productType: 'ai-greining-free'
  }
};
```

**Output example:**
```json
{
  "orderId": "AI-2026-01-15-X7G2M4",
  "timestamp": "2026-01-15T10:30:00.000Z",
  "status": "pending",
  "productType": "ai-greining-free",
  ...formData
}
```

---

### NODE 3: Save Request to File System

**Type:** Write Binary File (or HTTP Request to Git API)

**Option A: Direct File Write (if n8n has file system access)**
```
File path: /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent/requests/pending/{{ $json.orderId }}.json
Content: {{ JSON.stringify($json, null, 2) }}
```

**Option B: Git API (more reliable, works from cloud)**
```javascript
// Use GitHub API or similar to commit file
const content = Buffer.from(JSON.stringify(items[0].json, null, 2)).toString('base64');

// POST to GitHub API
// https://api.github.com/repos/USERNAME/REPO/contents/coo-agent/requests/pending/{{ orderId }}.json
```

**Option C: Webhook to local server (if running locally)**
```
POST → http://localhost:3001/coo-agent/new-request
Body: {{ $json }}
```

**RECOMMENDED: Start with Option A (direct file), upgrade to Option B later**

---

### NODE 4: Send Customer Confirmation Email

**Type:** Send Email (Gmail, SendGrid, or similar)

**To:** `{{ $json.email }}`
**Subject:** `Greining þín er í vinnslu - ${company Name}`

**Email template:**
```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0;">LioraTech</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0;">AI Ráðgjöf fyrir íslensk fyrirtæki</p>
  </div>

  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1f2937; margin-top: 0;">Takk fyrir pöntunina!</h2>

    <p style="color: #4b5563; line-height: 1.6;">
      Hæ ${name || 'þar'},
    </p>

    <p style="color: #4b5563; line-height: 1.6;">
      Við höfum móttekið beiðni þína um <strong>ókeypis AI-greiningu</strong> fyrir <strong>${companyName}</strong>.
    </p>

    <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; color: #1e40af;"><strong>📋 Pöntunarnúmer:</strong> ${orderId}</p>
      <p style="margin: 10px 0 0 0; color: #1e40af;"><strong>⏰ Áætluð afhending:</strong> Innan 24 klst</p>
    </div>

    <h3 style="color: #1f2937; margin-top: 30px;">Næstu skref:</h3>
    <ol style="color: #4b5563; line-height: 1.8;">
      <li>✅ AI greinir reksturinn þinn (í gangi núna)</li>
      <li>⏳ Greiningin verður tilbúin innan 24 klst</li>
      <li>📧 Þú færð tölvupóst með niðurstöðunum</li>
    </ol>

    <p style="color: #4b5563; line-height: 1.6; margin-top: 30px;">
      Ef þú hefur spurningar, ekki hika við að hafa samband!
    </p>

    <p style="color: #4b5563; line-height: 1.6;">
      Bestu kveðjur,<br>
      <strong>Ingi Þór Gunnarsson</strong><br>
      LioraTech ehf.<br>
      <a href="mailto:info@lioratech.is" style="color: #3b82f6;">info@lioratech.is</a><br>
      <a href="https://lioratech.is" style="color: #3b82f6;">lioratech.is</a>
    </p>
  </div>

  <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
    <p>© 2026 LioraTech ehf. - AI ráðgjöf fyrir íslensk fyrirtæki</p>
  </div>
</body>
</html>
```

---

### NODE 5: Notify CEO (Ingi)

**Type:** Send Email (or Slack message)

**To:** `ingi@lioratech.is` (or your email)
**Subject:** `🆕 New AI-Greining Request - ${companyName}`

**Email template:**
```
🆕 NEW AI-GREINING REQUEST

Order ID: ${orderId}
Company: ${companyName}
Industry: ${industry}
Team size: ${employees}

Current challenges:
${currentChallenges}

Goals:
${goals}

Current tools: ${currentTools}
Timeline: ${timeline}

Status: COO-Agent will pick this up and generate analysis automatically.

You will receive another email when the analysis is ready for review.

Request file: coo-agent/requests/pending/${orderId}.json
```

---

### NODE 6: (Optional) Log to Dashboard

**Type:** HTTP Request or Database Insert

If you want a dashboard later, log the request:

```json
{
  "orderId": "${orderId}",
  "timestamp": "${timestamp}",
  "company": "${companyName}",
  "email": "${email}",
  "status": "pending",
  "product": "ai-greining-free"
}
```

---

## COO-AGENT MONITORING SYSTEM

COO-Agent needs to monitor the `requests/pending/` folder and automatically process new requests.

### Option A: Polling (Simple, works now)

**How it works:**
1. COO-Agent checks `requests/pending/` folder every 5 minutes
2. If new `.json` files found → process them
3. Move to `requests/processing/` while working
4. Generate analysis
5. Move to `requests/completed/` when done

**Implementation:**
```bash
# Simple cron job or scheduled task
*/5 * * * * /path/to/check-new-requests.sh
```

**check-new-requests.sh:**
```bash
#!/bin/bash

PENDING_DIR="/Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent/requests/pending"

# Check if there are any pending requests
if [ "$(ls -A $PENDING_DIR/*.json 2>/dev/null)" ]; then
  echo "New requests found. Triggering COO-Agent..."
  # Trigger COO-Agent (via API call, file trigger, etc.)
  # For now, you can manually run: "COO, check pending requests"
fi
```

### Option B: File Watcher (Better, real-time)

**How it works:**
- n8n or a script watches the folder for new files
- When new file appears → immediately trigger COO-Agent

**Tools:**
- `fswatch` (Mac/Linux)
- `chokidar` (Node.js)
- n8n "File Trigger" node (if available)

### Option C: HTTP Webhook (Best, most reliable)

**How it works:**
1. n8n calls COO-Agent API endpoint after saving file
2. COO-Agent immediately starts processing

**n8n Node:**
```
Type: HTTP Request
URL: http://localhost:3001/coo-agent/process-request
Method: POST
Body: { "orderId": "${orderId}" }
```

**RECOMMENDED: Start with Option A (polling), upgrade to Option C later**

---

## COO-AGENT PROCESSING

When COO-Agent detects a new request:

```
1. Read request JSON file
2. Extract data (company, industry, challenges, goals)
3. Load AI-greining template
4. Generate analysis (5 AI opportunities)
5. Save to products/completed/${orderId}-${companyName}-ai-greining.md
6. Move request from pending/ to completed/
7. Send notification email to CEO
```

**COO-Agent command:**
```
"COO, process pending requests"
```

Or automatic (if monitoring is set up):
```
COO-Agent detects new request automatically
→ Processes
→ Notifies CEO when done
```

---

## CEO NOTIFICATION EMAIL

When COO-Agent finishes generating the analysis:

**To:** `ingi@lioratech.is`
**Subject:** `✅ AI-Greining Ready for Review - ${companyName}`

**Email template:**
```
✅ AI-GREINING COMPLETE

Order #${orderId} is ready for your review.

Customer: ${companyName}
Email: ${email}
Industry: ${industry}

Analysis generated:
- 5 AI opportunities identified
- Ranked by ROI
- Tailored to ${industry}

Deliverable: products/completed/${orderId}-${companyName}-ai-greining.md

Generation time: ${deliveryTime} minutes

━━━ ACTIONS ━━━

✅ Review analysis
→ Open file: [link to file]

✅ If approved:
→ Convert to PDF (if not automated yet)
→ Send to customer at: ${email}

✅ If changes needed:
→ Reply to COO: "COO, revise ${orderId} - [notes]"

━━━ CUSTOMER INFO ━━━

Email template ready:
───────────────────────
To: ${email}
Subject: AI-greiningin þín er tilbúin!

[Email body with analysis attached]
───────────────────────

Status: AWAITING CEO APPROVAL
```

---

## FINAL STEP: CEO SENDS TO CUSTOMER

When Ingi approves and sends:

**Manual process (for now):**
1. Ingi opens analysis file
2. Reviews quality
3. Converts to PDF (manual or automated)
4. Emails to customer

**Email to customer:**
```html
Subject: AI-greiningin þín er tilbúin! 🎯

Hæ ${name},

Greiningin þín er tilbúin! 🎉

Við höfum greint reksturinn þinn og fundið 5 skýr tækifæri sem geta
hjálpað ${companyName} að ná markmiðunum.

📎 Sjá greiningu hér: [PDF attachment]

Helstu niðurstöður:
• ${opportunity1}
• ${opportunity2}
• ${opportunity3}

Næstu skref:
1. Lestu í gegnum greininguna (10-15 mín)
2. Veldu hvaða tækifæri þú vilt byrja á
3. Hafðu samband ef þú vilt aðstoð við innleiðingu

Ef þú vilt nákvæman 30-daga implementation plan, þá er það:
→ 49.900 ISK + VSK
→ Tilbúið innan 24 klst
→ Step-by-step guide með tools, ROI, metrics

Bókaðu samtal: https://lioratech.is/quote

Gangi þér vel!

Ingi Þór Gunnarsson
LioraTech ehf.
info@lioratech.is
lioratech.is
```

---

## AUTOMATION TIMELINE

### Week 1 (NOW):
- [x] Form exists ✅
- [ ] n8n workflow (Nodes 1-5)
- [ ] File storage working
- [ ] Customer confirmation emails
- [ ] Manual COO processing ("COO, process pending")

### Week 2:
- [ ] COO auto-monitoring (polling)
- [ ] CEO notification emails automated
- [ ] PDF generation (manual → automated)

### Week 3-4:
- [ ] Full automation (file watcher or webhook)
- [ ] Dashboard for viewing all requests
- [ ] Auto-send to customer (after CEO approval)
- [ ] Satisfaction surveys

---

## TESTING THE WORKFLOW

### Test 1: Submit Form
1. Go to https://lioratech.is/roadmap
2. Fill out form with test data
3. Submit

**Expected:**
- n8n receives webhook ✓
- File saved to requests/pending/ ✓
- Customer gets confirmation email ✓
- CEO gets notification email ✓

### Test 2: COO Processing
1. Check requests/pending/ for new file
2. Run: "COO, process pending requests"

**Expected:**
- COO reads file ✓
- Generates analysis ✓
- Saves to products/completed/ ✓
- Moves request to requests/completed/ ✓
- CEO gets "ready for review" email ✓

### Test 3: CEO Delivery
1. Review analysis
2. Convert to PDF
3. Send to customer

**Expected:**
- Customer receives analysis ✓
- Happy customer! ✓

---

## CURRENT STATUS

✅ Form: LIVE on lioratech.is/roadmap
✅ Webhook: CONFIGURED (lioratech.app.n8n.cloud)
⏳ n8n workflow: NEEDS IMPLEMENTATION (use this guide)
⏳ COO monitoring: NEEDS SETUP (start with manual)
⏳ Notifications: NEEDS CONFIGURATION (email templates above)

---

## NEXT STEPS FOR INGI

1. **Open n8n** (lioratech.app.n8n.cloud)
2. **Create workflow** "LioraTech AI-Greining Pipeline"
3. **Add nodes** as described above (Nodes 1-6)
4. **Test** with a form submission
5. **Tell COO:** "COO, check for pending requests"
6. **Review** generated analysis
7. **Send** to customer

---

**Ready to implement? Say: "COO, I'm ready to configure n8n"**

And I'll walk you through it step by step.

---

*This is the engine that will take you from 3-6 clients/month to 30-50/month.* 🚀
