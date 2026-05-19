# 🎬 Hvernig á að keyra Demo - Visual Guide

## 📺 Terminal Commands (Copy & Paste)

### 🎯 SKREF 1: Opna Terminal

**Mac:**
- Ýta á `Command + Space`
- Skrifa "Terminal"
- Ýta á Enter

Eða í VS Code/Cursor:
- Ýta á `Ctrl + `` (backtick)

---

### 📁 SKREF 2: Fara í demo möppuna

```bash
cd /Users/ingithor/Projects/lioratech/customs-demo
```

**Hvað gerist:**
```
➜  ~ cd /Users/ingithor/Projects/lioratech/customs-demo
➜  customs-demo
```

✅ Þú ert núna í réttri möppu!

---

### 🔌 SKREF 3: Activate virtual environment

```bash
source venv/bin/activate
```

**Hvað gerist:**
```
➜  customs-demo source venv/bin/activate
(venv) ➜  customs-demo
```

✅ Taktu eftir `(venv)` - það þýðir að virtual environment er virkt!

---

### 🚀 SKREF 4: Keyra demóið!

```bash
python simple_demo.py
```

**Hvað gerist (í 4 hlutum):**

#### 📄 Hluti 1: Demo byrjar (0-2 sek)
```
╔════════════════════════════════════════════════════════════════╗
║    🤖 LioraTech AI-Powered Customs Clearance Demo            ║
║    Demo fyrir Icetransport / FedEx                             ║
╚════════════════════════════════════════════════════════════════╝

📄 SKREF 1: Lesa skjal
──────────────────────────────────────────────────────────────────────
Notar sample commercial invoice...
```

#### 🤖 Hluti 2: AI vinnur (2-20 sek)
```
🤖 SKREF 2: AI dregur út upplýsingar (GPT-4)
──────────────────────────────────────────────────────────────────────
⏳ Þetta tekur 10-20 sekúndur...

[AI er að vinna... bíddu aðeins...]
```

#### ✅ Hluti 3: Upplýsingar fundnar (20-22 sek)
```
✅ Tókst að draga út upplýsingar!

📦 SENDANDI:
   Nafn: TechGear Solutions Ltd.
   Land: United Kingdom

📥 VIÐTAKANDI:
   Nafn: Icetransport / FedEx ehf.
   Land: Iceland

💰 SENDINGARUPPLÝSINGAR:
   Reikningsnr: INV-2024-001234
   Heildarverð: 19,000.00
   Þyngd: 45.5 kg (Gross)

📋 VÖRUR:
   Vara 1: Laptop Computers - Dell XPS 15...
           HS-kóði: 8471.30.00
           Verð: USD 12,500.00
   [... fleiri vörur ...]
```

#### 📝 Hluti 4: Tollskjal búið til (22-25 sek)
```
📝 SKREF 3: Búa til tollafgreiðsluskjal
──────────────────────────────────────────────────────────────────────

╔════════════════════════════════════════════════════════════════╗
║          TOLLAFGREIÐSLUSKJAL / CUSTOMS DECLARATION            ║
╚════════════════════════════════════════════════════════════════╝

[Fullt tollafgreiðsluskjal hér...]

💾 Tollafgreiðsluskjal vistað í: customs_declaration_output.txt
💾 JSON gögn vistuð í: customs_data_output.json

╔════════════════════════════════════════════════════════════════╗
║                    ✅ DEMO TÓKST!                              ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 🎯 HVAÐ ER Í OUTPUT SKRÁNUM?

### 📄 customs_declaration_output.txt
Fullbúið tollafgreiðsluskjal sem starfsmaður getur farið yfir og sent.

### 💾 customs_data_output.json
Structured data sem hægt er að senda beint í kerfi (API integration).

---

## 🔄 Viltu keyra aftur?

Bara skrifa sömu skipun:
```bash
python simple_demo.py
```

Eða prófa með öðrum skjölum:
```bash
python simple_demo.py --file my_invoice.pdf
```

---

## 🆘 Ef eitthvað fer úrskeiðis:

### "Command not found: python"
Prófa:
```bash
python3 simple_demo.py
```

### "No module named 'openai'"
Virtual environment er ekki virkt. Keyra aftur:
```bash
source venv/bin/activate
```

### "API Error"
Athuga API key í `.env` skrá.

---

## 📞 Þarftu hjálp?

**Ingi Þór Gunnarsson**
📧 ingi@lioratech.is

---

**💡 TIP:** Þú getur afritað allar skipanir beint úr þessu skjali!
