# 📥 GOOGLE SHEETS IMPORT - Einfaldar leiðbeiningar

## 🚀 Skref-fyrir-skref (5 mínútur)

### 1. Búa til nýtt Google Sheet

1. Farðu á https://sheets.google.com
2. Smelltu á **+ Blank** (nýtt tómt sheet)
3. Endurnefna: "LioraTech CRM Master"

---

### 2. Import Tab 1 - Master Dashboard

1. Í Google Sheets: **File → Import**
2. **Upload** tab → Smelltu á **Browse**
3. Veldu: `1-Master-Dashboard.csv`
4. Import settings:
   - **Import location:** "Replace current sheet"
   - **Separator type:** "Comma"
   - **Convert text to numbers:** ✅ Yes
5. Smelltu **Import data**
6. Endurnefna tab-ið: "Master Dashboard"

---

### 3. Import Tab 2 - Ókeypis Greiningar

1. Neðst vinstra megin: Smelltu á **+ Add sheet** (við hliðina á tab-unum)
2. Nýr tab birtist
3. **File → Import**
4. **Upload** tab → Veldu: `2-Okeypis-Greiningar.csv`
5. Import settings:
   - **Import location:** "Replace current sheet"
   - **Separator type:** "Comma"
6. Smelltu **Import data**
7. Endurnefna tab-ið: "Ókeypis Greiningar"

---

### 4. Import Tab 3 - 30 Daga Roadmaps

1. Smelltu **+ Add sheet** aftur
2. **File → Import**
3. Veldu: `3-30-Daga-Roadmaps.csv`
4. Import settings: Same sem áður
5. Endurnefna tab: "30 Daga Roadmaps"

---

### 5. Import Tab 4 - Verðtilboð

1. Smelltu **+ Add sheet** aftur
2. **File → Import**
3. Veldu: `4-Verdtilbod.csv`
4. Import settings: Same sem áður
5. Endurnefna tab: "Verðtilboð"

---

## ✨ FORMATTING (5 mínútur)

### Fyrir ALLA tabs:

#### A. Format header row:
1. Veldu **Row 1** (smelltu á "1" til vinstri)
2. Toolbar:
   - **Background color:** Custom → `#1e3a8a` (dark blue)
   - **Text color:** White
   - **Bold:** ✅
   - **Font size:** 11

3. **View → Freeze → 1 row** (svo header haldist á sínum stað)

#### B. Auto-resize columns:
1. Veldu allar columns (smelltu á box efst vinstra megin)
2. Hægrismelltu á column header (A, B, C...)
3. **Resize columns A-Z**
4. Veldu **Fit to data**

---

## 🎨 DATA VALIDATION (Dropdowns)

### Í "Ókeypis Greiningar" tab:

1. Smelltu á **column J** (Status) header
2. **Data → Data validation**
3. Settings:
   - **Criteria:** "List of items"
   - **List items:** `Lead,Contacted,Greining send,30-day sold,Verðtilboð óskað,Lost,Closed`
   - **Show dropdown:** ✅
   - **Reject input:** ✅
4. Smelltu **Done**

---

### Í "30 Daga Roadmaps" tab:

1. Smelltu á **column J** (Roadmap Status)
2. **Data → Data validation**
3. List items: `Pending,In Progress (COO-Agent),Ready for Review,Delivered,Revision Requested,Completed`
4. **Done**

---

### Í "Verðtilboð" tab:

1. Smelltu á **column L** (Status)
2. **Data → Data validation**
3. List items: `New,Quote Sent,Meeting Scheduled,Follow-up,Won,Lost,On Hold`
4. **Done**

5. Smelltu á **column I** (Áhugi)
6. **Data → Data validation**
7. List items: `12-month-roadmap,full-implementation,ai-rekstrarhald-monthly,not-sure,custom`
8. **Done**

---

## 🌈 CONDITIONAL FORMATTING

### Í "Ókeypis Greiningar" tab:

1. Veldu **column J** (Status column)
2. **Format → Conditional formatting**
3. **Add rule:**
   - **Format cells if:** "Text contains"
   - **Value:** `30-day sold`
   - **Formatting style:**
     - Background: Light green `#d9ead3`
     - Text: Dark green `#274e13`
   - **Done**

4. **Add another rule:**
   - Text contains: `Lost`
   - Background: Light red `#f4cccc`
   - Done

---

### Í "30 Daga Roadmaps" tab:

1. Veldu **column J** (Roadmap Status)
2. Conditional formatting:
   - **Text contains:** `Delivered`
   - **Background:** Light green `#d9ead3`
   - Done

---

### Í "Verðtilboð" tab:

1. Veldu **column L** (Status)
2. Conditional formatting:
   - **Text contains:** `Won`
   - **Background:** Dark green `#b6d7a8`
   - Done

3. Add rule:
   - **Text contains:** `Lost`
   - **Background:** Light red `#f4cccc`
   - Done

---

## 🔗 FORMULAS (Dashboard KPIs)

### Í "Master Dashboard" tab:

#### Row 2 (2026-01):

**Cell B2** (Ókeypis greiningar count):
```
=COUNTIF('Ókeypis Greiningar'!A:A,"2026-01*")
```

**Cell C2** (30 daga keypt):
```
=COUNTIF('30 Daga Roadmaps'!A:A,"2026-01*")
```

**Cell D2** (Verðtilboð send):
```
=COUNTIF('Verðtilboð'!A:A,"2026-01*")
```

**Cell E2** (Revenue):
```
=SUMIF('30 Daga Roadmaps'!A:A,"2026-01*",'30 Daga Roadmaps'!G:G)+SUMIF('Verðtilboð'!P:P,"2026-01*",'Verðtilboð'!Q:Q)
```

**Cell F2** (Conversion rate):
```
=IF(B2>0,C2/B2*100&"%","0%")
```

#### Copy formulas niður:
1. Veldu cells B2:F2
2. Copy (Cmd+C)
3. Veldu B3:B7
4. Paste (Cmd+V)
5. Breyta month í formulas (2026-01 → 2026-02, etc.)

---

## ✅ SHARE SHEET

1. **Efst hægra megin:** Smelltu á **Share**
2. **Add people:**
   - `ingi@lioratech.is` → **Owner**
   - `ingithorg@gmail.com` → **Editor** (backup)
3. **Link sharing:** "Restricted" (bara þú og þeir sem þú deilir með)
4. **Done**

---

## 🎉 KLÁRAÐ!

Þú ert núna með professional CRM sheet tilbúið!

**Næsta skref:** Tengja við n8n (sjá GOOGLE-SHEETS-CRM-SETUP.md)

---

## 🆘 Ef eitthvað fer úrskeiðis:

**Problem:** CSV import virkar ekki
**Solution:** Vistaðu CSV files sem UTF-8 encoding og reyndu aftur

**Problem:** Íslenskir stafir (á, ð, þ) líta skrítið út
**Solution:** File → Spreadsheet settings → Locale → "Iceland"

**Problem:** Formulas virka ekki
**Solution:** Athugaðu að tab nöfnin séu nákvæmlega rétt (case-sensitive)
