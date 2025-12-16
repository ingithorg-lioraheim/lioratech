# Google Drive Integration Setup

**Date:** 2025-12-16
**Purpose:** Connect n8n workflow to Google Drive for automated order processing

---

## 📁 STEP 1: CREATE FOLDER STRUCTURE IN GOOGLE DRIVE

**Go to:** [drive.google.com](https://drive.google.com) (sign in as ingi@lioratech.is)

**Create this structure:**

```
My Drive/
└── LioraTech-COO/
    ├── umsóknir/           (form submissions from n8n)
    ├── pending/            (ready for processing)
    ├── processing/         (currently being worked on)
    ├── completed/          (finished .md analyses)
    │   ├── md-files/       (markdown greiningarnar)
    │   └── pdf-files/      (final PDFs)
    └── approved/           (after CEO review & approval)
```

**To create:**
1. Click "New" → "New folder"
2. Name: `LioraTech-COO`
3. Open folder, create subfolders: `umsóknir`, `pending`, `processing`, `completed`, `approved`
4. Inside `completed/`, create: `md-files` and `pdf-files`

---

## 🔑 STEP 2: SET UP GOOGLE DRIVE API IN N8N

### **2.1 - Connect Google Drive to n8n**

In n8n workflow editor:

1. **Add Google Drive node**
   - Click "+" → Search "Google Drive"
   - Select "Google Drive" node

2. **Create credentials**
   - Click "Create New Credential"
   - Choose: "Google Drive OAuth2 API"
   - Click "Connect my account"
   - Sign in with: **ingi@lioratech.is**
   - Grant permissions (allow all)

3. **Test connection**
   - Should show: "Connected successfully"

---

## 🔄 STEP 3: N8N WORKFLOW CONFIGURATION

### **Workflow Steps:**

```
[1] Form Trigger
     ↓
[2] Process Form Data
     - Extract: company name, email, industry, etc.
     - Format as JSON
     ↓
[3] Google Drive: Create File in "umsóknir/"
     - Folder ID: [get from Drive]
     - Filename: AI-{{$now.format('YYYY-MM-DD')}}-{{$randomString}}-{{company}}.json
     - Content: {{$json}}
     ↓
[4] Google Drive: Copy File to "pending/"
     - Source: File from step 3
     - Destination folder: pending/
     ↓
[5] Gmail: Send to Customer
     - To: {{customer_email}}
     - Subject: "Staðfesting - AI greining í vinnslu"
     - Body: [confirmation template]
     ↓
[6] Gmail: Send to CEO (Ingi)
     - To: ingi@lioratech.is
     - Subject: "🔔 Ný AI-greining pöntun: {{company}}"
     - Body: "Order ID: {{order_id}}\n\nRun: ./coo check"
```

---

## 📝 STEP 4: GET FOLDER IDs FROM GOOGLE DRIVE

**You need folder IDs for n8n configuration:**

### **How to get Folder ID:**

1. Go to drive.google.com
2. Open folder (e.g., "umsóknir")
3. Look at URL: `https://drive.google.com/drive/folders/ABC123XYZ`
4. Copy the ID: `ABC123XYZ`

**Get IDs for these folders:**
- `umsóknir/` → Folder ID: `______________`
- `pending/` → Folder ID: `______________`
- `processing/` → Folder ID: `______________`
- `completed/md-files/` → Folder ID: `______________`
- `completed/pdf-files/` → Folder ID: `______________`
- `approved/` → Folder ID: `______________`

**Fill in these IDs and use them in n8n configuration.**

---

## 🖥️ STEP 5: LOCAL COO-AGENT INTEGRATION

### **Install Google Drive API client:**

```bash
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent
npm install googleapis
```

### **Create Google Drive fetch script:**

File: `scripts/fetch-from-drive.js`

This script will:
1. Connect to Google Drive API
2. List files in `pending/` folder
3. Download them to local `requests/pending/`
4. Process with existing COO scripts

---

## 🚀 STEP 6: WORKFLOW EXECUTION

### **When form is submitted:**

1. n8n creates file in Google Drive `umsóknir/`
2. n8n copies file to `pending/`
3. n8n sends emails (customer + you)

### **When you're ready to process:**

```bash
cd coo-agent
./coo fetch    # Downloads from Google Drive pending/
./coo check    # Processes downloaded files
```

### **After processing:**

1. Files moved to `completed/md-files/` (in Drive)
2. You get email: "Ready for review"
3. You review & edit (via drive.google.com or download)
4. You run: `./coo approve ORDER-ID`
5. PDF generated → uploaded to `completed/pdf-files/`
6. Email sent to you with PDF

---

## ✅ BENEFITS OF THIS APPROACH

- ✅ No desktop app needed
- ✅ Works 24/7 (n8n always running)
- ✅ Computer can be off when order comes in
- ✅ Files accessible from anywhere (drive.google.com)
- ✅ On-demand sync (only when you run ./coo)
- ✅ Cloud backup of all orders & analyses
- ✅ Can share folders with team later
- ✅ Free tier supports this volume

---

## 📋 NEXT STEPS

1. ✅ Create folder structure in Google Drive
2. ⏳ Get folder IDs
3. ⏳ Set up n8n Google Drive credentials
4. ⏳ Configure n8n workflow
5. ⏳ Install googleapis in coo-agent
6. ⏳ Create fetch script
7. ⏳ Test full workflow

---

## 🆘 TROUBLESHOOTING

**If n8n can't connect to Google Drive:**
- Check OAuth2 permissions
- Re-authenticate if needed
- Verify account is ingi@lioratech.is

**If files don't appear locally:**
- Check folder IDs are correct
- Verify API credentials
- Check fetch script permissions

**If processing fails:**
- Verify JSON format from n8n
- Check file naming convention
- Review logs: `./coo status`

---

*Setup guide for COO-Agent Google Drive integration*
