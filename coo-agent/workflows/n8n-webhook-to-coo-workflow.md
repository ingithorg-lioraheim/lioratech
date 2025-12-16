# N8N WEBHOOK → COO-AGENT WORKFLOW

This document describes the n8n workflow that triggers COO-Agent to build products.

---

## WORKFLOW OVERVIEW

```
┌─────────────────┐
│   Website Form  │
│  or Purchase    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  n8n Webhook    │  ← Receives order data
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Store Data     │  ← Save to file/database
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Trigger COO    │  ← Call COO-Agent via Claude Code
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  COO Builds     │  ← Autonomous product creation
│    Product      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Notify CEO     │  ← Send product for review
│  (Ingi)         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CEO Approves   │  ← Manual review step
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Send to        │  ← CEO delivers to customer
│  Customer       │
└─────────────────┘
```

---

## N8N WORKFLOW NODES

### Node 1: Webhook Trigger
**Type:** Webhook
**Method:** POST
**Path:** `/webhook/lioratech-order`

**Expected payload:**
```json
{
  "order_id": "2026-001",
  "order_type": "roadmap_30day",
  "customer": {
    "name": "Jón Jónsson",
    "email": "jon@fyrirtaeki.is",
    "company": "Fyrirtæki ehf",
    "phone": "+354 123 4567"
  },
  "company_info": {
    "industry": "Retail",
    "team_size": 15,
    "annual_revenue": "50M ISK",
    "website": "https://fyrirtaeki.is"
  },
  "requirements": {
    "pain_points": [
      "Too much manual data entry",
      "Slow customer response times",
      "No visibility into inventory"
    ],
    "main_goal": "Reduce manual work by 40% in 90 days",
    "tech_stack": "Excel, Gmail, basic CRM",
    "timeline": "ASAP",
    "notes": "Team is open to change, willing to learn"
  },
  "payment": {
    "status": "completed",
    "amount": 49900,
    "currency": "ISK",
    "transaction_id": "stripe_123456",
    "date": "2026-01-15T10:30:00Z"
  },
  "metadata": {
    "source": "website_purchase",
    "utm_campaign": "Q1_2026",
    "referrer": "google_ads"
  }
}
```

---

### Node 2: Store Order Data
**Type:** Code (JavaScript)
**Purpose:** Save order to file system for COO-Agent tracking

```javascript
// Extract data
const orderData = {
  order_id: $input.item.json.order_id,
  timestamp: new Date().toISOString(),
  customer: $input.item.json.customer.company,
  product: $input.item.json.order_type,
  status: 'RECEIVED',
  data: $input.item.json
};

// Format for COO tracking file
const orderLine = `| ${orderData.order_id} | ${orderData.customer} | ${orderData.product} | RECEIVED | ${orderData.timestamp} | - | Webhook received |\n`;

// Return data for next node
return {
  json: {
    order_id: orderData.order_id,
    order_data: orderData,
    tracking_line: orderLine,
    coo_payload: $input.item.json
  }
};
```

---

### Node 3: Write to Tracking File
**Type:** Execute Command (or HTTP Request if using Git API)
**Purpose:** Append order to COO tracking system

**Option A: Direct File Write (Local)**
```bash
echo "| order_id | customer | product | RECEIVED | timestamp |" >> /path/to/coo-agent/tracking/orders.md
```

**Option B: Git Commit (Better for persistence)**
```bash
cd /path/to/lioratech-project
echo "New order data" >> coo-agent/tracking/orders.md
git add coo-agent/tracking/orders.md
git commit -m "COO: New order order_id"
git push
```

---

### Node 4: Trigger COO-Agent
**Type:** HTTP Request to Claude Code (or direct file trigger)
**Purpose:** Wake up COO-Agent to start building

**Option A: File-Based Trigger**
Create a file that Claude Code monitors:
```javascript
// Write trigger file
const triggerData = {
  type: 'NEW_ORDER',
  order_id: $input.item.json.order_id,
  data: $input.item.json.coo_payload,
  timestamp: new Date().toISOString()
};

// Write to trigger directory
fs.writeFileSync(
  '/path/to/coo-agent/triggers/pending/' + triggerData.order_id + '.json',
  JSON.stringify(triggerData, null, 2)
);
```

**Option B: Direct API Call (if COO has API endpoint)**
```javascript
// HTTP Request to COO-Agent API
const response = await fetch('http://localhost:3001/coo-agent/new-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    order_id: $input.item.json.order_id,
    order_data: $input.item.json.coo_payload
  })
});

return { json: await response.json() };
```

---

### Node 5: Send Initial Confirmation to Customer
**Type:** Send Email
**Purpose:** Let customer know we received their order

**Email template:**
```
To: {{ $json.customer.email }}
Subject: Order Confirmed - 30-Day AI Roadmap for {{ $json.customer.company }}

Hæ {{ $json.customer.name }},

Takk fyrir pöntunina!

Við höfum móttekið beiðni þína um 30-daga AI Roadmap fyrir {{ $json.customer.company }}.

📋 Pöntunarnúmer: {{ $json.order_id }}
⏰ Áætluð afhending: Innan 24 klst

Næstu skref:
1. ✅ Greining hafin (í gangi núna)
2. ⏳ Roadmap verður tilbúið innan 24 klst
3. 📧 Þú færð tölvupóst þegar það er tilbúið

Ef þú hefur einhverjar spurningar, ekki hika við að hafa samband.

Bestu kveðjur,
Ingi Þór Gunnarsson
LioraTech ehf.
info@lioratech.is
lioratech.is
```

---

### Node 6: Notify CEO (via Slack/Email)
**Type:** Send Email (or Slack message)
**Purpose:** Let Ingi know a new order came in

**Message:**
```
🆕 NEW ORDER RECEIVED

Order ID: {{ $json.order_id }}
Customer: {{ $json.customer.company }}
Product: 30-Day AI Roadmap
Status: COO-Agent is building

Details:
- Industry: {{ $json.company_info.industry }}
- Team: {{ $json.company_info.team_size }}
- Pain points: {{ $json.requirements.pain_points | join(', ') }}

COO-Agent will notify you when ready for review.

View tracking: [link to tracking file]
```

---

## COO-AGENT PROCESSING

**What happens after webhook:**

1. **COO-Agent detects** new order (via file monitor or API)
2. **Reads order data** from trigger file
3. **Updates tracking**: Order moved to "IN_PROGRESS"
4. **Builds product**:
   - Loads template
   - Fills in customer data
   - AI generates industry analysis
   - AI generates opportunities
   - AI creates implementation plan
   - Formats as PDF
5. **Updates tracking**: Order moved to "AWAITING_REVIEW"
6. **Notifies CEO**: "Product ready for review at [path]"

---

## REVIEW & DELIVERY WORKFLOW

**After COO builds product:**

### Manual Step: CEO Review
Ingi receives notification → Reviews product → Either:
- ✅ **Approves**: Product is good to send
- 🔄 **Requests changes**: COO makes edits

### If Approved:
**Node 7: CEO Sends to Customer**
Ingi manually (or via n8n button) sends email:

```
To: {{ customer.email }}
Subject: Your 30-Day AI Roadmap is Ready! 🎯

Hæ {{ customer.name }},

Roadmapið þitt er tilbúið! 🎉

Við höfum greint reksturinn þinn og fundið 5 skýr tækifæri sem geta sparað þér
{{time_saved}} tíma á viku og bætt skilvirkni um {{efficiency_gain}}%.

📎 Sjá roadmap hér: [PDF link]

Næstu skref:
1. Lestu í gegnum roadmapið (15-20 mín)
2. Veldu hvaða tækifæri þú vilt byrja á
3. Hafðu samband ef þú vilt aðstoð við innleiðingu

Ef þú hefur spurningar eða vilt ræða innleiðinguna, bókaðu tíma:
[Calendly link]

Gangi þér vel!

Ingi Þór Gunnarsson
LioraTech ehf.
```

**Node 8: Update Tracking**
Mark order as DELIVERED, log delivery time

**Node 9: Schedule Follow-up**
Wait 7 days → Send satisfaction survey
Wait 30 days → Check on implementation progress

---

## SETUP INSTRUCTIONS

### 1. Create Webhook in n8n
```
1. Open n8n
2. Create new workflow: "LioraTech Order Pipeline"
3. Add Webhook node
4. Set to POST method
5. Copy webhook URL
6. Test with sample data
```

### 2. Connect to Website Forms
On `lioratech.is`, when someone:
- Clicks "Fá verðtilboð" → Form captures data
- Completes purchase → Stripe webhook fires

Both should POST to your n8n webhook.

### 3. Configure File Paths
Update all file paths in workflow nodes to match your system:
- `/path/to/coo-agent/tracking/orders.md`
- `/path/to/coo-agent/triggers/pending/`
- `/path/to/coo-agent/products/`

### 4. Test End-to-End
```
1. Send test webhook payload
2. Verify order appears in tracking
3. Verify COO-Agent detects it
4. Verify product is built
5. Verify CEO notification sent
```

---

## TESTING THE WORKFLOW

### Test Payload (curl)
```bash
curl -X POST https://your-n8n-instance.com/webhook/lioratech-order \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "TEST-001",
    "order_type": "roadmap_30day",
    "customer": {
      "name": "Test Customer",
      "email": "test@test.is",
      "company": "Test ehf"
    },
    "company_info": {
      "industry": "Tech",
      "team_size": 10
    },
    "requirements": {
      "pain_points": ["Manual work", "Slow processes"],
      "main_goal": "Automate 50%"
    },
    "payment": {
      "status": "completed",
      "amount": 49900
    }
  }'
```

---

## MONITORING

**Check these regularly:**
- n8n execution history (any failures?)
- COO tracking files (orders moving through pipeline?)
- Product output folder (deliverables being created?)
- CEO notification inbox (getting alerts?)

**Success metrics:**
- Webhook → Product created: <24 hours
- Automation %: 85%+ (only CEO review is manual)
- Error rate: <5%

---

## FUTURE ENHANCEMENTS

**Phase 2:**
- [ ] Auto-send to customer after CEO approval (remove manual email)
- [ ] Automated satisfaction surveys
- [ ] Automated follow-ups
- [ ] CRM integration (HubSpot, Pipedrive)
- [ ] Analytics dashboard

**Phase 3:**
- [ ] Multi-language support
- [ ] Custom branding per client
- [ ] Video walkthrough generation
- [ ] Interactive roadmap (web app)

---

*This is the backbone of your 50M ISK revenue goal - fully automated product delivery at scale.*
