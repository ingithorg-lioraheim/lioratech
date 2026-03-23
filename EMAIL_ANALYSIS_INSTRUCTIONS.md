# LioraTech Email Analysis - Instructions

## Status: ⏳ Waiting for Google Takeout Export

**Export started:** January 14, 2026, 2:47 PM
**Expected:** 1-6 hours (or up to a few days)

---

## What to do when you get the export:

### 1. Download the file
- Check your email (ingi@kiwi.is) for Google Takeout notification
- Click the download link
- Save the .zip file to `/Users/ingithor/Downloads/`

### 2. Extract the file
```bash
cd ~/Downloads
unzip takeout-*.zip
```

This will create a folder like: `Takeout/Mail/`

### 3. Find the .mbox file
The file will be something like:
```
Takeout/Mail/All mail Including Spam and Trash.mbox
```

### 4. Run the analysis
```bash
cd ~/Projects/lioratech
python3 analyze_emails_enhanced.py "/Users/ingithor/Downloads/Takeout/Mail/All mail Including Spam and Trash.mbox"
```

---

## What the script does:

✅ Reads all your emails from the MBOX file
✅ Matches emails to your 707 contacts
✅ Counts emails sent/received per contact
✅ Finds last contact date
✅ Analyzes content for LioraTech opportunities:
  - Analytics, data, marketing keywords
  - Business topics
  - Recent activity
✅ Assigns priority scores (1-5)
✅ Generates notes for each contact
✅ **Recommends LioraTech product** (Frí/30 daga/12 mánaða/Customized)
✅ **For Customized: Creates product description** tailored to their needs
✅ **Researches company** based on domain and email history
✅ Creates: `lioratech_analyzed_opportunities.csv`

---

## Output file:

**`lioratech_analyzed_opportunities.csv`** will contain:
- Name
- Email
- Company/Domain
- **Company Research** (what they do, industry, context) 📊
- Total Emails (sent + received)
- Last Contact Date
- **Priority Score (1-5)** ⭐
- **Recommended Product** (Frí/30 daga/12 mánaða/Customized) 🎁
- **Custom Product Details** (if Customized) 📝
- **Analysis Notes** (why this is a good opportunity)
- Outreach Status
- Outreach Notes (for your tracking)

---

## Priority Scoring:

**Priority 5** 🌟🌟🌟🌟🌟
- Heavy email history (50+ emails)
- Recent contact (< 90 days)
- Relevant topics discussed
- KIWI colleagues or business contacts

**Priority 4** 🌟🌟🌟🌟
- Moderate email history (20-50 emails)
- Contacted within past year
- Some relevant topics

**Priority 3** 🌟🌟🌟
- Some email history (5-20 emails)
- Business email domain

**Priority 1-2** 🌟
- Limited email history
- Older contacts

---

## Product Recommendations:

The script automatically recommends products based on:

**Frí greining** (Free Analysis)
- Low email volume (< 5 emails)
- Personal contacts
- Testing the waters

**30 daga plan**
- Moderate relationship (5-20 emails)
- Small to medium business
- Trial/initial engagement

**12 mánaða roadmap**
- Strong relationship (20+ emails)
- Established business contact
- Former KIWI colleagues (warm leads)
- Clear business needs identified

**Customized**
- Heavy email history (30+ emails)
- Multiple specific needs identified (analytics + marketing, growth, web optimization)
- **Includes tailored product description**, e.g.:
  - "Full marketing analytics stack: Campaign tracking, ROI analysis..."
  - "Growth-focused data strategy: Market analysis, customer insights..."
  - "Web optimization suite: Traffic analysis, conversion tracking..."

---

## Company Research:

For each contact, the script researches:
- Company type (retail, tourism, tech, services, etc.)
- What they do (based on domain and email content)
- Relationship context (KIWI network, business type)
- Whether it's a real business or personal/ehf email

Example outputs:
- "Hagkaup - Icelandic retail company. Contact established through KIWI network."
- "Former KIWI colleague - warm lead with existing relationship from advertising/marketing background"
- "SmartMedia - Marketing company. Has existing relationship through KIWI network."

---

## Next Steps After Analysis:

1. Open `lioratech_analyzed_opportunities.csv` in Excel/Google Sheets
2. Sort by Priority (highest first)
3. Review each contact's:
   - **Company Research** to understand their business
   - **Recommended Product** to know what to pitch
   - **Custom Product Details** if applicable
   - **Analysis Notes** for relationship context
4. Start outreach with Priority 5 contacts
5. Use the product recommendation as your opening:
   - For "Frí greining": Offer free analysis to start conversation
   - For "30 daga plan": Pitch quick-win trial period
   - For "12 mánaða roadmap": Present long-term strategic partnership
   - For "Customized": Use the specific product description provided
6. Focus on:
   - Former KIWI colleagues (warm leads) - mention shared background
   - Recent contacts (< 90 days) - "following up on our recent conversation"
   - High email volume (strong relationship) - reference your history

---

## Need Help?

If the script doesn't work or you need assistance:
1. Check the file path is correct
2. Make sure the .mbox file is fully extracted
3. Let me know the error message

---

**Current Files:**
- ✅ `lioratech_outreach_complete.csv` - All 707 contacts
- ✅ `kiwi_contacts_only.csv` - 45 KIWI contacts
- ✅ `analyze_emails_enhanced.py` - Enhanced analysis script with product recommendations & company research
- ⏳ Waiting for MBOX file from Google Takeout

**New Features:**
- 🎁 Automatic product recommendation for each contact
- 📝 Custom product descriptions for tailored solutions
- 📊 Company research based on domain and email history
