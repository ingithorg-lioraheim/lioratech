# LioraTech Brand Guide

> **AI ráðgjöf og innleiðing fyrir íslensk fyrirtæki**

---

## 1. Merki & Slagorð

### Nafn
**LioraTech** (eitt orð, með stórum L og T)

### Undirtitill
"AI Ráðgjöf & Innleiðing"

### Aðal Gildistillaga
"AI og sjálfvirkni sem vinnur fyrir reksturinn þinn"

### Lykilskilaboð
Ég hjálpa íslenskum fyrirtækjum að draga úr handavinnu, bæta flæði og byggja hagnýtar AI-lausnir sem skila sér í stöðugri og skilvirkri starfsemi.

### Undirliggjandi Positionering
- **Reynsla:** Byggt á 10+ ára reynslu í gervigreind, markaðssetningu, sölu og rekstri
- **Fjöldi verkefna:** 300+ íslensk fyrirtæki
- **Persónulegheit:** Einn sérfræðingur (Ingi Þór Gunnarsson) sem kemur með djúpa reynslu

---

## 2. Litapaletta

### Aðal Litir

```css
/* Primary Colors */
--brand-dark: #0f172a      /* Slate 900 - Aðal texti, fyrirsagnir */
--brand-primary: #1e3a8a   /* Blue 900 - Aðal vörumerki litur */
--brand-accent: #3b82f6    /* Blue 500 - Accent & CTA */
--brand-light: #f8fafc     /* Slate 50 - Bakgrunnar */
--brand-gray: #64748b      /* Slate 500 - Secondary texti */
```

### Aukafarir
```css
/* Supporting Colors */
--white: #ffffff
--gray-50: #f8fafc
--gray-100: #f1f5f9
--gray-600: #475569
--gray-800: #1e293b
--gray-900: #0f172a

/* Success/Positive */
--green-50: #f0fdf4
--green-100: #dcfce7
--green-500: #22c55e
--green-700: #15803d

/* Blue Spectrum */
--blue-50: #eff6ff
--blue-100: #dbeafe
--blue-200: #bfdbfe
--blue-400: #60a5fa
--blue-600: #2563eb
```

### Notkun Lita

| Element | Litur | Notkun |
|---------|-------|--------|
| Aðal fyrirsagnir | `brand-dark` | H1, H2, stór fyrirsögn |
| Vörumerki logo | `brand-primary` + `brand-accent` | "Liora" í primary, "Tech" í accent |
| CTA takkar | `brand-primary` | Primary actions |
| Hover á CTA | `brand-dark` | Darker on hover |
| Link/Accent | `brand-accent` | Secondary actions, links |
| Bakgrunnar | `brand-light` | Sections, cards |
| Aðal texti | `gray-600` | Body copy |
| Óvirkir takkar | `gray-400` | Disabled states |

---

## 3. Typografía

### Lettergerðir

**Primary Font (Headlines & Brand):**
```css
font-family: 'Playfair Display', serif;
```
- Notað fyrir: Fyrirsagnir, logo, stór messaging
- Weights: 400 (regular), 600 (semibold), 700 (bold)

**Secondary Font (Body & UI):**
```css
font-family: 'Inter', sans-serif;
```
- Notað fyrir: Body text, UI elements, navigation
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)

### Font Stærðir & Hierarchy

```css
/* Headlines */
H1: 3.75rem (60px) - md:text-6xl
H2: 3rem (48px) - text-4xl md:text-5xl
H3: 2.25rem (36px) - text-3xl md:text-4xl
H4: 1.875rem (30px) - text-2xl md:text-3xl
H5: 1.5rem (24px) - text-xl
H6: 1.25rem (20px) - text-lg

/* Body */
Large: 1.25rem (20px) - text-xl
Medium: 1.125rem (18px) - text-lg
Regular: 1rem (16px) - text-base
Small: 0.875rem (14px) - text-sm
XSmall: 0.75rem (12px) - text-xs
```

### Line Height
- Headlines: `leading-tight` (1.25)
- Body copy: `leading-relaxed` (1.625)

---

## 4. Logo & Branding Elements

### Logo Composition
```html
<span class="text-2xl font-serif font-bold text-brand-primary tracking-tight">
  Liora<span class="text-brand-accent">Tech</span>
</span>
```

- **"Liora"** í `brand-primary` (#1e3a8a)
- **"Tech"** í `brand-accent` (#3b82f6)
- Font: Playfair Display, Bold
- Letter spacing: Tight

### Logo Variations
- **Full color:** Primary + Accent (preferred)
- **Dark:** All `brand-dark` (for light backgrounds)
- **Light:** All white (for dark backgrounds like footer)

### Icon Usage
Library: **Lucide React**

Common icons:
- `BrainCircuit` - AI/Technology
- `Target` - Goals/Strategy
- `Zap` - Speed/Automation
- `CheckCircle2` - Success/Completion
- `BarChart3` - Analytics/Growth
- `Clock` - Time/Experience
- `Mail` - Contact
- `Calendar` - Booking
- `ArrowRight` - CTAs/Navigation

---

## 5. UI Components

### Buttons

**Primary Button:**
```css
bg-brand-primary text-white
px-10 py-5 rounded-lg
font-semibold text-lg
shadow-lg hover:shadow-xl
hover:bg-brand-dark hover:scale-105
transition-all
```

**Secondary Button:**
```css
bg-white text-brand-primary
border-2 border-brand-primary
px-10 py-5 rounded-lg
font-semibold text-lg
hover:bg-brand-primary hover:text-white hover:scale-105
transition-all
```

**Text Link:**
```css
text-brand-primary font-semibold
inline-flex items-center
hover:gap-2 transition-all
```

### Cards

**Standard Card:**
```css
bg-white p-8 rounded-xl
border border-gray-100
shadow-card
hover:shadow-lg
transition-shadow
```

**Featured Card:**
```css
bg-brand-light p-8 rounded-xl
border-2 border-blue-400
hover:shadow-lg hover:shadow-blue-200
transform hover:-translate-y-2 hover:scale-[1.02]
transition-all duration-300
```

### Shadows
```css
shadow-soft: 0 4px 20px -2px rgba(0, 0, 0, 0.05)
shadow-card: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)
```

---

## 6. Rödd & Tónn (Voice & Tone)

### Kjarnagildi í Samskiptum

**Skýrleiki fremur en flókið tæknimál**
- Forðastu tæknihugtök nema nauðsynleg
- Útskýrðu hlutina á mannamáli
- Dæmi: "AI greining" fremur en "LLM-powered analytics"

**Hagnýt áhersla**
- Talaðu um árangur, ekki bara tækni
- Dæmi: "Sparar 5 klst á viku" fremur en "Automated workflow optimization"

**Persónulegt en fagmannlegt**
- Notaðu "ég" fremur en "við" (einn sérfræðingur)
- Dæmi: "Ég hjálpa þér að..." fremur en "Við bjóðum upp á..."

**Íslenskt og aðgengilegt**
- Allt efni á íslensku
- Íslenskar dæmi og tilvitnur

### Leiðbeinandi Meginreglur

✅ **GER þetta:**
- Talaðu beint um ávinning og niðurstöður
- Notaðu einföld dæmi
- Sýndu fram á reynslu með tölum (10+ ár, 300+ fyrirtæki)
- Leggðu áherslu á að lausnirnar virka fyrir alla, ekki bara tæknitröllin
- Sýndu skýra ferla (3 skref, roadmap structure)

❌ **EKKI gera þetta:**
- Nota flóknar tækni-skammstafanir (API, SDK, LLM án útskýringar)
- Lofa of miklu eða nota ýktar fullyrðingar
- Nota of margar emojis
- Tala um "AI revolution" eða önnur buzzwords

### Tone Dæmi

**Hero Message (Confident & Clear):**
> "AI og sjálfvirkni sem vinnur fyrir reksturinn þinn. Ég hjálpa íslenskum fyrirtækjum að draga úr handavinnu, bæta flæði og byggja hagnýtar AI-lausnir."

**Service Description (Helpful & Specific):**
> "Fljótleg sjálfvirk greining sem metur stöðu rekstrarins og skilar 3–5 skýrum tækifærum til úrbóta. Engin skuldbinding."

**CTA (Action-oriented & Simple):**
> "Fá AI-greiningu"
> "Bóka samtal"
> "Fá verðtilboð"

---

## 7. Efnisuppbygging

### Homepage Sections (í röð)

1. **Hero**
   - Aðal gildistillaga
   - 2 CTAs (Primary: AI-greining, Secondary: Verðtilboð)
   - Visual: Professional card with "Innleiðingaráætlun"

2. **Services Section**
   - 6 þjónustur með icons
   - Featured: Ókeypis AI-greining
   - Grid layout með hover effects

3. **Comparison Section**
   - 2 tiers: Ókeypis vs. Fagleg
   - Side-by-side comparison
   - Clear value props

4. **Why Us Section**
   - 3 kjarnagildi:
     - Reynsla sem skilar árangri
     - Án flókinna tæknilausna
     - Hagnýtar lausnir sem skila sér

5. **Process Section**
   - 3-step process:
     1. Greining
     2. Áætlun
     3. Framkvæmd & rekstrarhald

6. **Products Section**
   - 2 main paths (Quick Start vs. Custom)
   - Visual differentiation

7. **About Section**
   - Personal story (Ingi Þór)
   - Stats animation (10+ ár, 300+ fyrirtæki)
   - Specializations list
   - Family photo for trust

8. **Newsletter Section**
   - Dark background (gray-900)
   - 3 benefits
   - Email signup form

9. **Footer**
   - 4 columns: Brand, Services, Company, Contact
   - Copyright notice

---

## 8. Animation & Interaction

### Transitions
```css
transition-all duration-300
transition-colors
transition-shadow
```

### Hover States
- Buttons: `hover:scale-105`
- Cards: `hover:-translate-y-2 hover:scale-[1.02]`
- Links: `hover:gap-2` (with icon)

### Scroll Animations
```javascript
// Fade in on scroll
opacity-0 translate-y-10 → opacity-100 translate-y-0
duration-1000
```

### Counters
- Animated counting for stats
- Duration: 2000ms
- Triggers on scroll into view

### Keyframe Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

---

## 9. Messaging Framework

### Headline Formulas

**Problem + Solution:**
> "Án flókinna tæknilausna"
> "Hagnýtar lausnir sem skila sér"

**Benefit-driven:**
> "Sparar tíma, einfaldari ferlar, stöðugri starfsemi"

**Action-oriented:**
> "Byrjaðu með AI-greiningu"
> "Fáðu 30 daga plan"

### Service Naming Convention
- Descriptive + Clear benefit
- Examples:
  - ✅ "AI rekstrargreining + 30 daga plan"
  - ✅ "Smíði AI- og sjálfvirknilausna"
  - ❌ "Enterprise AI Package"
  - ❌ "Premium Tier"

---

## 10. Photography & Imagery

### Style Guidelines
- Professional but approachable
- Real people (family photo used in About section)
- Clean backgrounds
- High quality

### Visual Elements
- Gradient backgrounds (subtle, blue tones)
- Chart/graph visualizations (simple bars, clean lines)
- Iconography (line icons from Lucide React)
- Cards and UI mockups (professional dashboard look)

### Do's
✅ Clean, minimal visuals
✅ Professional card/dashboard designs
✅ Simple data visualizations
✅ Real photos of team

### Don'ts
❌ Generic stock photos
❌ Overly complex illustrations
❌ Clipart or cartoons
❌ Low-quality images

---

## 11. Content Pillars

### 1. **Reynsla & Traust**
- 10+ ára reynsla
- 300+ íslensk fyrirtæki
- Raunveruleg dæmi

### 2. **Aðgengi & Einfaldleiki**
- Engin tækni-þekking nauðsynleg
- Skýrir ferlar
- Mannamál, ekki tæknimál

### 3. **Árangur & Hagræðing**
- Mælanlegur árangur
- Tímasparnaður
- Skilvirkni

### 4. **Íslenskt Samhengi**
- Sérhæft fyrir íslenskan markað
- Íslenskur texti
- Þekkir staðbundnar áskoranir

---

## 12. Templates & Patterns

### Section Header Pattern
```html
<div class="text-center mb-16">
  <h2 class="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
    [Heading]
  </h2>
  <p class="text-gray-600 max-w-2xl mx-auto">
    [Subheading]
  </p>
</div>
```

### Feature Card Pattern
```html
<div class="bg-brand-light p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all">
  <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
    <Icon class="text-brand-primary" size={24} />
  </div>
  <h3 class="text-xl font-bold text-brand-dark mb-3">[Title]</h3>
  <p class="text-gray-600 mb-6 leading-relaxed">
    [Description]
  </p>
  <Link class="inline-flex items-center text-brand-primary font-semibold">
    [CTA] <ArrowRight />
  </Link>
</div>
```

### Stat Card Pattern
```html
<div class="text-center px-6 py-3 bg-gray-50 rounded-lg border border-gray-100">
  <span class="block font-bold text-2xl text-brand-dark">[Number]</span>
  <span class="text-xs text-gray-500 tracking-wide">[Label]</span>
</div>
```

---

## 13. Dos and Don'ts - Quick Reference

### Visual Design

| ✅ Do | ❌ Don't |
|-------|---------|
| Use soft shadows and subtle gradients | Use harsh drop shadows |
| Maintain consistent spacing (p-6, p-8) | Mix different spacing systems |
| Round corners (rounded-lg, rounded-xl) | Use sharp corners |
| Use brand colors consistently | Introduce random colors |

### Typography

| ✅ Do | ❌ Don't |
|-------|---------|
| Playfair Display for headlines | Use Playfair for body text |
| Inter for UI and body copy | Mix multiple sans-serif fonts |
| Maintain clear hierarchy | Use similar sizes for different levels |
| Keep line-height relaxed for body | Use tight line-height for paragraphs |

### Content

| ✅ Do | ❌ Don't |
|-------|---------|
| "Ég hjálpa þér" (personal) | "Við bjóðum" (when solo founder) |
| "Fá AI-greiningu" (action) | "Learn more" (vague) |
| "30 daga plan" (specific) | "Comprehensive solution" (vague) |
| Numbers & stats (10+, 300+) | Subjective claims without proof |

### Tone

| ✅ Do | ❌ Don't |
|-------|---------|
| "Hagnýtar lausnir sem skila sér" | "Revolutionary AI transformation" |
| "Sparar tíma og einfaldar ferla" | "Disrupt your industry" |
| "Byggt á 10+ ára reynslu" | "We're the best in Iceland" |
| "Engin skuldbinding" | "Limited time offer - act now!" |

---

## 14. Technical Specifications

### Responsive Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem; /* px-6 */
}
```

### Spacing Scale (Tailwind)
```
px-4: 1rem (16px)
px-6: 1.5rem (24px)
px-8: 2rem (32px)
px-10: 2.5rem (40px)

py-20: 5rem (80px) - Section padding
py-24: 6rem (96px) - Large section padding
```

### Border Radius
```css
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-3xl: 1.5rem (24px)
rounded-full: 9999px
```

---

## 15. External Integrations

### Calendly
- Widget fyrir tímabókanir
- Subtle integration í CTA buttons

### n8n Webhook
- Newsletter signup
- Endpoint: `https://lioratech.app.n8n.cloud/webhook-test/...`

### Google Fonts
```html
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap
```

### Tailwind CSS
- CDN loaded: `https://cdn.tailwindcss.com`
- Custom config in index.html

---

## Samantekt

LioraTech brand guide byggir á:

1. **Skýrleika** - Einföld skilaboð, skýr ávinningur
2. **Trausti** - Reynsla, tölur, raunverulegt andlit
3. **Aðgengi** - Engin tæknimál, mannamál
4. **Íslenska** - Allt á íslensku, fyrir íslenskan markað
5. **Fagmennsku** - Clean design, professional look
6. **Persónulegheit** - Einn sérfræðingur, persónuleg nálgun

**Litir:** Blue/Slate paletta með brand-primary (#1e3a8a) sem anchor
**Leturgerðir:** Playfair Display (headlines) + Inter (body)
**Tónn:** Professional, helpful, skýr, hagnýtur
**Visual:** Clean, minimal, modern, professional

Þessi brand guide ætti að gefa yfirgripsmikla mynd af því hvernig LioraTech vörumerkið er sett upp og hvernig það á að nota það í öllum samskiptaformum.
