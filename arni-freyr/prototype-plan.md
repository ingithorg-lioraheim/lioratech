# Prótótýpa Plan — Árni Freyr

**Staða:** Drög — bíður eftir gögnum  
**Tækni:** Next.js 14 + Tailwind CSS  
**Áætlaður tími:** 2–3 dagar frá gögnum til keyranlegrar prótótýpu

---

## Markmið

Einföld, fögur vefsíða þar sem gestir geta:
1. Skoðað vöruyfirlit Árna
2. Smellt á vöru til að fá nánari upplýsingar
3. Smellt á "Panta" — sem sendir email (eða vísar yfir á pöntunarkerfi)

---

## Tæknileg uppbygging

```
arni-freyr-web/
├── app/
│   ├── page.tsx          ← Forsíða: vörulisti
│   ├── layout.tsx        ← Root layout (header, footer)
│   └── products/
│       └── [slug]/
│           └── page.tsx  ← Einstök vörusíða
├── components/
│   ├── ProductCard.tsx   ← Vörukort í lista
│   ├── ProductGrid.tsx   ← Grid yfir allar vörur
│   └── OrderButton.tsx   ← "Panta" hnappur + modal
├── data/
│   └── products.ts       ← Vörugögn (JSON) — fyllir Árni út
└── public/
    └── images/           ← Myndir af vörum
```

---

## Hönnun og UI

**Stíll:** Hreinn, íslenskur, náttúrulegur  
- Litapaletta: hvítt, gráar tónar, dökkgrær accent (náttúrulegur)
- Leturgerð: Inter eða Geist (readable, modern)
- Kort með mynd, heiti, verð og "Panta" hnappur

**Forsíða layout:**
```
[Header: Nafn + lógó Árna]
[Kynningartexti: 1-2 setningar]
[Grid: 2–3 dálkar, vörukort]
[Footer: Tengiliðsupplýsingar]
```

**Vörukort:**
```
┌──────────────────────┐
│   [Mynd af vöru]     │
├──────────────────────┤
│ Nafn vöru            │
│ Lýsing (1 lína)      │
│ 2.490 kr             │
│ [  Panta  ]          │
└──────────────────────┘
```

---

## Pöntun — Email flæði (Valkostur A)

Þegar notandi smellir "Panta":
1. Modal opnast með vöruupplýsingum
2. Notandi fyllir út nafn + símanúmer (eða email)
3. Smellir "Staðfesta pöntun"
4. Kerfi sendir email á Árna með pöntunaruplýsingum

**Email template (til Árna):**
```
Ný pöntun frá vefsíðu!

Vara: [vöruheiti]
Verð: [verð] kr
Pöntunaraðili: [nafn]
Símanúmer: [sími]
Athugasemd: [valfrjálst]

Sent frá: arnifreyr.is
```

**Tækni:** Vercel serverless function → Resend API (ókeypis til 3.000 email/mán)  
*Pöntun lítur eins og almennur email — ekkert kerfi þarf*

---

## Hosting og domain

**Valkostur 1 (mælt með):**  
- Host: Vercel (ókeypis tier)
- Domain: `arnifreyr.is` eða subdomain á `lioratech.is` (t.d. `arni.lioratech.is`)
- Deploy: git push → sjálfvirkt uppfært

**Valkostur 2:**  
- Netlify (ókeypis tier, sama virkni)

---

## Tímalína (þegar gögn berast)

| Dagur | Verkefni |
|-------|----------|
| D+1 | Setja upp Next.js, leiðari, vörugögn inn |
| D+2 | Vörulisti, vörusíður, "Panta" modal |
| D+3 | Email sending, fínpúss, deploy á Vercel |
| D+4 | Árni prófar og gefur endurgjöf |

---

## Hvað við þurfum EKKI strax

- Greiðslugátt (Stripe, Valitor) — kemur síðar ef áhugi er til
- Birgðastjórnunarkerfi — við byrjum á einföldu
- CMS (Sanity, Contentful) — vörugögn eru í kóða til að byrja

---

## Kostnaður (áætlun)

| Liður | Kostnaður |
|-------|-----------|
| Next.js + Vercel hosting | 0 kr/mán |
| Resend email API | 0 kr/mán (upp í 3k email) |
| Domain (.is) | ~3.000–5.000 kr/ár |
| **Þróunartími (Dev)** | **Samkvæmt samningi við Inga** |

---

*Skjal uppfært: Mars 2026 · Dev (Lioraheim)*
