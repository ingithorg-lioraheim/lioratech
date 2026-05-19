# Manual Review Workflow - Roadmap Delivery

## 🔄 Updated Flow (með Manual Review)

```
Viðskiptavinur kaupir → Svarar spurningum → Greiðir
                                                  ↓
                                    n8n webhook móttekur data
                                                  ↓
                                    Claude API býr til roadmap
                                                  ↓
                            📧 EMAIL til ÞÍN (info@lioratech.is)
                                                  ↓
                            👀 ÞÚ REVIEW-AR roadmap-ið
                                                  ↓
                            ✅ Þú sendir handvirkt á viðskiptavin
                                                  ↓
                            📞 Bókar follow-up samtal
```

---

## 📧 Email sem þú færð:

**Subject:** `🚀 Nýtt Roadmap tilbúið: [Fyrirtækjanafn]`

**Body:**
```
Hæ Ingi,

Nýtt roadmap er tilbúið og þarfnast review áður en það fer til viðskiptavinar.

📋 VIÐSKIPTAVINUR:
- Fyrirtæki: Íslenska Bókhaldstofan
- Netfang: jon@bokhalds.is
- Iðnaður: Bókhald
- Starfsmenn: 12

🎯 MARKMIÐ:
Spara tíma, sjálfvirka verkefni, etc.

⚠️ ÁSKORANIR:
Handvirkar skráningar, etc.

🛠️ NÚVERANDI TÓL:
Excel, Outlook, Dynamics 365

⏰ TÍMALÍNA:
Eins fljótt og hægt er

---

Roadmap-ið er í viðhengi. Review það og sendu svo handvirkt á jon@bokhalds.is

✅ TODO:
1. Lesa roadmap
2. Quality check
3. Forward til jon@bokhalds.is
4. Bóka 20 mín follow-up: https://calendly.com/lioratech/20min

---

LioraTech Roadmap Generator
```

**Attachment:** `Islenska_Bokhaldssta_-_30_Daga_AI_Roadmap.md`

---

## ✅ Þinn Review Process:

### **1. Opna attachment (2-5 mín)**
- Lesa Executive Summary
- Skima dagleg verkefni
- Check ef tool recommendations eru góðar
- Verify ROI estimates

### **2. Quality Check:**

**Checklist:**
- [ ] Roadmap er sérsniðið fyrir þennan iðnað (ekki generic)
- [ ] Tool recommendations eru realistic
- [ ] Dagleg verkefni eru executable
- [ ] Íslenska er góð (ekki þýðingamál)
- [ ] ROI estimates eru raunhæfar
- [ ] Timeline er realistic
- [ ] Engar villur í texta

### **3. Laga ef þarf (optional):**
- Opna í text editor
- Laga villur
- Bæta við dæmum
- Customize frekar

### **4. Forward til viðskiptavinar:**

**Email template til viðskiptavinar:**

```
Subject: Roadmap-ið þitt er tilbúið! 🚀

Halló [Nafn],

Takk fyrir að kaupa 30 daga AI Roadmap hjá LioraTech!

Roadmap-ið þitt fyrir [Fyrirtæki] er tilbúið og fylgir í viðhengi.

Næstu skref:
1. Lestu Executive Summary (fyrstu 3 síðurnar)
2. Byrjaðu á Degi 1 strax á morgun
3. Bókaðu 20 mín uppfylgni-samtal með mér: https://calendly.com/lioratech/20min

Gangi þér vel með innleiðinguna!

Ef þú hefur spurningar, svaraðu bara þessum emaili.

Bestu kveðjur,
Ingi Þór
LioraTech - AI Ráðgjöf
info@lioratech.is
https://airadgjof.is
```

**Attachments:**
- `[Fyrirtæki] - 30 Daga AI Roadmap.md` (eða PDF ef þú umbreytir)

---

## ⏰ Timing:

**Markmið:** Senda innan 24 klst frá kaupum

**Realistic timeline:**
- Viðskiptavinur kaupir: 10:00
- Þú færð email: 10:05
- Þú review-ar: 10:30 (25 mín)
- Þú sendir til viðskiptavinar: 11:00
- **Total:** ~1 klst frá kaupum

**Eða ef busy:**
- Kaup: 14:00 (þriðjudagur)
- Review: 09:00 (miðvikudagur morgun)
- Send: 09:30 (miðvikudagur)
- **Total:** ~19 klst (vel innan 24 klst)

---

## 🔄 Þegar þú vilt automate-a að fullu:

Í framtíðinni, þegar þú ert confident með quality:

1. **Opna n8n workflow**
2. **Breyta "Prepare Email" node**
3. **Skipta út:**
   ```javascript
   email: 'info@lioratech.is',  // NÚNA
   ```
   **Í:**
   ```javascript
   email: customerData.email,  // AUTOMATA
   ```
4. **Activate workflow aftur**

Þá fer roadmap-ið beint til viðskiptavinar án þinnar review.

---

## 📊 Tracking (optional):

### **Airtable/Notion Database:**

Haltu utan um:
- Company name
- Customer email
- Purchase date
- Roadmap sent date
- Follow-up scheduled?
- Follow-up completed?
- Customer feedback

**Airtable columns:**
```
| Company | Email | Bought | Sent | Follow-up | Status | Notes |
|---------|-------|--------|------|-----------|--------|-------|
| Ísl.Bók.| jon@  | 2025.. | 2025 | 2025-12-15| Done   | Great!|
```

---

## 💡 Tips:

### **Quality Patterns to watch for:**

**Good signs:**
- Specific tool names (not "AI tool")
- Konkrét ISK verð (not "$XX")
- Dagleg verkefni eru actionable
- ROI er realistic
- Íslenska flæðir vel

**Red flags:**
- Generic ráð ("Use AI to improve...")
- Óljósar leiðbeiningar
- Unrealistic ROI (300% savings!)
- Þýðingamál ("Þú munt geta að...")
- Missing steps

### **Common edits þú munt gera:**

1. **Fixa íslenskt:**
   - "Þú munt geta að..." → "Þú getur..."
   - "Innleiða innleiðingu" → "Innleiða lausn"

2. **Bæta við specificity:**
   - "Use an AI tool" → "Use ChatGPT Teams"
   - "Save time" → "Save 3-5 hours/week"

3. **Correct pricing:**
   - "$30/month" → "4,200 kr/mánuður"
   - Verify exchange rates

4. **Add Icelandic context:**
   - GDPR → "Persónuverndarlög"
   - Tax laws → "Íslensk skattalög"

---

## 🎯 Success Metrics:

**Track these:**
- Average review time: [Target: < 15 mín]
- Roadmaps needing edits: [Target: < 30%]
- Customer satisfaction: [Target: > 8/10]
- Time to send: [Target: < 12 hours average]

---

## ❓ FAQ:

**Q: Hvað ef roadmap-ið er mjög slæmt?**
A: Re-run Claude með betri prompt. Eða skrifa handvirkt.

**Q: Hvað ef Claude gerir villur í íslenskunni?**
A: Fix manually fyrir fyrstu 5-10 roadmaps, svo refine prompt.

**Q: Get ég sent PDF í stað Markdown?**
A: Já, umbreyta `.md` → `.pdf` með tool eða manually.

**Q: Á ég að CC viðskiptavini þegar roadmap er tilbúið?**
A: Nei, bara forward með friendly email.

**Q: Hvað ef viðskiptavinur biður um changes?**
A: Gera smá edits og senda updated version.

---

**Gangi þér vel!** 🚀
