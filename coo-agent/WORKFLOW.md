# COO-AGENT COMPLETE WORKFLOW

**Last Updated:** 2025-12-16
**Purpose:** Complete documentation of how COO processes AI analysis orders

---

## 🎯 OVERVIEW

Google Drive is the **single source of truth**. All files live there, and COO syncs when needed.

---

## 📁 GOOGLE DRIVE STRUCTURE

```
LioraTech-COO/
├── umsóknir/          → Raw form submissions from n8n (JSON files)
├── pending/           → Ready to be processed by COO-Agent
├── processing/        → AWAITING CEO REVIEW (generated analyses)
├── approved/          → CEO-approved analyses (ready for PDF conversion)
└── completed/
    ├── md-files/      → Finished markdown analyses (after PDF created)
    └── pdf-files/     → Final customer-ready PDFs
```

### Folder IDs (in .google-drive-config.json)
- `umsóknir`: 1Jv430KMXHrBy-H1VN6_gKIZiltra1zAx
- `pending`: 1LAL8vJz3PCiTDCL1igTqNtqsO0pI4ap-
- `processing`: 1STPVRw0fEvi5Vlyl2tVKNWjkv_j4B-jb
- `md-files`: 1a_YhCd91zskn4iiS9IORBLt_h-f9-eBq
- `pdf-files`: 11lkeid_hiMYzXFc9NjtgUz7parsrx2E_
- `approved`: 1T4MymIQTEuk9iaD7wVxHgm5905kWrRS6

---

## 🔄 COMPLETE WORKFLOW

### Step 1: Customer Submits Form (n8n Webhook)
**Trigger:** Customer fills out form on lioratech.is

**n8n actions:**
1. Generates Order ID (e.g., `AI-2025-12-16-G6AOE4`)
2. Creates JSON file with order data
3. Uploads to Google Drive:
   - `umsóknir/` (archive copy)
   - `pending/` (ready for processing)
4. Sends emails:
   - **Customer:** Confirmation email
   - **CEO (Ingi):** Notification with order details

**Output files:**
```
LioraTech-COO/
├── umsóknir/
│   └── AI-2025-12-16-G6AOE4-CompanyName.json
└── pending/
    └── AI-2025-12-16-G6AOE4-CompanyName.json
```

---

### Step 2: COO Fetches New Orders
**When:** CEO runs `./coo fetch` or asks "COO, hver er staðan?"

**What happens:**
```bash
cd coo-agent
./coo fetch
```

1. Connects to Google Drive API
2. Lists files in `pending/` folder
3. Downloads them to local `requests/pending/`
4. Logs what was fetched

**Result:**
- Files are now local and ready to process
- Google Drive `pending/` still has copies (not moved yet)

---

### Step 3: COO Processes Pending Requests
**When:** CEO runs `./coo check`

**What happens:**
```bash
cd coo-agent
./coo check
```

1. Reads all files in local `requests/pending/`
2. For each order:
   - Sends to AI (Claude/Gemini)
   - Generates markdown analysis
   - Saves to local `products/completed/`
3. Moves local request to `requests/completed/`
4. **Uploads MD to Google Drive `processing/` folder**

**Output files:**
```
LioraTech-COO/
└── processing/
    └── AI-2025-12-16-G6AOE4-CompanyName-ai-greining.md
```

**Email sent:**
- **CEO (Ingi):** "AI greining tilbúin til endurskoðunar: [Company Name]"

---

### Step 4: CEO Reviews Analysis (MANUAL)
**When:** CEO checks email notification or Drive folder

**What CEO does:**
1. Opens Google Drive in browser: `drive.google.com`
2. Navigates to: `LioraTech-COO/processing/`
3. Opens the markdown file (can edit in Drive or download)
4. Reviews content:
   - Check accuracy
   - Fix any errors
   - Verify all details (contact info, links, etc.)
5. **When satisfied, manually moves/copies file to `approved/` folder**

**Result:**
```
LioraTech-COO/
├── processing/
│   └── (empty - file moved)
└── approved/
    └── AI-2025-12-16-G6AOE4-CompanyName-ai-greining-clean.md
```

---

### Step 5: COO Converts Approved to PDF
**When:** CEO runs `./coo approve`

**What happens:**
```bash
cd coo-agent
./coo approve
```

1. Checks Google Drive `approved/` folder
2. For each markdown file found:
   - Downloads MD content
   - Converts to professional PDF
   - Uploads PDF to `completed/pdf-files/`
   - **Moves MD from `approved/` to `completed/md-files/`**
3. Logs completion

**Output files:**
```
LioraTech-COO/
└── completed/
    ├── md-files/
    │   └── AI-2025-12-16-G6AOE4-CompanyName-ai-greining-clean.md
    └── pdf-files/
        └── AI-2025-12-16-G6AOE4-CompanyName-ai-greining-clean.pdf
```

**Email sent:**
- **CEO (Ingi):** "PDF tilbúið til sendingar: [Company Name]"

---

### Step 6: CEO Sends PDF to Customer (MANUAL)
**When:** CEO receives PDF notification email

**What CEO does:**
1. Downloads PDF from `completed/pdf-files/` or gets link from email
2. Sends to customer via email
3. Marks order as delivered in tracking system (if applicable)

---

## 🎬 QUICK COMMAND SEQUENCE

### Full processing workflow:
```bash
# 1. Check status
./coo status

# 2. Fetch new orders from Drive
./coo fetch

# 3. Process them (generate AI analyses)
./coo check

# 4. (CEO manually reviews and moves to approved/)

# 5. Convert approved to PDF
./coo approve
```

### One-liner for batch processing:
```bash
./coo fetch && ./coo check && ./coo approve
```

---

## 📋 CEO WORKFLOWS

### Morning routine:
1. Open terminal
2. Type: "COO, hver er staðan?"
3. Review what COO reports
4. Run: `./coo fetch && ./coo check`
5. Review analyses in Google Drive
6. Move approved items to `approved/`
7. Run: `./coo approve`

### Quick check:
```bash
cd coo-agent
./coo status
```

### Continuous monitoring (background):
```bash
cd coo-agent
./coo watch
```
This runs continuously and processes new orders as they arrive.

---

## 🔔 EMAIL NOTIFICATIONS

### Customer receives:
- **Subject:** "Staðfesting - AI greining í vinnslu"
- **Content:** Order confirmation, what to expect, timeline

### CEO receives (Ingi):
1. **New order:** "🔔 Ný AI-greining pöntun: [Company]"
2. **Analysis ready:** "AI greining tilbúin til endurskoðunar: [Company]"
3. **PDF ready:** "PDF tilbúið til sendingar: [Company]"

---

## ⚙️ COO COMMANDS REFERENCE

| Command | Description | When to Use |
|---------|-------------|-------------|
| `./coo setup` | Configure Google Drive auth | First time only |
| `./coo fetch` | Download from Drive `pending/` | Get new orders |
| `./coo check` | Process local pending requests | Generate AI analyses |
| `./coo approve` | Convert approved MD to PDF | After CEO review |
| `./coo watch` | Continuous monitoring | Background automation |
| `./coo status` | Show pipeline state | Quick check |
| `./coo help` | Show all commands | Reference |

---

## 🚨 TROUBLESHOOTING

### "No files found in pending/"
- Check Google Drive: Are there files in `LioraTech-COO/pending/`?
- Run: `./coo fetch` to download them

### "Permission denied" or "Auth error"
- Run: `./coo setup` to re-authenticate
- Make sure you're signed in as ingi@lioratech.is

### "PDF generation failed"
- Check that markdown file is valid
- Verify template exists in `templates/`
- Check logs for specific error

### "File not moving to approved/"
- This is a **manual step** - CEO must move files
- Use Google Drive web interface (drive.google.com)
- Drag file from `completed/md-files/` to `approved/`

---

## 📊 TRACKING & METRICS

COO tracks:
- Orders processed
- Success rate
- Average processing time
- Files in each stage
- Errors and blockers

View in: `COO-STATUS.md` or ask "COO, hver er staðan?"

---

## 🎯 KEY PRINCIPLES

1. **Google Drive is truth** - All files live there
2. **Local is temporary** - Local files are for processing only
3. **CEO approves** - Manual review step is intentional
4. **Automate everything else** - COO handles the rest
5. **Status always visible** - Ask COO anytime

---

## 🔐 SECURITY & BACKUP

- All files backed up in Google Drive
- OAuth2 for authentication (tokens in `.google-drive-token.json`)
- Never commit tokens to git (in .gitignore)
- Files never deleted, only moved
- Full audit trail via Drive version history

---

## 🚀 FUTURE ENHANCEMENTS

Potential improvements:
- [ ] Auto-email PDF to customer when ready
- [ ] Dashboard for CEO to see status visually
- [ ] Slack notifications instead of email
- [ ] Quality checks before CEO review
- [ ] A/B testing different analysis templates

---

*COO-Agent: Efficient, automated, always operational*
