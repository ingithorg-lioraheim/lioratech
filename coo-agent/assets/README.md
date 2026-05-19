# LioraTech Brand Assets

Fullkominn safnpakki af öllum brand assets fyrir LioraTech.

## 📂 Folder Structure

```
assets/
├── BRAND_GUIDE.md          # Fullkomin brand leiðbeiningar
├── colors.json             # Litakóðar í JSON formati
├── logos/
│   ├── main/
│   │   ├── svg/           # Aðal logo í SVG
│   │   └── png/           # Aðal logo í PNG
│   └── variations/        # Öll logo afbrigði
├── social-media/          # Facebook & LinkedIn covers
└── web-graphics/          # Website hero & visuals

```

## 🎨 Logo Variations

### Main Logo
- `LioraTech-Main-Logo.svg` (3000×800px)
- `LioraTech-Main-Logo-3000x800.png`

### Secondary & Variations
| File | Size | Usage |
|------|------|-------|
| `LioraTech-Horizontal.svg/png` | 2000×500px | Vefborði, email undirritun |
| `LioraTech-Icon-LT.svg/png` | 1024×1024px | Samfélagsmiðlar, app icon |
| `LioraTech-Icon-LT-512.svg/png` | 512×512px | Smærri icons |
| `LioraTech-With-Tagline-Vertical.svg/png` | 2000×1000px | PDF titilsíður |
| `LioraTech-With-Tagline-Horizontal.svg/png` | 2500×400px | Document footer |

### Favicons
| File | Size | Usage |
|------|------|-------|
| `favicon.svg` | 128×128px | Modern browsers |
| `favicon-128x128.png` | 128×128px | Legacy browsers |
| `favicon-64x64.png` | 64×64px | Standard favicon |
| `favicon-32x32.png` | 32×32px | Standard favicon |
| `favicon-16x16.png` | 16×16px | Browser tabs |

## 📱 Social Media Assets

### Facebook
- `Facebook-Cover-1920x1080.svg/png` (1920×1080px)
  - Texti vinstra megin
  - Pláss fyrir mynd hægra megin

### LinkedIn
- `LinkedIn-Cover-1128x191.svg/png` (1128×191px)
  - Minimalísk hönnun
  - Logo + tagline

## 🌐 Web Graphics

### Website Hero
- `Website-Hero-1600x900.svg/png` (1600×900px)
  - Gildistillaga
  - CTAs (Call to Action)

### Color Palette Visual
- `Color-Palette-Visual.svg/png` (800×400px)
  - Visual representation af brand litum

## 🎨 Brand Colors

```json
{
  "brand": {
    "dark": "#0f172a",
    "primary": "#1e3a8a",
    "accent": "#3b82f6",
    "light": "#f8fafc",
    "gray": "#64748b"
  }
}
```

## 🔤 Typography

- **Headlines**: Playfair Display (Bold 700)
- **Body**: Inter (Regular 400)
- **UI/Buttons**: Inter (Semibold 600)

## 📖 Full Documentation

Sjá `BRAND_GUIDE.md` fyrir nákvæmar leiðbeiningar um:
- Color usage
- Typography guidelines
- Logo usage rules
- CSS variables
- Font sources

## 🛠 Tools

### SVG to PNG Converter
```bash
node scripts/svg-to-png.js <input.svg> [output.png]
```

Umbreytir SVG skrám í PNG með réttum stærðum og gegnsæjum bakgrunni.

## 📊 Quick Reference

### Litanotkun
- **Dark (#0f172a)**: Fyrirsagnir
- **Primary (#1e3a8a)**: "Liora" + CTA hnappar
- **Accent (#3b82f6)**: "Tech" + links
- **Light (#f8fafc)**: Bakgrunnur
- **Gray (#64748b)**: Aukatexti

### Logo Colors
- "Liora" = Primary (#1e3a8a)
- "Tech" = Accent (#3b82f6)

---

**Last Updated**: 2025-12-22
**Version**: 1.0
**Contact**: ingi@lioratech.is
