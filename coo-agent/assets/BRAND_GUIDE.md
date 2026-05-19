1# LioraTech Brand Guide

## 📊 Litakóðar (Color Codes)

### Brand Colors
- **Dark** (`#0f172a`): Aðalfyrirsagnir (H1, H2) og dökkan texta
- **Primary** (`#1e3a8a`): Aðallitur - "Liora" í logo og aðal CTA-hnappar
- **Accent** (`#3b82f6`): "Tech" í logo, hlekki og accent á körtum
- **Light** (`#f8fafc`): Aðal bakgrunnslitur fyrir síður og kort
- **Gray** (`#64748b`): Aukatexti, undirtitlar og lýsingar

### Supporting Colors
- **White** (`#ffffff`): Hvítur bakgrunnur
- **Success** (`#22c55e`): Árangur og staðfestingar
- **Blue 400** (`#60a5fa`): Auka blár tónn
- **Blue 50** (`#eff6ff`): Mjög ljós blár bakgrunnur

## 🔤 Typography (Leturgerðir)

| Element | Font Family | Weight | Usage |
|---------|-------------|--------|-------|
| Headlines (H1-H6) | Playfair Display, serif | 700 (Bold) | Fyrirsagnir og logo |
| Body Text | Inter, sans-serif | 400 (Regular) | Meginmál og UI |
| Buttons/UI | Inter, sans-serif | 600 (Semibold) | Hnappar og valmyndir |

## 🎨 Color Usage (Notkunarleiðbeiningar)

### brand-dark (#0f172a)
Notað fyrir allar aðalfyrirsagnir (H1, H2) og dökkan texta.

### brand-primary (#1e3a8a)
Aðalliturinn þinn. Notaður í fyrri hluta logosins ("Liora") og fyrir aðal CTA-hnappa.

### brand-accent (#3b82f6)
Notaður í seinni hluta logosins ("Tech"), hlekki (links) og sem accent-litur á körtum.

### brand-light (#f8fafc)
Aðal bakgrunnslitur fyrir síður og kort til að halda hönnuninni hreinni.

### brand-gray (#64748b)
Notaður fyrir aukatexta, undirtitla og lýsingar sem eiga ekki að vera jafn áberandi og fyrirsagnir.

## 💻 CSS Variable Template

```css
:root {
  /* Brand Colors */
  --brand-dark: #0f172a;
  --brand-primary: #1e3a8a;
  --brand-accent: #3b82f6;
  --brand-light: #f8fafc;
  --brand-gray: #64748b;

  /* Supporting Colors */
  --white: #ffffff;
  --success: #22c55e;
  --blue-400: #60a5fa;
  --blue-50: #eff6ff;
}
```

## 👤 Social Media Avatars (Prófílmyndir)

Prófílmyndir hannaðar með "circle-safe" svæði til að tryggja að ekkert klippist af.

### LinkedIn Prófílmynd
**File**: `LinkedIn-Profile-800x800.svg` (800×800px)

**Eiginleikar**:
- Brand-dark bakgrunnur (#0f172a) fyrir fagmennsku
- Hvítt "LT" merki sem stendur vel út
- Subtill ytra hringur fyrir depth

**Notkun**: LinkedIn profile picture

### FB / IG / TikTok Prófílmynd
**File**: `Social-Profile-1024x1024.svg` (1024×1024px)

**Eiginleikar**:
- Brand-light bakgrunnur (#f8fafc) fyrir nútímalegt útlit
- Brand-primary (#1e3a8a) hringur og "L"
- Brand-accent (#3b82f6) fyrir "T"

**Notkun**: Facebook, Instagram, TikTok, Twitter profile pictures

### Transparent Prófílmynd
**File**: `Transparent-Profile-1024x1024.svg` (1024×1024px)

**Eiginleikar**:
- Enginn bakgrunnur (transparent)
- Þykkari hringur (40px) fyrir betri sýnileika
- Hægt að setja yfir hvaða lit/mynd sem er

**Notkun**:
- Canva og hönnunartól
- Samsetningar með myndum
- Flexible branding

### Ráðleggingar
- **Circle-safe**: Allar útgáfur með nægum "padding" til að forðast klippingu
- **JPG vs PNG**: Notaðu JPG fyrir myndir með bakgrunni (léttari), PNG fyrir gegnsæi
- **Brand Consistency**: Nota sömu "LT" uppsetningu á öllum miðlum

## 📱 Social Media Templates

Layout templates fyrir samfélagsmiðla sem þú getur notað sem grunn í Canva eða Figma.

### Testimonial Card (1080×1080)
**File**: `Testimonial-Card-1080x1080.svg`

**Notkun**:
- Sýna traust og reynslu
- Tilvitnanir frá viðskiptavinum
- Social proof fyrir "300+ fyrirtæki"

**Eiginleikar**:
- Stór gæsalappir (") í brand-accent
- Italic Playfair Display fyrir quote
- Inter fyrir nafn og titil
- LT icon í hægra horninu

**Platforms**: Instagram, Facebook, LinkedIn (square posts)

### Quote Card / Tips (1080×1350 - LinkedIn Portrait)
**File**: `Quote-Card-LinkedIn-1080x1350.svg`

**Notkun**:
- Skynsamlegar pælingar og ráðgjöf
- Branding tips
- Thought leadership

**Eiginleikar**:
- 4:5 hlutfall - tekur meira pláss í LinkedIn feed
- Brand-primary bakgrunnur (#1e3a8a)
- Hvítur texti fyrir góðan kontrast
- Accent línan og hashtag
- Logo miðjað neðst

**Platforms**: LinkedIn (best), Instagram, Facebook

### Story Template (1080×1920)
**File**: `Story-Template-1080x1920.svg`

**Notkun**:
- Instagram/Facebook stories
- Call to Action posts
- Event announcements

**Eiginleikar**:
- Dökkur bakgrunnur fyrir dramatic effect
- Pláss fyrir mynd (800×800px area)
- Stór headline í Playfair Display
- CTA hnappur með brand-accent (#3b82f6)

**Platforms**: Instagram Stories, Facebook Stories, LinkedIn Stories

### 💡 Notkunarleiðbeiningar fyrir Templates

#### Canva/Figma Integration
- Hladdu upp Playfair Display og Inter fontunum
- Notaðu þessa XML strúktúra sem innblástur
- Fylgdu 24px+ hvítrými reglunni
- Haltu logo placement consistent

#### Litanotkun
- **#1e3a8a** (primary): Fyrir traust og authority
- **#3b82f6** (accent): Fyrir athygli og CTA
- **#f8fafc** (light): Fyrir ljósa, opna tilfinningu
- **#0f172a** (dark): Fyrir dramatic, professional look

#### Myndir
- Notaðu hreinar myndir með mikilli birtu
- Professional AI-generated myndir í brand stíl
- Tryggðu góðan kontrast milli myndar og texta
- Settu dökka síu ef þörf krefur

#### Samræmi
- Notaðu sömu font stærðir og spacing
- Haltu logo placement consistent
- Fylgdu brand colors nákvæmlega
- Haltu brand voice (professional, helpful, Icelandic)

## 💼 Professional Touchpoints

Templates fyrir professional snertipunkta við viðskiptavini.

### Email Signature Block
**File**: `Email-Signature-Block-600x200.svg` (600×200px)

**Notkun**: Tölvupóstundirritun

**Eiginleikar**:
- Lárétt uppsetning
- Logo + vertical divider
- Nafn, titill, tengiliðaupplýsingar
- CTA hnappur ("Fá AI-greiningu")

**Integration**:
- Gmail: Insert as image (export to PNG first)
- Outlook: Use HTML signature generator
- Apple Mail: Drag & drop PNG

### Pitch Deck Title Slide
**File**: `Pitch-Deck-Title-Slide-1920x1080.svg` (1920×1080px)

**Notkun**: Fyrsta glæra í kynningum

**Eiginleikar**:
- Dökkur bakgrunnur fyrir dramatic impact
- Stór LT watermark í bakgrunni (opacity 0.1)
- Logo miðjað
- Tagline með letter-spacing
- Accent línan fyrir visual interest

**Platforms**: PowerPoint, Keynote, Google Slides

### AI-greining PDF Cover
**File**: `AI-Greining-PDF-Cover-A4.svg` (A4 - 1240×1754px)

**Notkun**: Titilsíða fyrir formlegar skýrslur

**Eiginleikar**:
- Hreint, white bakgrunnur
- Brand-primary top bar (20px)
- Logo miðjað efst
- Titill: "AI rekstrargreining"
- Pláss fyrir fyrirtækjanafn
- Útgáfudagsetning
- Minimal decoration - professional look

**Notkun**: PDF skýrslur til viðskiptavina, formal reports

**Tip**: Þetta template passar beint inn í COO-Agent PDF generation workflow!

## 🎨 Brand Mockups

Mockups sýna hvernig LioraTech vörumerkið lítur út í raunverulegu samhengi.

### Phone Screen Mockup
**File**: `Phone-Screen-App-Icon.svg`
- Sýnir LT icon sem app á símaskjá
- Gagnlegt fyrir app kynningar

### Business Card
**File**: `Business-Card.svg`
- Authority hönnun með miklu hvítrými
- Inniheldur: Logo, tagline, nafn, tengiliðaupplýsingar

### AI Dashboard Screenshot
**File**: `AI-Dashboard-Screenshot.svg`
- UI mockup fyrir dashboard viðmót
- Sýnir sjálfvirkni-stig og tímasparnaður metrics
- Gott fyrir portfolio og case studies

### Website Hero (Authority View)
**File**: `Website-Hero-Authority.svg`
- Website hero section með social proof
- "TRAUST FRÁ 300+ ÍSLENSKUM FYRIRTÆKJUM"
- Clean, professional design

**Notkun**: Mockups eru hannaðar til að draga beint inn í Figma/Illustrator til fínstillingar eða nota sem grunn að kynningarefni.

## 📁 Asset Organization

### Logos
- `/assets/logos/main/` - Aðal logo (SVG & PNG)
- `/assets/logos/lockups/` - Staðlaðar útfærslur (horizontal, stacked, etc.)
- `/assets/logos/monochrome/` - Svart/hvítar útgáfur
- `/assets/logos/variations/` - Afbrigði (horizontal, icon, favicon, með tagline)

### Social Media
- `/assets/social-media/` - Facebook og LinkedIn cover myndir
- `/assets/social-media/avatars/` - Prófílmyndir fyrir alla miðla
- `/assets/social-media/templates/` - Social media post templates

### Web Graphics
- `/assets/web-graphics/` - Website hero og visual elements

### Mockups
- `/assets/mockups/` - Brand mockups í raunverulegu samhengi

## 🔗 Font Sources

- **Playfair Display**: [Google Fonts](https://fonts.google.com/specimen/Playfair+Display)
- **Inter**: [Google Fonts](https://fonts.google.com/specimen/Inter)

## 🔒 Logo Lockups (Staðlaðar útfærslur)

Lockups eru staðlaðar uppsetningar á logo elementum. Notaðu alltaf þessar útfærslur í stað þess að búa til þínar eigin.

### 1. Horizontal (Lárétt)
**File**: `LioraTech-Lockup-Horizontal.svg` (1200×300px)

**Notkun**:
- Vefborði (website header)
- Tölvupóstundirritun
- Kynningarmyndir (landscape orientation)

### 2. Center Stacked (Miðjað uppraðað)
**File**: `LioraTech-Lockup-Center-Stacked.svg` (800×800px)

**Notkun**:
- Forsíða kynningar (presentation cover)
- Ferningalaga rými
- Print materials með miðjuðri hönnun

**Uppsetning**: Icon fyrir ofan texta

### 3. Icon Only (Bara merki)
**File**: `LioraTech-Lockup-Icon-Only.svg` (500×500px)

**Notkun**:
- Favicon
- Prófílmynd á samfélagsmiðlum
- Stimpill á grafík
- App icon

**Stíll**: "LT" í hring

### 4. Logo + Tagline (Nafn með undirtitli)
**File**: `LioraTech-Lockup-With-Tagline.svg` (1500×600px)

**Notkun**:
- Pitch decks
- PDF skjöl
- Formal presentations
- Viðskiptaskjöl þar sem starfsemin er útskýrð

**Tagline**: "AI Ráðgjöf & Innleiðing" í brand-gray (#64748b)

## 📐 Logo Usage Guidelines & Rules

### ✅ Do's (Leyfilegt)
- ✅ Notaðu alltaf staðlaðar lockup útfærslur
- ✅ Stækka/minnka með constrained proportions
- ✅ Notaðu monochrome útgáfur á flóknum bakgrunnum
- ✅ Fylgdu lágmarksstærðum fyrir læsileika
- ✅ Haltu nægu hvítrými í kringum logoið
- ✅ Notaðu rétta útgáfu fyrir bakgrunnslit (ljós vs. dökkur)

### ❌ Don'ts (Bannað)

#### 🚫 Teygja (No Stretching)
**Aldrei breyta hlutföllum logosins**
- Alltaf stækka/minnka jafnt (constrain proportions)
- Aldrei teygja lárétt eða lóðrétt
- Sjá dæmi: `Usage-Example-Prohibited-Stretch.svg`

#### 🚫 Litasvörp (Forbidden Color Swaps)
**Ekki nota aðra liti en brand colors**
- "Liora" verður ALLTAF að vera #1e3a8a (primary)
- "Tech" verður ALLTAF að vera #3b82f6 (accent)
- Ekki víxla litunum á milli
- Fyrir monochrome, notaðu staðlaðar útgáfur

#### 🚫 Skuggar og Effektar (No Effects)
**Logoið á að vera "flat" 2D**
- Ekki bæta við drop shadows
- Ekki nota glow/glóð
- Ekki bæta við 3D hrifum
- Ekki nota gradient overlays

#### 🚫 Snúningur (No Rotation)
**Logoið á alltaf að vera lárétt**
- 0° rotation eingöngu
- Ekki snúa eða halla logoinu

#### 🚫 Aðrar bannfærslur
- ❌ Ekki nota önnur letur fyrir logoið
- ❌ Ekki búa til þínar eigin lockup útfærslur
- ❌ Ekki setja logo á of litríkan bakgrunn án kontrasts
- ❌ Ekki crop-a eða klippa logo

### 📏 Lágmarksstærðir (Minimum Sizes)

Til að tryggja læsileika, sérstaklega á Playfair Display letrinu:

- **Aðallogo (Vefur)**: Lágmark 120px breidd
- **Aðallogo (Prent)**: Lágmark 35mm breidd (ráðlagt 40mm+)
- **Icon (LT Stimpill - Web)**: Lágmark 32×32px (favicon)
- **Icon (LT Stimpill - UI)**: Ráðlagt 48px+ fyrir betri læsileika
- **Horizontal lockup**: Lágmark 150px breidd

### 📐 Hvítrými / Clearance (Padding)

**Logoið verður að fá að "anda"**

- **Regla**: Lágmarks hvítrími = hæð bókstafsins "L" í logoinu
- **Vefur**: ~24px padding í kringum logo
- **Prent**: ~8mm clearance zone
- Ekki setja texta, myndir eða aðra hönnunarþætti of nálægt

**Sjá dæmi**: `Usage-Example-Clearance.svg`

### 🎨 Litnotkun á bakgrunni (Background Rules)

#### Ljós bakgrunnur (#ffffff, #f8fafc)
- ✅ Notaðu full-color logoið (Navy #1e3a8a / Blue #3b82f6)
- ✅ Eða svarta monochrome útgáfu

#### Dökkur bakgrunnur (#0f172a, #1e293b)
- ✅ Notaðu hvíta (reversed) útgáfu
- ✅ Eða accent bláa (#3b82f6) fyrir "Tech" ef bakgrunnur leyfir

#### Flóknar myndir eða litríkir bakgrunnar
- ✅ Settu hálf-gegnsæja dökka síu yfir myndina fyrst
- ✅ Eða notaðu monochrome hvíta logoið
- ✅ Tryggðu alltaf nægan kontrast (WCAG AA)
- ❌ ALDREI setja logoið beint á unnar myndir án undirbúnings

#### Kontrast kröfur
- **Lágmark**: 4.5:1 contrast ratio (WCAG AA)
- **Ráðlagt**: 7:1 contrast ratio (WCAG AAA)
- Notaðu contrast checker tool til að staðfesta

## ⚫⚪ Monochrome Versions (Svart/Hvítt)

### Black Version (Svört útgáfa)
**File**: `LioraTech-Black.svg`

**Notkun**:
- Hvítur eða ljósgrár bakgrunnur
- Skjöl sem á að prenta í svarthvítu
- Vatnsmerki (10-20% opacity) yfir ljósar myndir
- Prentun á merch (ódýrara og fagmannlegra)

### White Version (Hvít útgáfa / Reversed)
**File**: `LioraTech-White.svg`

**Notkun**:
- Dökka bakgrunnar (t.d. brand-dark #0f172a)
- Footer á vefsíðu
- Myndir með miklum skugga
- Dökk social media posts

### Monochrome Icon
**File**: `LioraTech-Icon-Monochrome.svg`

**Notkun**:
- Prófílmyndir á dökku yfirborði
- Stimpill á vörur
- Útsaum á fatnaði
- Branding á pakkningu

**Athugið**: Icon notar `currentColor` sem tekur litinn frá parent element, en þú getur skipt út fyrir `#ffffff` eða `#000000` eftir þörfum.

## 🖨️ Print & Vector Files

### Creating Print-Ready Files from SVG

#### Master Files
- **LioraTech-Master.svg** (1200×400px) - Aðal logo fyrir alla notkun
- **LioraTech-Vector-Icon-Stamp.svg** (500×500px) - Icon fyrir litla hluti

#### In Adobe Illustrator:
1. **Create Outlines**:
   - Veldu textann og ýttu á `Shift + Ctrl + O` (Windows) eða `Shift + Cmd + O` (Mac)
   - Þetta breytir letrinu í form (shapes) svo hönnuðurinn þurfi ekki Playfair Display

2. **PDF Vector** (fyrir prentun):
   - File → Save As → PDF
   - Veldu "High Quality Print"
   - Hakaðu við "Preserve Illustrator Editing Capabilities"

3. **EPS** (fyrir prentun á boli, merkimiða, skilti):
   - File → Save As → EPS
   - Passaðu að litaformatið sé stillt á **CMYK** (þótt Hex kóðarnir séu RGB)
   - Version: Illustrator 10 EPS fyrir best compatibility

4. **AI Format**:
   - File → Save As → AI
   - Adobe Illustrator Document fyrir fullt edit-anlegt format

#### In Figma:
1. Afritaðu SVG kóðann
2. Ýttu á `Paste` inni í Figma
3. Logoið verður að edit-anlegum vektor lögum

#### Color Conversion for Print:
| RGB (Web) | CMYK (Approximate) | Pantone (Closest) |
|-----------|-------------------|-------------------|
| #1e3a8a (Primary) | C:100 M:78 Y:0 K:46 | PMS 2767 C |
| #3b82f6 (Accent) | C:75 M:45 Y:0 K:0 | PMS 2727 C |
| #0f172a (Dark) | C:100 M:90 Y:50 K:80 | PMS Black 6 C |

**Athugið**: CMYK gildin eru nálgun. Fyrir nákvæma litapörun, notaðu Pantone kóðana hjá prentsmiðju.
