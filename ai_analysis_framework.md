# Ókeypis AI Greining - Framework

## Markmið
Að búa til value-packed, professional greiningu sem:
1. Sýnir raunverulegt verðmæti AI-greiningar
2. Kostar okkur ekki of mikinn tíma (15-30 mín per fyrirtæki)
3. Vekur áhuga á að kaupa fulla þjónustu

---

## Gagnaveita

### Opinber gögn sem við notum:
1. **RSK (ríkisskattstjóri)**
   - Ársreikningar síðustu 3-5 ára
   - Eigið fé þróun
   - Veltuþróun
   - Hagnaður/tap

2. **Fyrirtækjaskrá (Skatturinn)**
   - Stofnár
   - Eigendur
   - Starfsmannafjöldi (ef til)

3. **Markaðsgögn**
   - Atvinnugrein trends (Statistics Iceland)
   - Samkeppnisgreining
   - Markaðsstærð

4. **Opnar vefslóðir**
   - Fésbókarsíða metrics (likes, engagement)
   - Instagram presence
   - Google reviews
   - Web presence analysis

---

## Greiningarskýrsla - Uppbygging

### 1. EXECUTIVE SUMMARY (1 bls)
**Inngangur:**
- Nafn fyrirtækis og stutt lýsing
- Núverandi staða (eigið fé, stærð, starfsmannafjöldi)
- Top 3 findings frá greiningu
- Overall health score (0-100)

**Heildarniðurstaða:**
- 🟢 Sterkt fyrirtæki / 🟡 Stöðugt / 🔴 Áhættusvæði
- 1-2 setningar um heildarstöðu

---

### 2. FJÁRHAGSLEG ÞRÓUN (1 bls)

**Eigið fé þróun:**
- Graf síðustu 5 ára
- Trend line með spá næstu 12 mán
- Samanburður við meðaltal í atvinnugrein

**Helstu tölur:**
| Ár | Eigið fé | Velta | Hagnaður | % Breyting |
|----|----------|-------|----------|------------|
| ... | ... | ... | ... | ... |

**AI Insight:**
- Er fyrirtækið að vaxa eða standa í stað?
- Comparison við industry average
- Red flags ef einhver

---

### 3. MARKAÐSSTAÐA (1 bls)

**Atvinnugreinin:**
- Markaðsstærð á Íslandi
- Vöxtur í greininni
- Fjöldi keppinuta

**Samkeppnisstaða:**
- Top 3-5 keppinautar með equity samanburð
- Market share estimate (ef hægt)
- Competitive positioning

**Stafræn viðvera:**
- Social media presence score
- Google review rating
- Website traffic estimate (ef hægt)

---

### 4. VAXTARTÆKIFÆRI (0.5 bls)

**AI greinir þessi tækifæri:**
1. **[Tækifæri 1]**
   - Lýsing
   - Estimated impact
   - Implementation difficulty

2. **[Tækifæri 2]**
   - ...

3. **[Tækifæri 3]**
   - ...

---

### 5. ÁHÆTTUÞÆTTIR (0.5 bls)

**Áhættupunktar að fylgjast með:**
1. **[Áhætta 1]** - 🔴 Há/🟡 Miðlungs/🟢 Lág
   - Lýsing
   - Potential impact

2. **[Áhætta 2]**
   - ...

---

### 6. SPÁR NÆSTU 12 MÁNUÐI (0.5 bls)

**AI líkanið spáir:**
- Eigið fé eftir 12 mán: [tala] (±[margin])
- Velta spá: [tala]
- Confidence level: [%]

**Scenario analysis:**
- Best case: [+X%]
- Expected case: [+Y%]
- Worst case: [Z%]

**Ráðleggingar:**
- 2-3 actionable items

---

### 7. NÆSTU SKREF (0.5 bls)

**Hvað get LioraTech gert fyrir þig?**

**Fría greiningin sem þú fékkst innifelur:**
- ✅ Opinber fjármálagögn
- ✅ Grunnspár og trends
- ✅ Samkeppnisyfirlit

**Fulla LioraTech þjónustan bætir við:**
- 📊 Real-time dashboard með live gögnum
- 🎯 Sérsniðnar KPIs fyrir þína atvinnugrein
- 🔮 Háþróaðar spálíkön með 85%+ nákvæmni
- 📈 Competitor tracking og market intelligence
- 🤖 Automated insights og alerts
- 👥 Persónuleg ráðgjöf og strategy session

**Verð:** [Verðlagning based on company size]
- Lítil fyrirtæki (<100M): 99.000 kr/mán
- Miðlungs (100M-500M): 199.000 kr/mán
- Stór (>500M): Custom pricing

**Call to Action:**
Bókaðu ókeypis 30 mín fund til að ræða niðurstöður: [Calendly link]

---

## Automation Workflow

### Skref 1: Gagnaöflun (5-10 mín)
**Script:** `gather_company_data.py`
- Sækja ársreikninga frá RSK API/scraper
- Sækja fyrirtækjaupplýsingar
- Sækja social media metrics
- Vista í structured JSON

### Skref 2: AI Greining (2-3 mín)
**Script:** `analyze_company.py`
- Reikniverk á financial data
- Trend analysis og forecasting
- Industry comparison
- Risk scoring
- Opportunity detection

### Skref 3: Report Generation (2-5 mín)
**Script:** `generate_report.py`
- Nota template (Word/PDF)
- Populate með gögnum
- Generate charts/graphs
- Export sem PDF

### Skref 4: Quality Check (2-3 mín)
- Mannleg yfirferð
- Lesa yfir insights
- Bæta við personalization
- Gott að fara!

**Total tími:** 15-25 mín per fyrirtæki

---

## Templates og Tools

### Tools við notum:
- **Python** fyrir data analysis
- **pandas/numpy** fyrir calculations
- **matplotlib/plotly** fyrir graphs
- **OpenAI API** fyrir AI insights
- **python-docx** eða **ReportLab** fyrir PDF generation

### Data sources API:
- RSK ársreikningar: [scraped or API]
- Fyrirtækjaskrá: [API/scraping]
- Social media: Facebook Graph API, Instagram API
- Google Reviews: Google Places API

---

## Example Output

**Fyrirtæki:** Garri (matvörur)
**Eigið fé:** 1,780M ISK (2021)
**Atvinnugrein:** Matvöruframleiðsla

### Executive Summary:
Garri er traustur leikmaður í íslenskri matvöruframleiðslu með sterka fjárhagslega stöðu. Fyrirtækið hefur vaxið jafnt og þétt síðustu 5 ár með 8% árlegum vexti að meðaltali. AI greiningin okkar sýnir tækifæri í útflutningi og vörulínu útvíkkun.

**Overall Health Score: 82/100** 🟢

**Top 3 Findings:**
1. Sterk fjárhagsleg afkoma - 15% betri en meðaltal í greininni
2. Social media presence undir meðallagi - tækifæri til að auka sýnileika
3. Vöxtur í útflutningi á norðurlöndum gæti aukið veltu um 20-30%

[... rest of report ...]

---

## Success Metrics fyrir Greiningu

**Markmið:**
- 30%+ opna greiningu (email tracking)
- 20%+ bóka fund eftir að hafa lesið
- 10%+ conversiona í paying customers

**Lykilatriði:**
- Greinir þarf að líta professional út
- Real insights - ekki generic
- Clear CTA til að taka næsta skref
