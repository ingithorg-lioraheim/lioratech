# 📊 GOOGLE SHEETS CRM SETUP - LioraTech

**Markmið:** Eitt master sheet sem heldur utan um allar customer touchpoints frá n8n workflows

---

## 🎯 SHEET STRUCTURE

Búðu til **eitt Google Sheet** með **4 tabs**:

1. **🏠 Master Dashboard** - Yfirlit yfir allt
2. **🆓 Ókeypis Greiningar** - Free AI analysis requests
3. **💰 30 Daga Roadmaps** - Paid roadmap purchases
4. **💼 Verðtilboð** - Quote requests (custom projects)

---

## 📋 TAB 1: MASTER DASHBOARD

**Tilgangur:** Quick overview af öllum leads og revenue

### Columns:

| Column | Type | Purpose |
|--------|------|---------|
| **Mánuður** | Text | 2026-01, 2026-02, etc. |
| **Ókeypis greiningar** | Number | Count |
| **30 daga keypt** | Number | Count |
| **Verðtilboð send** | Number | Count |
| **Revenue (ISK)** | Number | Total revenue |
| **Conversion rate** | Formula | `=30dagakeypt / Ókeypis greiningar` |

### Sample formulas:
```
// Count ókeypis greiningar this month
=COUNTIF('Ókeypis Greiningar'!A:A, "2026-01*")

// Sum revenue from 30 day roadmaps this month
=SUMIF('30 Daga Roadmaps'!A:A, "2026-01*", '30 Daga Roadmaps'!G:G)
```

---

## 📋 TAB 2: ÓKEYPIS GREININGAR

**Workflow:** `LioraTech - WORKING Email Workflow v2 (Frí AI-greingin)`

### Columns:

| # | Column Name | Type | Source (n8n) | Example | Notes |
|---|-------------|------|--------------|---------|-------|
| A | **Dagsetning** | Date | `timestamp` | 2026-01-02 | Auto from n8n |
| B | **Order ID** | Text | `orderId` | AI-2026-01-02-ABC123 | Unique identifier |
| C | **Fyrirtæki** | Text | `companyName` | Fyrirtæki ehf | Company name |
| D | **Netfang** | Email | `email` | jon@fyrirtaeki.is | Contact email |
| E | **Atvinnugrein** | Text | `industry` | Smásala | Industry type |
| F | **Starfsmenn** | Text | `employees` | 10-25 | Team size |
| G | **Vandamál** | Text | `currentChallenges` | Mikil handavinna... | Pain points |
| H | **Markmið** | Text | `goals` | Spara 10 klst/viku | Desired outcome |
| I | **Tímarammi** | Text | `timeline` | 30-60 dagar | Timeline |
| J | **Status** | Dropdown | Manual | Lead / Contacted / 30-day / Closed | Lead status |
| K | **Follow-up** | Date | Manual | 2026-01-09 | Next action date |
| L | **Notes** | Text | Manual | Sent greining 2026-01-03 | Internal notes |

### Data validation (Status column):
```
Lead
Contacted
Greining send
30-day sold
Verðtilboð óskað
Lost
Closed - No response
```

### Conditional formatting:
- **Status = "30-day sold"** → Green background
- **Status = "Lost"** → Red background
- **Follow-up date passed** → Yellow background (alert)

---

## 📋 TAB 3: 30 DAGA ROADMAPS

**Workflow:** `30-Day Roadmap with Payment (New)`

### Columns:

| # | Column Name | Type | Source (n8n) | Example | Notes |
|---|-------------|------|--------------|---------|-------|
| A | **Dagsetning** | Date | `timestamp` | 2026-01-02 14:23 | Order date |
| B | **Order ID** | Text | `orderId` | ORDER-2026-001 | Unique order ID |
| C | **Fyrirtæki** | Text | `customerData.companyName` | Fyrirtæki ehf | Company name |
| D | **Netfang** | Email | `email` | jon@fyrirtaeki.is | Customer email |
| E | **Atvinnugrein** | Text | `customerData.industry` | Tech | Industry |
| F | **Vandamál** | Text | `customerData.painPoints` | Manual work... | Pain points |
| G | **Verð (ISK)** | Number | `amount` | 86676 | Amount paid (with VSK) |
| H | **Payment ID** | Text | `paymentId` | teya_xxx | Teya payment reference |
| I | **Payment Status** | Text | `paymentStatus` | completed | Payment state |
| J | **Roadmap Status** | Dropdown | Manual | Pending / In Progress / Delivered | Production status |
| K | **COO Start** | Datetime | Manual | 2026-01-02 14:30 | When COO-Agent started |
| L | **Delivered Date** | Date | Manual | 2026-01-05 | When roadmap was sent |
| M | **Delivery Time (hrs)** | Formula | `=(L-K)*24` | 2.5 | Time to deliver |
| N | **Customer Rating** | Number | Manual | 9 | 1-10 rating |
| O | **Notes** | Text | Manual | Customer very happy | Internal notes |

### Data validation (Roadmap Status):
```
Pending
In Progress (COO-Agent)
Ready for Review
Delivered
Revision Requested
Completed
```

### Conditional formatting:
- **Roadmap Status = "Delivered"** → Green
- **Delivery Time > 24 hrs** → Yellow (warning)
- **Delivery Time > 48 hrs** → Red (SLA breach)

### KPI Formulas:
```
// Average delivery time
=AVERAGE(M:M)

// Revenue this month
=SUMIF(A:A, "2026-01*", G:G)

// Completion rate
=COUNTIF(J:J, "Delivered") / COUNTA(B:B)
```

---

## 📋 TAB 4: VERÐTILBOÐ

**Workflow:** `LioraTech - Verðtilboð (Quote Request)`

### Columns:

| # | Column Name | Type | Source (n8n) | Example | Notes |
|---|-------------|------|--------------|---------|-------|
| A | **Dagsetning** | Date | `timestamp` | 2026-01-02 | Request date |
| B | **Quote ID** | Text | `orderId` | QUOTE-2026-01-02-ABC123 | Unique ID |
| C | **Fyrirtæki** | Text | `companyName` | Stórt ehf | Company name |
| D | **Tengiliður** | Text | `name` | Jón Jónsson | Contact person |
| E | **Netfang** | Email | `email` | jon@stortehf.is | Email |
| F | **Símanúmer** | Phone | `phone` | 777-7777 | Phone |
| G | **Vefsíða** | URL | `website` | https://stortehf.is | Company website |
| H | **Starfsmenn** | Text | `employees` | 50+ | Team size |
| I | **Áhugi** | Text | `serviceInterest` | 12-month-roadmap | Service type |
| J | **Markmið** | Text | `goals` | Automate sales... | Goals |
| K | **Budget** | Text | `budget` | 300-500k | Budget range |
| L | **Status** | Dropdown | Manual | New / Quote Sent / Meeting / Won / Lost | Deal status |
| M | **Quote Sent Date** | Date | Manual | 2026-01-03 | When quote was sent |
| N | **Quote Amount (ISK)** | Number | Manual | 450000 | Quoted price |
| O | **Meeting Date** | Date | Manual | 2026-01-10 | Scheduled meeting |
| P | **Won Date** | Date | Manual | 2026-01-15 | If deal won |
| Q | **Won Amount (ISK)** | Number | Manual | 450000 | Actual revenue |
| R | **Lost Reason** | Text | Manual | Too expensive | Why lost |
| S | **Notes** | Text | Manual | Very promising lead | Internal notes |

### Data validation (Status):
```
New
Quote Sent
Meeting Scheduled
Follow-up
Won
Lost
On Hold
```

### Data validation (Service Interest):
```
12-month-roadmap
full-implementation
ai-rekstrarhald-monthly
not-sure
custom
```

### Conditional formatting:
- **Status = "Won"** → Dark green
- **Status = "Quote Sent"** AND **Days since > 7** → Yellow (follow up!)
- **Status = "Lost"** → Red
- **Budget = "500k+"** → Light blue (high value)

### KPI Formulas:
```
// Win rate
=COUNTIF(L:L, "Won") / (COUNTIF(L:L, "Won") + COUNTIF(L:L, "Lost"))

// Average deal size
=AVERAGE(Q:Q)

// Revenue this month
=SUMIF(P:P, "2026-01*", Q:Q)

// Pipeline value (all open quotes)
=SUMIF(L:L, "Quote Sent", N:N) + SUMIF(L:L, "Meeting Scheduled", N:N)
```

---

## 🔗 N8N INTEGRATION

Þú getur bætt **Google Sheets** node í hvert n8n workflow til að auto-populate:

### 1. Í "Ókeypis Greining" workflow:

**Add node:** Google Sheets → Append
```javascript
Spreadsheet: LioraTech CRM Master
Sheet: Ókeypis Greiningar
Values:
  - {{ $now.toFormat('yyyy-MM-dd HH:mm') }}
  - {{ $json.orderId }}
  - {{ $json.orderData.companyName }}
  - {{ $json.orderData.email }}
  - {{ $json.orderData.industry }}
  - {{ $json.orderData.employees }}
  - {{ $json.orderData.currentChallenges }}
  - {{ $json.orderData.goals }}
  - {{ $json.orderData.timeline }}
  - Lead  // Default status
  - {{ $now.plus({days: 7}).toFormat('yyyy-MM-dd') }}  // Follow-up in 7 days
  - (empty)  // Notes
```

### 2. Í "30 Daga Roadmap" workflow:

**Add node:** Google Sheets → Append
```javascript
Spreadsheet: LioraTech CRM Master
Sheet: 30 Daga Roadmaps
Values:
  - {{ $now.toFormat('yyyy-MM-dd HH:mm') }}
  - {{ $json.orderId }}
  - {{ $json.customerData.companyName }}
  - {{ $json.email }}
  - {{ $json.customerData.industry }}
  - {{ $json.customerData.painPoints }}
  - {{ $json.amount }}
  - {{ $json.paymentId }}
  - {{ $json.paymentStatus }}
  - Pending  // Default roadmap status
  - {{ $now.toFormat('yyyy-MM-dd HH:mm') }}  // COO start time
  - (empty)  // Delivered date
  - (empty)  // Delivery time
  - (empty)  // Rating
  - (empty)  // Notes
```

### 3. Í "Verðtilboð" workflow:

**Add node:** Google Sheets → Append
```javascript
Spreadsheet: LioraTech CRM Master
Sheet: Verðtilboð
Values:
  - {{ $now.toFormat('yyyy-MM-dd') }}
  - {{ $json.orderId }}
  - {{ $json.orderData.companyName }}
  - {{ $json.orderData.name }}
  - {{ $json.orderData.email }}
  - {{ $json.orderData.phone }}
  - {{ $json.orderData.website }}
  - {{ $json.orderData.employees }}
  - {{ $json.orderData.serviceInterest }}
  - {{ $json.orderData.goals }}
  - {{ $json.orderData.budget }}
  - New  // Default status
  - (empty)  // Quote sent date
  - (empty)  // Quote amount
  - (empty)  // Meeting date
  - (empty)  // Won date
  - (empty)  // Won amount
  - (empty)  // Lost reason
  - (empty)  // Notes
```

---

## 📊 DASHBOARD VISUALIZATIONS

Í **Master Dashboard** tab, búðu til:

### 1. Chart: Revenue Over Time
- Type: Line chart
- X-axis: Mánuður
- Y-axis: Revenue (ISK)
- Data: Column E (Revenue)

### 2. Chart: Lead Funnel
- Type: Funnel chart
- Data:
  - Ókeypis greiningar (top)
  - 30 daga keypt (middle)
  - Verðtilboð send (bottom)

### 3. Chart: Conversion Rates
- Type: Pie chart
- Data: Lead status breakdown from Ókeypis Greiningar

---

## 🎨 FORMATTING TIPS

### Header Row (Row 1):
- **Background:** #1e3a8a (brand primary blue)
- **Text:** White, Bold
- **Font:** Arial, 11pt
- **Freeze:** Row 1 (View → Freeze → 1 row)

### Data rows:
- **Alternate colors:** Light blue (#f0f4f8) and white
- **Borders:** Light gray borders between columns

### Date columns:
- **Format:** `yyyy-MM-dd` (e.g., 2026-01-02)
- **Alignment:** Left

### Number columns (Revenue, Amount):
- **Format:** `#,##0 "kr"` (e.g., 86,676 kr)
- **Alignment:** Right

### Email columns:
- **Hyperlink formula:** `=HYPERLINK("mailto:" & D2, D2)`

### Website columns:
- **Hyperlink formula:** `=HYPERLINK(G2, G2)`

---

## ✅ SETUP CHECKLIST

- [ ] Búa til nýtt Google Sheet: "LioraTech CRM Master"
- [ ] Búa til 4 tabs (Dashboard, Ókeypis, 30 Daga, Verðtilboð)
- [ ] Setja upp columns í hverju tab
- [ ] Setja upp data validation (dropdowns)
- [ ] Setja upp conditional formatting
- [ ] Setja upp formulas í Dashboard
- [ ] Búa til charts
- [ ] Share með ingi@lioratech.is (full access)
- [ ] Add Google Sheets nodes í n8n workflows
- [ ] Test með sample data
- [ ] Verify auto-population virkar

---

## 🔐 PERMISSIONS

**Deila sheet með:**
- ingi@lioratech.is (Owner)
- ingithorg@gmail.com (Editor) - backup access

**Link sharing:** OFF (Private only)

---

## 📞 GOOGLE SHEETS API SETUP (fyrir n8n)

1. **Í n8n:** Settings → Credentials → Add Credential → Google Sheets OAuth2
2. **Authorize** með ingi@lioratech.is account
3. **Permissions:** Allow full access to Google Sheets
4. **Test:** Add node → Google Sheets → Read → Select your sheet

---

## 🎯 KPIs TIL AÐ FYLGJAST MEÐ

### Weekly:
- Nýjar ókeypis greiningar (target: 5-10)
- 30 daga sold (target: 2-3)
- Conversion rate (target: 20-30%)
- Average delivery time (target: <24hrs)

### Monthly:
- Total revenue (target: 200k+ ISK)
- Win rate fyrir quotes (target: 30%+)
- Customer satisfaction (target: 8.5/10+)
- Pipeline value (target: 500k+ ISK)

---

## 📄 EXPORT & BACKUP

**Automatic backup:**
- File → Version history → Auto-save every change
- Google Workspace keeps 30 days of history

**Manual backup:**
- File → Download → Excel (.xlsx)
- Save to Google Drive folder: "LioraTech/Backups/CRM/"
- Frequency: Weekly (every Monday)

---

**Ready to set up?** Byrjaðu á að búa til blank Google Sheet og fylgdu checklist-inu!
