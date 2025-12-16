# LioraTech - AI Ráðgjöf Project Context

## Hvað er þetta?
LioraTech vefur + sjálfvirkt AI greiningakerfi fyrir fyrirtæki sem vilja fá AI ráðgjöf.

## COO-Agent Kerfi
Þessi project hefur **COO-Agent** - sjálfvirkt kerfi sem vinnur AI greiningar fyrir viðskiptavini.

### Þegar notandi keyrir: `./coo-agent/coo <command>`

**Þú átt að:**
1. ✅ Keyra skipunina strax (þú hefur permission)
2. ✅ **MIKILVÆGT:** Google Drive er source of truth - **EKKI** local folders
3. ✅ Ef `./coo check` segir "No pending" → keyra `./coo fetch` fyrst til að sækja úr Drive
4. ✅ Lesa úttakið og skilja hvað er að gerast
5. ✅ Ef það eru pending beiðnir → vinna þær
6. ✅ **EKKI** spyrja um leyfi eða explore möppur fyrst

### Helstu skipanir:
- `./coo-agent/coo fetch` - ⚡ **ALLTAF FYRST** - Sækir úr Google Drive
- `./coo-agent/coo check` - Vinnur local pending AI greiningar
- `./coo-agent/coo approve` - Umbreytir samþykktum greiningum í PDF
- `./coo-agent/coo status` - Sýnir local pipeline stöðu (ekki Drive!)

### Workflow:
1. Viðskiptavinur fyllir út form á lioratech.is
2. n8n býr til JSON beiðni í **Google Drive `pending/`** ⚡
3. CEO keyrir: `./coo-agent/coo fetch` (sækir úr Drive)
4. CEO keyrir: `./coo-agent/coo check` (vinnur local)
5. AI býr til greiningu → **Google Drive `processing/`** (bíður endurskoðunar)
6. CEO endurskoðar í Drive og færir í `approved/`
7. CEO keyrir: `./coo-agent/coo approve`
8. PDF myndast og fer í **Google Drive `completed/pdf-files/`**
9. CEO sendir PDF til viðskiptavinar

**Mundu:** Google Drive er source of truth, local er bara temp vinnslusvæði!

## Nákvæm skjölun:
- `coo-agent/COO-STATUS.md` - Núverandi staða
- `coo-agent/WORKFLOW.md` - Fullkominn workflow
- `.claude/commands/coo.md` - COO agent prompt

## CEO Permissions:
**CEO (Ingi) hefur veitt fullt operational leyfi:**
- ✅ Engin þörf að spyrja fyrir Read, Bash, Write tools þegar kemur að COO verkum
- ✅ Virka proactive - athuga skrár, keyra skipanir, uppfæra status
- ✅ Trusted að taka operational ákvarðanir
- ✅ Aðeins spyrja um strategic ákvarðanir eða ef raunverulega óljóst

## Project Structure:
```
lioratech---ai-ráðgjöf/
├── coo-agent/              # COO automation system
│   ├── coo                 # CLI executable
│   ├── scripts/            # Node.js automation scripts
│   ├── COO-STATUS.md      # Live status tracking
│   └── WORKFLOW.md        # Complete workflow docs
├── pages/                  # React website pages
├── roadmap-generation/     # AI roadmap tools
└── .claude/               # Claude Code config
    └── commands/coo.md    # COO activation prompt
```

## Þegar þú byrjar nýtt session:
- Ef CEO keyrir `./coo-agent/coo check` → **keyra `./coo fetch` FYRST, síðan check**
- Ef CEO keyrir aðrar COO skipanir → **keyra strax og svara**
- Ef CEO segir "COO, hver er staðan?" → **lesa COO-STATUS.md og gefa update**
- **Alltaf muna:** Google Drive er source of truth, ekki local folders!

---

*Þetta kerfi er tilbúið og virkar. Engin þörf á setup eða configuration.*
