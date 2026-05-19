# VIÐMIÐ FYRIR AI REKSTRARGREINING + 30 DAGA PLAN

Ég þarf hjálp við að búa til template/structure fyrir borgaða vöru sem heitir **"AI rekstrargreining + 30 daga plan"**.

Hér að neðan er lýsing á **ókeypis útgáfunni** sem þú getur notað sem viðmið/baseline.

---

## ÓKEYPIS ÚTGÁFA (BASE-LINE)

### Vara: Sjálfvirk AI-greining
- **Verð:** 100% ókeypis
- **Afhendingatími:** Innan 24 klst
- **Format:** PDF skýrsla send á email
- **Tegund:** Sjálfvirk greining (engin persónuleg ráðgjöf)

---

## INPUT: SPURNINGALISTI

Viðskiptavinur svarar 9 spurningum:

1. **Netfang** (required, email)
   - Placeholder: "jon@fyrirtaeki.is"
   - Til að senda niðurstöður

2. **Nafn fyrirtækis** (required, text)
   - Placeholder: "Fyrirtæki ehf."

3. **Vefsíða fyrirtækis** (optional, url)
   - Placeholder: "https://fyrirtaeki.is"
   - Hjálpar AI að greina reksturinn betur

4. **Iðnaður** (required, text)
   - Placeholder: "T.d. smásala, ráðgjöf, þjónusta..."

5. **Fjöldi starfsmanna** (required, dropdown)
   - Valmöguleikar: 1-5, 6-20, 21-50, 50+

6. **Stærstu áskoranir í rekstrinum núna** (required, textarea)
   - Placeholder: "T.d. of mikill tími fer í handvirkar uppfærslur, erfitt að halda utan um verkefni..."

7. **Hvað viltu ná með AI?** (required, textarea)
   - Placeholder: "T.d. spara tíma, bæta þjónustu við viðskiptavini, sjálfvirka verkefni..."

8. **Hvaða tól notið þið í dag?** (required, text)
   - Placeholder: "T.d. Excel, Slack, Google Workspace..."

9. **Hversu hratt viltu innleiða?** (required, dropdown)
   - Valmöguleikar:
     - Eins fljótt og hægt er
     - Innan 1-3 mánaða
     - Innan 3-6 mánaða
     - Sveigjanlegur

---

## OUTPUT: NIÐURSTAÐA SEM VIÐSKIPTAVINUR FÆR

### PDF Skýrsla með:

#### 1. INNSÝN Í NÚVERANDI STÖÐU
- Stutt samantekt á rekstrinum
- Helstu flöskuhálsar
- Tækifæri til hagræðingar

#### 2. 3-5 TÆKIFÆRI TIL ÚRBÓTA

Hvert tækifæri inniheldur:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TÆKIFÆRI #1: [Nafn]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORGANGSRÖÐUN: [HIGH / MEDIUM / LOW]
ÁÆTLAÐUR TÍMASPARNAÐUR: [X klst/viku]

VANDAMÁLIÐ:
[Lýsing á núverandi vandamáli byggð á svörum]

LAUSNIN:
[Hvernig AI/sjálfvirkni getur hjálpað]
[Hvaða tól/tækni myndi virka]

NÆSTU SKREF:
1. [Fyrsta skref]
2. [Annað skref]
3. [Þriðja skref]
```

---

## VISUAL DESIGN STYLE

### Litir:
- **Primary:** #1e3a8a (Blue 900 - dark blue)
- **Accent:** #3b82f6 (Blue 500 - bright blue)
- **Background:** #f8fafc (Slate 50 - light gray)
- **Text:** #0f172a (Slate 900 - dark)

### Typography:
- **Headings:** Playfair Display (serif), bold
- **Body text:** Inter (sans-serif), regular
- **Style:** Clean, professional, corporate

### UI Elements:
- **Kort:** rounded-2xl, shadow-card, border-gray-100
- **Spacing:** Rúmgott (py-6 to py-12)
- **Icons:** Lucide-react library (CheckCircle2, Sparkles, ArrowRight)
- **Animations:** Subtle fade-in-up, hover effects

### Dæmi um kort:
```jsx
<div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
  <div className="flex items-start gap-3">
    <CheckCircle2 size={24} className="text-brand-primary" />
    <div>
      <h4 className="font-bold text-brand-dark mb-1">Titill</h4>
      <p className="text-sm text-gray-600">Lýsing</p>
    </div>
  </div>
</div>
```

---

## USER FLOW (ókeypis útgáfa)

```
1. INTRO PAGE
   ↓
   [Sýnir hvað þú færð]
   [100% ókeypis badge]
   [CTA: "Halda áfram"]

2. SPURNINGALISTI
   ↓
   [9 spurningar]
   [Progress indicator: Step 2/3]
   [CTA: "Fá ókeypis greiningu"]

3. SUCCESS PAGE
   ↓
   [Takk fyrir!]
   [Niðurstöður innan 24 klst]
   [Næstu skref útskýrð]
```

---

## HVAÐ Á AÐ VERA ÖÐRUVÍSI Í BORGAÐU ÚTGÁFUNNI?

### AI rekstrargreining + 30 daga plan á að vera:

#### DÝPRA:
- Fleiri spurningar (15-20 spurningar í stað 9)
- Ítarlegri greining
- Persónuleg ráðgjöf (ekki bara sjálfvirk AI)
- Video call / samráðsfundur

#### ÍTARLEGRA OUTPUT:
- **30 daga framkvæmdaáætlun** í stað bara 3-5 tækifæri
- Dagsetningar og milestones
- Skref-fyrir-skref verkefnalisti
- Forgangsröðun með reasoning
- ROI útreikningar
- Áhættumat

#### PERSÓNULEGRA:
- Samvinna með ráðgjafa
- Sérsniðin fyrir þeirra specific situation
- Follow-up möguleiki

#### BETRI FRAMSETNING:
- Lengri PDF (10-15 síður vs 3-5 síður)
- Betri visualizations (charts, diagrams, timelines)
- Executive summary
- Detailed appendix

---

## HVAÐ ÉG ÞARF HJÁLP MEÐ:

1. **Spurningalisti struktur** fyrir borgaðu útgáfuna (15-20 spurningar)
2. **30 daga áætlun structure** - hvernig á að skipuleggja dagana/vikurnar
3. **PDF template outline** - hvaða sections og í hvaða röð
4. **Mælanlegar niðurstöður** - hvernig á að setja fram ROI, tímasparnaður, etc.

Notaðu ókeypis útgáfuna hér að ofan sem baseline, en gerðu borgaðu útgáfuna **mun ítarlegri og faglega**.

---

## TECH CONTEXT

- React + TypeScript
- Tailwind CSS
- Form → n8n webhook → AI processing → PDF generation
- Íslenskur markaður (B2B, smá til meðalstór fyrirtæki)

---

Getur þú hjálpað mér að hanna structure og template fyrir borgaðu útgáfuna?
