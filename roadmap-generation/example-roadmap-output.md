# 30 Daga AI Roadmap
## Íslenska Bókhaldstofan ehf.

---

## 1. EXECUTIVE SUMMARY

### 1.1 Yfirlit Fyrirtækisins

Íslenska Bókhaldstofan er fjármálaþjónustufyrirtæki með 12 starfsmenn sem veitir bókhalds- og ráðgjafarþjónustu. Fyrirtækið notar nú þegar Dynamics 365 Business Central sem kjarnakerfi ásamt hefðbundnum Microsoft verkfærum.

### 1.2 Greindar Áskoranir

| Áskorun | Forgangsröðun | Lausn með AI |
|---------|---------------|--------------|
| Handvirkar skráningar taka of langan tíma | **HIGH** | Sjálfvirk gagnaútdráttur úr skjölum |
| Ringulreið í tölvupóstum frá viðskiptavinum | **HIGH** | AI-drifin flokkun og forgangsröðun |
| Skjalastjórnun óskipulögð | **MEDIUM** | Sjálfvirk skráarflokkun og merking |
| Endurtekin svör við viðskiptavinum | **MEDIUM** | AI-assisted email drafting |
| Vantar yfirlit yfir verkefni | **LOW** | Project tracking með AI insights |

### 1.3 Top 5 AI Tækifæri

**1. Sjálfvirk Kvittana- og Reikningaskráning**
- **Tímasparnaður:** 5-7 klst/viku á fyrirtækið
- **Difficulty:** Medium
- **Lýsing:** Nota OCR + AI til að lesa kvittanir/reikninga og skrá í Business Central sjálfkrafa

**2. Email Management & Auto-responses**
- **Tímasparnaður:** 3-4 klst/viku per starfsmaður
- **Difficulty:** Easy
- **Lýsing:** ChatGPT/Claude fyrir email drafting + Gmail/Outlook automation

**3. Skjalaflokkun og Merking**
- **Tímasparnaður:** 2-3 klst/viku
- **Difficulty:** Easy
- **Lýsing:** AI-drifin skráarflokkun í OneDrive

**4. Viðskiptavina-gagnagrunns uppfærsla**
- **Tímasparnaður:** 4-5 klst/mánuð
- **Difficulty:** Medium
- **Lýsing:** Sjálfvirk uppfærsla úr tölvupóstum/samtölum

**5. Mánaðarleg skýrslugerð**
- **Tímasparnaður:** 2-3 klst/mánuð
- **Difficulty:** Hard
- **Lýsing:** AI-assisted skýrslugerð með insights

### 1.4 Áætlaður Ávinningur

**Heildar tímasparnaður eftir 30 daga:**
- Vika 1: 2-3 klst
- Vika 2: 5-7 klst
- Vika 3: 10-12 klst
- Vika 4: 15-18 klst/viku

**Kostnaður fyrir tól (mánaðarlega):**
- ChatGPT Teams: ~$30/user ≈ 4.200 kr
- n8n/Make automation: ~$20/mánuð ≈ 2.800 kr
- OCR verkfæri (Nanonets/Parsio): ~$50/mánuð ≈ 7.000 kr
- **Total:** ~14.000 kr/mánuð fyrir 12 manna teymi

**ROI:**
- Tímasparnaður: ~18 klst/viku × 12.000 kr/klst (avg) = **216.000 kr/mánuð**
- Kostnaður: 14.000 kr/mánuð
- **Net ávinningur: ~200.000 kr/mánuð**

---

## 2. 30 DAGA ÁÆTLUN

### VIKA 1: FOUNDATION & QUICK WINS (Dagur 1-7)

**Markmið:** Kynna AI fyrir teyminu, setja upp grunntól, ná fyrstu quick wins með email og texta vinnu

---

#### **Dagur 1: AI Introduction & ChatGPT Setup**

**Verkefni:**
- [ ] **Búa til ChatGPT Teams account** - Jón (eigandi) setur upp account fyrir allt teymið
- [ ] **Team meeting (30 mín):** Kynna hvað AI er og hvernig við munum nota það
- [ ] **Hver starfsmaður skráir sig inn í ChatGPT** og gerir 3 test prompts

**Tími:** 1 klst samtals
**Hverjir:** Allt teymið
**Tilgangur:** Koma öllum á sama blaðsíðu, fjarlægja ótta við AI

**Leiðbeiningar:**
1. Farðu á chat.openai.com/signup
2. Veldu "ChatGPT Teams" plan
3. Bjóddu teyminu með email addresses
4. Deildu "Welcome to AI" prompt template (sjá Resources)

---

#### **Dagur 2: Email Drafting með AI**

**Verkefni:**
- [ ] **Prófa ChatGPT fyrir email drafting** - hver starfsmaður skrifar 3 emails með AI aðstoð
- [ ] **Búa til email templates** - setja upp 5 algengasta email templates í ChatGPT

**Tími:** 45 mínútur
**Hverjir:** Allir sem skrifa tölvupósta daglega
**Tilgangur:** Fyrsti quick win - spara tíma strax í dag

**Dæmi prompt:**
```
"Skrifaðu pólítískt email til viðskiptavinar sem hefur ekki skilað fylgigögnum fyrir skattskilin. Tónninn á að vera vingjarnlegur en ákveðinn."
```

**Ávinningur:** 15-30 mín spart per starfsmaður á dag = **3-6 klst á viku**

---

#### **Dagur 3: Skjalastjórnun - Flokkun**

**Verkefni:**
- [ ] **Kortleggja núverandi OneDrive uppbyggingu** - skrá niður hvaða möppur þið notið
- [ ] **Búa til skýra möppuuppbyggingu** með AI-friendly nöfnum
- [ ] **Prófa ChatGPT fyrir file naming** - láta AI stinga upp á skráar nöfnum

**Tími:** 1 klst
**Hverjir:** IT ábyrgur + 1 bókari
**Tilgangur:** Fyrsti skrefið í betri skjalastjórnun

---

#### **Dagur 4: OCR Testing - Kvittanir & Reikningar**

**Verkefni:**
- [ ] **Prófa ChatGPT með myndum af kvittunum** - Upload 5 kvittanir og láttu AI lesa þær
- [ ] **Skrá niður nákvæmni** - hversu vel virkar það?
- [ ] **Research OCR tools** - skoða Parsio, Nanonets, Rossum

**Tími:** 1.5 klst
**Hverjir:** 2 starfsmenn í bókhaldi
**Tilgangur:** Prófa hvort þetta virkar fyrir okkar gögn

---

#### **Dagur 5: Automation Research - n8n/Zapier/Make**

**Verkefni:**
- [ ] **Velja automation platform** - skoða n8n (open-source) vs Make vs Zapier
- [ ] **Búa til free account** á völdu platformi
- [ ] **Búa til fyrsta "test" automation** - t.d. "new email → save to OneDrive"

**Tími:** 1 klst
**Hverjir:** IT ábyrgur
**Tilgangur:** Setja upp grunn fyrir automation í viku 2

---

#### **Dagur 6: ChatGPT Custom Instructions**

**Verkefni:**
- [ ] **Setja upp Custom Instructions** fyrir hvern starfsmann
- [ ] **Búa til "Bókhaldsaðstoð" prompt template** sem allir geta notað

**Tími:** 30 mín
**Hverjir:** Allir
**Tilgangur:** Gera ChatGPT betri fyrir okkar specific use-cases

**Dæmi Custom Instruction:**
```
"Þú ert bókhaldsaðstoð hjá íslenskri bókhaldsstofu. Við vinnum með Dynamics 365 Business Central. Svaraðu alltaf á íslensku, notaðu íslenska bókhaldshugtök, og settu áherslu á að fylgja íslenskum skattareglum."
```

---

#### **Dagur 7: Vika 1 Review & Planning**

**Verkefni:**
- [ ] **Team meeting (30 mín):** Hvað virkaði? Hvað ekki?
- [ ] **Safna feedback** frá öllum
- [ ] **Mæla tímasparnaður** - hversu mikinn tíma spöruðum við?
- [ ] **Ákveða priorities fyrir viku 2**

**Tími:** 45 mín
**Hverjir:** Allt teymið
**Tilgangur:** Fagna fyrstu árangrinum, leiðrétta course

---

### VIKA 2: AUTOMATION BASICS (Dagur 8-14)

**Markmið:** Setja upp fyrstu automation workflows, byrja að nota OCR fyrir kvittanir, stækka AI notkun

---

#### **Dagur 8: Email Auto-Flokkun**

**Verkefni:**
- [ ] **Setja upp Gmail/Outlook rules** með AI-suggested labels
- [ ] **Búa til "High Priority" vs "Low Priority" auto-flokkun**
- [ ] **Tengja við automation** - t.d. high priority emails → Slack notification

**Tími:** 1.5 klst
**Hverjir:** IT + 1 admin
**Tilgangur:** Minnka email overwhelm

---

#### **Dagur 9-10: OCR Innleiðing - Phase 1**

**Verkefni:**
- [ ] **Velja OCR verkfæri** (t.d. Parsio eða Nanonets)
- [ ] **Setja upp test workflow:** Email með PDF → OCR → structured data
- [ ] **Prófa með 20 raunverulegum reikningum**
- [ ] **Mæla nákvæmni** - hversu oft þarf að leiðrétta?

**Tími:** 3 klst yfir 2 daga
**Hverjir:** IT + 2 starfsmenn í bókhaldi
**Tilgangur:** Byrja að sjálfvirknivæða data entry

---

[... Halda áfram fyrir alla daga 11-30 með sambærilegri uppbyggingu ...]

---

## 3. TOOL RECOMMENDATIONS

### 1. ChatGPT Teams

**Hvað það gerir:**
Öflugur generative AI verkfæri fyrir texta, greiningu, og almenna aðstoð.

**Hvers vegna við mælum með þessu:**
Best-in-class fyrir íslenskt texta vinnu, mjög notendavænt, engin coding þörf.

**Use cases fyrir Íslenska Bókhaldstofan:**
1. **Email drafting** - skrifa tölvupósta til viðskiptavina hratt
2. **Skýringar** - útskýra flóknar skattaleg atriði á einfaldan hátt
3. **Gagnagreining** - greina Excel skrár og finna patterns
4. **Documentation** - skrifa procedures og guides

**Verð:** ~$30/user/month (≈4.200 kr) = 50.400 kr/mán fyrir 12 starfsmenn
**Setup tími:** 30 mínútur
**Difficulty:** Easy

**Hvernig á að byrja:**
1. Farðu á chat.openai.com og veldu Teams plan
2. Bjóddu öllum með corporate emails
3. Settu upp Custom Instructions (sjá dag 6)
4. Byrjaðu að nota fyrir dagleg email

**ROI estimate:** Sparar 3-5 klst/viku per user = 468.000 kr/mán value fyrir 50.400 kr cost

---

### 2. n8n (Automation Platform)

**Hvað það gerir:**
Open-source automation verkfæri - tengir saman önnur verkfæri og gerir workflows.

**Hvers vegna við mælum með þessu:**
Öflugra og ódýrara en Zapier, self-hosted option, unlimited workflows.

**Use cases fyrir Íslenska Bókhaldstofan:**
1. **Email → OneDrive** - vista viðhengi sjálfkrafa á réttum stað
2. **OCR → Business Central** - senda gögnin úr reikningum beint í BC
3. **Slack notifications** - fá alert þegar mikilvæg email kemur
4. **Weekly reports** - safna saman gögnum og senda summary

**Verð:** €20/mán (≈2.800 kr) eða free ef self-hosted
**Setup tími:** 2-3 klst
**Difficulty:** Medium

**Hvernig á að byrja:**
1. Búðu til account á n8n.cloud
2. Tengdu Gmail/Outlook + OneDrive
3. Byrjaðu á simple workflow (sjá dag 5)
4. Scaling up með flóknari automations

**ROI estimate:** Sparar 5-7 klst/viku = 120.000 kr/mán value fyrir 2.800 kr cost

---

[... 3-5 fleiri verkfæri með sömu uppbyggingu ...]

---

## 4. IMPLEMENTATION CHECKLIST

### ✅ Vika 1 Checklist
- [ ] ChatGPT Teams account uppsett
- [ ] Allt teymið skráð inn og með basic þjálfun
- [ ] Að minnsta kosti 5 starfsmenn nota ChatGPT daglega fyrir email
- [ ] OCR prófað með 5+ kvittunum
- [ ] Automation platform valið og account búið til
- [ ] Custom Instructions settar upp fyrir teymið

### ✅ Vika 2 Checklist
- [ ] Email auto-flokkun virk
- [ ] Fyrsta OCR workflow uppsett og prófað
- [ ] Að minnsta kosti 3 automation workflows í gangi
- [ ] OneDrive uppbygging endurbætt
- [ ] Prompt library byrjað (10+ templates)

[... Vika 3 & 4 ...]

---

## 5. MEASURING SUCCESS

### KPI til að fylgjast með:

1. **Tímasparnaður per starfsmaður**
   - Mæla: Weekly survey - "Hversu marga mínútur sparaðir þú í dag með AI?"
   - Target: 30+ mínútur per dag per starfsmaður innan 2 vikna

2. **Email response time**
   - Mæla: Average tími frá email receive til svara
   - Target: 30% hraðari eftir viku 2

3. **Data entry villur**
   - Mæla: Fjöldi villna í kvittana skráningu
   - Target: 50% færri villur með OCR (eftir viku 3)

4. **Starfsánægja með AI tools**
   - Mæla: Monthly team survey (1-10 scale)
   - Target: 7+ average score

5. **Cost savings**
   - Mæla: Tímasparnaður × 12.000 kr/klst - Tool costs
   - Target: 150.000+ kr/mán net savings eftir mánuð 1

---

## 6. COMMON PITFALLS & HOW TO AVOID THEM

**1. "AI mun taka starfið mitt"**
- **Lausn:** Útskýra frá byrjun að AI er til að hjálpa, ekki skipta út. Fókus á hvernig starfið verður **skemmtilegra** með minna administratífu.

**2. Enginn notar tólin**
- **Lausn:** Dagleg check-ins fyrstu 2 vikurnar. Búa til "AI champion" í teyminu sem hjálpar öðrum.

**3. Of margt í einu**
- **Lausn:** Fylgja þessu roadmap stíft. Ekki bæta við fleiri verkfærum fyrr en núverandi eru mastered.

**4. Security concerns**
- **Lausn:** ChatGPT Teams er enterprise-grade secure. Samt: ekki setja inn SSN eða credit card data. Fara yfir data policy á degi 1.

**5. Of háar væntingar**
- **Lausn:** Vera raunhæfur - AI er ekki töfralausn. Það tekur tíma að læra og optimize.

---

## 7. RESOURCES & SUPPORT

### Prompt Templates

**Email Template:**
```
Ég þarf að skrifa email til [viðskiptavinur] um [topic].
Tónninn á að vera [formal/casual/friendly].
Helstu points:
- [point 1]
- [point 2]

Skrifaðu drög að emaili.
```

**Data Analysis Template:**
```
Hér er Excel skrá með [lýsing á gögnum].
Finndu:
1. [hvað við viljum vita]
2. [patterns]
3. [anomalies]

Gefðu summary á íslensku.
```

### Support frá LioraTech

📞 **20 mínútna uppfylgni-samtal** (innifalið)
Bókaðu hér: [Calendly link]

📧 **Email support:**
info@lioratech.is - svörum innan 24 klst

### Next Steps eftir 30 daga

Eftir að þú hefur klárað þetta roadmap, mælum við með:

1. **Advanced Automation Workshop** - dýpri automation með n8n/Make
2. **Custom AI Agent Development** - búa til sérsniðna AI assistant fyrir bókhald
3. **AI Strategy Consulting** - long-term AI plan (6-12 mánuðir)

---

**Gangi þér vel!**
**LioraTech - AI Ráðgjöf**
info@lioratech.is
