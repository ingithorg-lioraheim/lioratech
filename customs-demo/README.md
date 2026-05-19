# 🤖 LioraTech AI-Powered Customs Clearance Demo

**Demo fyrir Icetransport / FedEx - AI-knúin tollafgreiðsla**

---

## 📋 Um þessa Demo

Þessi demo sýnir hvernig AI getur gert tollafgreiðslu **hraðari, ódýrari og áreiðanlegri** með því að:

1. **Lesa skjöl sjálfkrafa** með OCR (Optical Character Recognition)
2. **Draga út upplýsingar** með GPT-4 AI
3. **Fylla út tollform** sjálfkrafa
4. **Validate og gefa tillögur** um úrbætur

---

## ⚡ Ávinningur

- ⏱️ **10-12 tímar/viku** tímasparnaður (520-624 tímar/ári)
- 💰 **400.000-500.000 kr/mán** kostnaðarsparnaður
- ✅ **90% fækkun** á villum í tollskjölum
- 🚀 **Hraðari** tollafgreiðsla, minni tafir

---

## 🛠️ Tæknistafli (Tech Stack)

- **Frontend:** Streamlit (Python web framework)
- **OCR:** Tesseract + PDF2Image
- **AI:** OpenAI GPT-4 Turbo
- **Document Processing:** PyPDF2, Pillow
- **Languages:** Python 3.9+

---

## 🚀 Setup Leiðbeiningar

### 1. Forvöður (Prerequisites)

Þú þarft að vera með:
- Python 3.9 eða nýrra
- Tesseract OCR (fyrir OCR vinnslu)
- OpenAI API key

#### Setja upp Tesseract:

**MacOS:**
```bash
brew install tesseract
brew install tesseract-lang  # For Icelandic support
```

**Ubuntu/Debian:**
```bash
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-isl  # Icelandic
```

**Windows:**
Sækja frá: https://github.com/UB-Mannheim/tesseract/wiki

### 2. Clone/Setja upp verkefnið

```bash
cd customs-demo
```

### 3. Búa til virtual environment

```bash
python -m venv venv
source venv/bin/activate  # MacOS/Linux
# eða
venv\Scripts\activate  # Windows
```

### 4. Installa dependencies

```bash
pip install -r requirements.txt
```

### 5. Setja upp environment variables

```bash
cp .env.example .env
```

Opna `.env` og bæta við OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

### 6. Keyra appið

```bash
streamlit run app.py
```

Appið opnast í browser á `http://localhost:8501`

---

## 📂 Skráarskipulag

```
customs-demo/
├── app.py                      # Aðal Streamlit app
├── ocr_processor.py            # OCR vinnsla
├── ai_extractor.py             # GPT-4 extraction logic
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
├── README.md                  # Þessi skrá
└── sample_documents/          # Sample PDF/images til að prófa
```

---

## 🎯 Hvernig á að nota

1. **Opna appið** í browser
2. **Hlaða upp tollskjali** (PDF eða mynd)
3. **Ýta á "Vinna úr skjali"**
4. **Bíða 10-30 sekúndur** á meðan AI vinnur
5. **Sjá niðurstöður:**
   - OCR lestur
   - Extracted data (sendandi, viðtakandi, vörur)
   - Validation og tillögur
   - Útfyllt tollafgreiðsluskjal

---

## 📄 Stuðningur við skjalaform

Demo styður eftirfarandi tollskjöl:

- ✅ Commercial Invoice (Reikningur)
- ✅ Packing List (Pakkalisti)
- ✅ Bill of Lading (Farmskjal)
- ✅ Certificate of Origin (Upprunaskírteini)
- ✅ Customs Declaration (Tollyfirlýsing)
- ✅ Air Waybill (Flugfarmskjal)

**Tungumálastuðningur:**
- 🇮🇸 Íslenska
- 🇬🇧 Enska
- (Hægt að bæta við fleiri)

---

## 🧪 Testing

### Með þínum eigin skjölum:

1. Hlaða upp raunverulegum tollskjölum
2. Athuga nákvæmni
3. Gefa feedback

### Með sample documents:

Settu sample PDF/myndir í `sample_documents/` möppuna.

---

## 🔧 Customization & Integration

### Til að aðlaga að þínu fyrirtæki:

1. **Branding:**
   - Breyta logo og litum í `app.py`
   - Uppfæra company info

2. **Integration:**
   - Tengja við núverandi CRM/ERP (t.d. Navision, SAP)
   - API integration við tollkerfi
   - Database fyrir learning frá fyrri sendingum

3. **Validation Rules:**
   - Bæta við sérstökum íslenskum tollreglum
   - Custom HS-code validation
   - Currency conversion

4. **Security:**
   - User authentication
   - Data encryption
   - Audit logs

---

## 💡 Næstu Skref (Fyrir Production)

Til að gera þetta að fullri production lausn þarf:

### 1. **Integration** (4-6 vikur)
- Tengja við núverandi kerfi (CRM, ERP)
- API tengingar við tollkerfi
- Database setup

### 2. **Training** (2-3 vikur)
- Þjálfa AI á ykkar tegundum skjala
- Fine-tune fyrir ykkar vinnuferla
- Build learning system

### 3. **Security & Compliance** (2-3 vikur)
- User authentication og permissions
- Data encryption
- GDPR compliance
- Audit trails

### 4. **Testing & QA** (2-3 vikur)
- Prófunar með raunverulegum skjölum
- Edge case testing
- Performance optimization

### 5. **Deployment** (1-2 vikur)
- Cloud hosting (AWS, Azure, eða on-premise)
- Monitoring og logging
- Backup systems

### 6. **Training & Onboarding** (1-2 vikur)
- User training
- Documentation
- Support setup

**Áætlaður heildartími:** 8-12 vikur
**Áætlaður kostnaður:** 3-4.5 millj kr (eins og í greiningunni)

---

## 🆘 Troubleshooting

### OCR finnur ekki texta:
- Athuga að Tesseract sé rétt uppsett
- Prófa að auka DPI í `ocr_processor.py`
- Athuga að skjal sé ekki of lágt resolution

### GPT-4 skilar villum:
- Athuga að API key sé rétt
- Athuga internet tengingu
- Athuga API limits hjá OpenAI

### Streamlit crashar:
- Athuga að allar dependencies séu rétt installed
- Prófa að upgrade Streamlit: `pip install --upgrade streamlit`

---

## 📞 Support & Contact

**Ingi Þór Gunnarsson**
LioraTech ehf.
📧 ingi@lioratech.is
🌐 lioratech.is
📅 Bóka fund: [calendly.com/ingi-lioratech/30min](https://calendly.com/ingi-lioratech/30min)

---

## 📝 License & Notes

**Þetta er Proof-of-Concept Demo.**

Ekki nota í production án:
- Proper integration
- Security measures
- Human review process
- Compliance verification

© 2026 LioraTech ehf. - Öll réttindi áskilin.

---

## 🎯 Demo Goals

Þessi demo er ætlað að sýna:

✅ **Tæknilega möguleika** - Að þetta virkar
✅ **Business value** - Hversu mikinn tíma/peninga þetta sparar
✅ **User experience** - Hversu einfalt þetta er í notkun
✅ **Integration potential** - Hvernig þetta passar inn í núverandi ferla

**Ekki er ætlast til að þetta sé fullbúin lausn - þetta er starting point!**

---

Gangi vel! 🚀
