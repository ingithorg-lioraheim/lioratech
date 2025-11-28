# Fréttabréf #4 - Zapier/n8n fyrir Automation

**Efnislína:** Hættu að gera sömu hlutina aftur og aftur (láttu AI gera það)

---

## 👋 Vika 4 - Automation tíminn!

Ef þú hefur fylgst með síðustu 3 vikur, þá hefurðu lært um:
1. ChatGPT - skrifar fyrir þig
2. Canva - hannar fyrir þig
3. Notion - skipuleggur fyrir þig

Í dag ræðum við hvernig þú getur **tengt þetta allt saman** og látið hlutina gerast sjálfkrafa.

Kynnum: **Zapier** (fyrir byrjendur) og **n8n** (fyrir lengra komna).

---

## 🔧 Verkfærin

### **Zapier** ($20-50/mánuður)
- Auðvelt í notkun
- "Ef þetta gerist, þá gerðu þetta"
- 5000+ integrations

### **n8n** (Frí + $20 fyrir hosting)
- Öflugra
- Open source
- Krefst smá tækniþekkingar

**Hvað velja?**
- Byrjandi? → Zapier
- Tech-savvy? → n8n
- Lítið budget? → n8n
- Vilt auðvelda leið? → Zapier

---

## 💡 3 dæmi frá íslenskum fyrirtækjum

### 1. **Nýr viðskiptavinur → Welcome tölvupóstur sjálfkrafa**
**Fyrirtæki:** Ráðgjöf
**Vandamál:** Gleymir að senda welcome póst til nýrra viðskiptavina

**Zapier automation:**
```
Trigger: Ný lína í Google Sheets (nýr viðskiptavinur)
   ↓
Action 1: Búa til póst með ChatGPT API
   ↓
Action 2: Senda póst með Gmail
```

**Niðurstaða:** 100% af nýjum viðskiptavinum fá welcome póst. 0 mínútur eytt.

---

### 2. **Instagram póstur → Sjálfkrafa á Facebook & LinkedIn**
**Fyrirtæki:** Markaðsstofa
**Vandamál:** Eyðir 20 mínútum í að posta sama efni á 3 staði

**Zapier automation:**
```
Trigger: Nýr Instagram póstur
   ↓
Action 1: Posta á Facebook
   ↓
Action 2: Posta á LinkedIn
```

**Niðurstaða:** Sparar 20 mínútur per póst. Posted 3x oftar.

---

### 3. **Nýr lead frá vefsíðu → CRM + Email + Slack tilkynning**
**Fyrirtæki:** Fasteignasala
**Vandamál:** Missir af nýjum leads því tölvupósturinn er fullu

**n8n automation:**
```
Trigger: Form submission á vefsíðu
   ↓
Action 1: Vista í Notion CRM
   ↓
Action 2: Senda email til sales team
   ↓
Action 3: Senda Slack tilkynningu
```

**Niðurstaða:** Engir leads glatast. Svarhlutfall 10x betra.

---

## 🎯 Prófaðu þetta í vikunni

**Byrjendur - Zapier:**
1. Farðu á [zapier.com](https://zapier.com)
2. Búðu til frítt account (100 tasks/mánuður)
3. Veldu template: "Google Sheets → Gmail"
4. Settu upp "Nýr viðskiptavinur sendir sjálfkrafa welcome póst"

**Lengra komnir - n8n:**
1. Farðu á [n8n.io](https://n8n.io)
2. Prófa cloud version (14 daga trial)
3. Búðu til workflow: "Webhook → ChatGPT → Email"

**Pro tip:** Byrjaðu á einföldum automation og bættu við flóknara síðar.

---

## 📊 Automation ROI

Íslensk fyrirtæki sem nota automation:
- Spara að meðaltali **15 klst/viku** á endurteknum verkefnum
- **98% accuracy** (AI gerir færri mistök en menn)
- **ROI:** Fyrir hverja $1 í automation toolum, sparar þú $10 í tíma

---

## 🎉 Fyrsta mánuðurinn búinn!

Við erum búin að fara yfir:
1. ✅ ChatGPT - Skrifa efni
2. ✅ Canva - Hönnun
3. ✅ Notion - Skipulag
4. ✅ Zapier/n8n - Automation

**Hvað næst?**

Ég ætla að senda könnun í næstu viku til að heyra:
- Hvað viltu læra meira um?
- Hvaða verkfæri ertu að nota?
- Hvaða áskoranir ertu að mæta?

Svo næstu 4 vikur verða byggðar á **þínum** óskum!

---

## 💬 Viltu meira?

Ef þú vilt:
- **Hjálp við að setja upp automation** → Bókaðu 20 mín fund: [airadgjof.is](#)
- **AI Playbook** (50+ templates fyrir íslensk fyrirtæki) → [airadgjof.is/playbook](#)
- **1-á-1 ráðgjöf** → Svaraðu þessum pósti

Gangi þér vel,
**Ingi Þór**
LioraTech - AI Ráðgjöf

---

*P.S. Takk fyrir að fylgjast með í heilan mánuð! Ef þú hefur prófað eitthvað af þessu, ég vil GJARNAN heyra hvernig það gekk. Svaraðu bara!*
