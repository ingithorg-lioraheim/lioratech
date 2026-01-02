# 30 Daga AI Roadmap - Generation System

## Yfirlit

Þetta system tekur inn data frá `/greining` purchase form og býr til sérsniðið 30 daga AI roadmap sem PDF.

---

## Workflow Skref fyrir Skref

### **A) ✅ Prompt Template**
- **File:** `prompt-template.md`
- **Tilgangur:** Template fyrir Claude API til að búa til roadmap content
- **Input:** Data frá questionnaire (JSON)
- **Output:** Markdown roadmap

### **B) ✅ PDF Template**
- **File:** `pdf-template.html`
- **Tilgangur:** Professional HTML template fyrir PDF generation
- **Input:** Data frá Claude (structured)
- **Output:** Styled HTML ready for PDF conversion

### **C) n8n Workflow**
- **Tilgangur:** Automation frá purchase → PDF delivery
- **Steps:**
  1. Webhook móttekur data
  2. Claude API call
  3. Fill HTML template
  4. Convert to PDF
  5. Email to customer

### **D) Testing**
- **Tilgangur:** Prófa end-to-end flow

---

## B) PDF Generation - 3 Options

### **Option 1: Puppeteer (Best fyrir automation)**

```javascript
// n8n Code node eða separate service
const puppeteer = require('puppeteer');

async function generatePDF(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm'
    }
  });

  await browser.close();
  return pdf;
}
```

**Pros:**
- Full control
- Perfect rendering
- Can be automated in n8n

**Cons:**
- Requires Node.js service
- Slightly complex setup

---

### **Option 2: Gotenberg (Docker service)**

Gotenberg er open-source PDF conversion API sem þú getur keyrt í Docker.

```bash
# Start Gotenberg
docker run -d -p 3000:3000 gotenberg/gotenberg:7

# Convert HTML to PDF með cURL
curl --request POST \
  --url http://localhost:3000/forms/chromium/convert/html \
  --form 'files=@pdf-template.html' \
  --output roadmap.pdf
```

**n8n integration:**
- HTTP Request node til Gotenberg
- Send HTML content
- Get PDF back

**Pros:**
- Simple API
- Great quality
- Easy to use from n8n

**Cons:**
- Requires Docker

---

### **Option 3: Cloudflare Workers + Puppeteer (Cloud-based)**

Nota Cloudflare Browser Rendering API.

**Pros:**
- No server needed
- Scalable
- Fast

**Cons:**
- Costs money (but very cheap)
- Requires Cloudflare account

---

### **Option 4: Manual testing með Browser**

Fyrir testing, þú getur einfaldlega:

1. Opnað `pdf-template.html` í Chrome/Firefox
2. Ctrl/Cmd + P (Print)
3. "Save as PDF"
4. Validate að það lítur vel út

---

## C) n8n Workflow Setup

### **Workflow Diagram:**

```
1. Webhook Trigger (POST from /greining)
   ↓
2. Code Node: Prepare data for Claude
   ↓
3. HTTP Request: Claude API
   ↓
4. Code Node: Parse Claude response + structure data
   ↓
5. HTML Template Node: Fill template með data
   ↓
6. HTTP Request: Convert HTML → PDF (Gotenberg/Puppeteer)
   ↓
7. Google Drive: Save PDF (optional)
   ↓
8. Send Email með PDF attached
   ↓
9. (Optional) Save to Airtable/Notion for records
```

---

### **Detailed n8n Node Configuration:**

#### **1. Webhook Trigger**

```json
{
  "method": "POST",
  "path": "roadmap-request",
  "responseMode": "lastNode",
  "authentication": "none"
}
```

**Expected payload:**
```json
{
  "email": "jon@fyrirtaeki.is",
  "companyName": "Íslenska Bókhaldstofan",
  "industry": "Bókhald",
  "employees": "12",
  "currentChallenges": "...",
  "goals": "...",
  "currentTools": "Excel, Outlook",
  "timeline": "asap"
}
```

---

#### **2. Code Node: Prepare Claude Prompt**

```javascript
// Get data from webhook
const data = $input.item.json;

// Read prompt template
const promptTemplate = `
Búðu til 30 daga AI innleiðingar roadmap fyrir eftirfarandi fyrirtæki:

**FYRIRTÆKJAUPPLÝSINGAR:**
- Fyrirtæki: ${data.companyName}
- Iðnaður: ${data.industry}
- Fjöldi starfsmanna: ${data.employees}

**NÚVERANDI STAÐA:**
- Helstu áskoranir: ${data.currentChallenges}
- Markmið með AI: ${data.goals}
- Núverandi tól: ${data.currentTools}
- Tímalína: ${data.timeline}

[Rest of prompt from prompt-template.md]
`;

return {
  json: {
    prompt: promptTemplate,
    email: data.email,
    companyName: data.companyName
  }
};
```

---

#### **3. HTTP Request: Claude API**

**Method:** POST
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**
```json
{
  "x-api-key": "{{$env.ANTHROPIC_API_KEY}}",
  "anthropic-version": "2023-06-01",
  "content-type": "application/json"
}
```

**Body:**
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 16000,
  "messages": [
    {
      "role": "user",
      "content": "{{$json.prompt}}"
    }
  ]
}
```

---

#### **4. Code Node: Parse & Structure Response**

```javascript
const claudeResponse = $input.item.json.content[0].text;
const email = $('Code').item.json.email;
const companyName = $('Code').item.json.companyName;

// Parse the markdown response from Claude
// Extract sections, create structured data

// For now, simplified version:
return {
  json: {
    roadmapMarkdown: claudeResponse,
    email: email,
    companyName: companyName,
    date: new Date().toLocaleDateString('is-IS'),
    year: new Date().getFullYear()
  }
};
```

---

#### **5. HTML Template Node**

Use n8n's **HTML Template** node or **Code** node to fill the template:

```javascript
const fs = require('fs');
const Handlebars = require('handlebars');

// Read HTML template
const templateHTML = fs.readFileSync('./pdf-template.html', 'utf8');
const template = Handlebars.compile(templateHTML);

// Get data
const data = $input.item.json;

// Fill template
const filledHTML = template({
  companyName: data.companyName,
  date: data.date,
  year: data.year,
  executiveSummary: "...", // parsed from Claude response
  challenges: [...], // parsed from Claude response
  // etc.
});

return {
  json: {
    html: filledHTML,
    email: data.email,
    companyName: data.companyName
  }
};
```

---

#### **6. HTTP Request: HTML → PDF (Gotenberg)**

**Method:** POST
**URL:** `http://localhost:3000/forms/chromium/convert/html`

**Body Type:** Form-Data
**Form Fields:**
- `files`: {{$json.html}}

**Response Format:** File

---

#### **7. Google Drive Node (Optional)**

**Operation:** Upload a file
**File:** {{$binary.data}}
**Filename:** `{{$json.companyName}} - 30 Daga Roadmap.pdf`
**Folder:** [Your roadmaps folder ID]

---

#### **8. Send Email Node (Gmail/SMTP)**

**To:** {{$json.email}}
**Subject:** "Roadmap-ið þitt er tilbúið! 🚀"

**Body:**
```
Halló!

Takk fyrir að kaupa 30 daga AI Roadmap hjá LioraTech!

Roadmap-ið þitt fyrir {{$json.companyName}} er tilbúið og fylgir í viðhengi.

Næstu skref:
1. Lestu Executive Summary (síða 1-3)
2. Byrjaðu á Degi 1 strax á morgun
3. Bókaðu 20 mín uppfylgni-samtal: [Calendly link]

Gangi þér vel!

Ingi Þór
LioraTech
info@lioratech.is
```

**Attachments:**
- File from Binary Data: `{{$json.companyName}} - 30 Daga Roadmap.pdf`

---

## D) Testing

### **Manual Test (without payment):**

1. **Test prompt í ChatGPT/Claude directly:**
   - Copy prompt from `prompt-template.md`
   - Fill in test data
   - See if output looks good

2. **Test HTML template:**
   - Open `pdf-template.html` in browser
   - Manually fill in some {{variables}}
   - Print to PDF
   - Check formatting

3. **Test n8n webhook:**
   ```bash
   curl -X POST http://localhost:5678/webhook-test/greining-request \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "companyName": "Test ehf",
       "industry": "Test",
       "employees": "5",
       "currentChallenges": "Testing",
       "goals": "Test goals",
       "currentTools": "Excel",
       "timeline": "asap"
     }'
   ```

4. **End-to-end test:**
   - Do a test purchase on `/greining` (with test payment)
   - Check email inbox
   - Open PDF
   - Validate quality

---

## Environment Variables þú þarft:

```env
# Claude API
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Email (Gmail)
GMAIL_USER=info@lioratech.is
GMAIL_APP_PASSWORD=xxxxx

# Google Drive (optional)
GOOGLE_DRIVE_CLIENT_ID=xxxxx
GOOGLE_DRIVE_CLIENT_SECRET=xxxxx

# Gotenberg (if using)
GOTENBERG_URL=http://localhost:3000

# Calendly link
CALENDLY_LINK=https://calendly.com/lioratech/20min
```

---

## Costs Estimate:

**Per roadmap generation:**
- Claude API: ~$1-2 (16k tokens output)
- Gotenberg: Free (self-hosted)
- Email: Free (Gmail)
- Storage: ~$0.01 (Google Drive)

**Total:** ~$1-2 per roadmap

**Með 10 roadmaps/mánuð:** ~$20/mán operating cost

---

## Next Steps:

1. ✅ Set up n8n workflow
2. ✅ Test með fake data
3. ✅ Integrate Stripe payment (before going live)
4. ✅ Test end-to-end
5. ✅ Go live!

---

**Spurningar?** Hafðu samband!
