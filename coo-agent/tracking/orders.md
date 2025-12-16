# ORDER TRACKING

## ACTIVE ORDERS

| Order ID | Customer | Product | Status | Started | ETA | Notes |
|----------|----------|---------|--------|---------|-----|-------|
| - 

## AWAITING CEO REVIEW

| Order ID | Customer | Product | Completed | Delivery Time | Notes |
|----------|----------|---------|-----------|---------------|-------|
| AI-2025-12-16-E2NKYR | Mímos nuddstofa | AI-Greining (Free) | 2025-12-16 17:19 | 0.00h | Industry: Nudd og snyrtistofa, Pain: Erum ekki viss... Path: products/completed/AI-2025-12-16-E2NKYR-Mmos-nuddstofa-ai-greining.md |
| AI-2025-12-16-XEMJG2 | Mosfellsbakarí | AI-Greining (Free) | 2025-12-16 16:28 | 0.00h | Industry: Bakarí, Pain: birgðir og hagnaður... Path: products/completed/AI-2025-12-16-XEMJG2-Mosfellsbakar-ai-greining.md |
| AI-2025-12-16-BJ2GBT | KIWI ehf | AI-Greining (Free) | 2025-12-16 15:51 | 0.00h | Industry: stafræn auglýsingastofa, Pain: of mikil handavinna og of dýr rekstur... Path: products/completed/AI-2025-12-16-BJ2GBT-KIWI-ehf-ai-greining.md |
| AI-2025-12-16-BTT4HV | KIWI | AI-Greining (Free) | 2025-12-16 10:56 | 0.00h | Industry: Stafræn Auglýsingastofa, Pain: of mikil handavinna og of dýr rekstrarkostnaður... Path: products/completed/AI-2025-12-16-BTT4HV-KIWI-ai-greining.md |
| AI-2025-12-16-G6AOE4 | Vilma Home | AI-Greining (Free) | 2025-12-16 00:25 | 0.00h | Industry: Lífstíls netverslun, Pain: Mjög veik framlegð, Engin sýnileg skólun, Mikil ha... Path: products/completed/AI-2025-12-16-G6AOE4-Vilma-Home-ai-greining.md |
| AI-2025-12-15-QBEX39 | Hans & Gréta | AI-Greining (Free) | 2025-12-15 12:26 | 0.00h | Industry: verslun og vefsala, Pain: Of lítil sala, þurfum alltaf að vera með lagersölu... Path: products/completed/AI-2025-12-15-QBEX39-Hans-Grta-ai-greining.md |
| AI-2025-12-15-QBEX39 | Hans & Gréta | AI-Greining (Free) | 2025-12-15 12:24 | 0.00h | Industry: verslun og vefsala, Pain: Of lítil sala, þurfum alltaf að vera með lagersölu... Path: products/completed/AI-2025-12-15-QBEX39-Hans-Grta-ai-greining.md |
| AI-2025-12-15-RQ8G1Z | Bæjarbakarí | AI-Greining (Free) | 2025-12-15 11:49 | 0.00h | Industry: Bakarí, Pain: Of mikil handvirk vinna í birgðastjórnun... Path: products/completed/AI-2025-12-15-RQ8G1Z-Bjarbakar-ai-greining.md |
| AI-2025-12-14-IOQ11M | Hans & Gréta | AI-Greining (Free) | 2025-12-14 22:26 | 0.00h | Industry: Smásala, Pain: Óf miklar birgðir og ekki nógu mikið af viðskiptum... Path: products/completed/AI-2025-12-14-IOQ11M-Hans-Grta-ai-greining.md |
| TEST-1765715938719 | Test Company | AI-Greining (Free) | 2025-12-14 12:39 | 0.00h | Industry: Technology, Pain: Manual processes, Slow operations... Path: products/completed/TEST-1765715938719-Test-Company-ai-greining.md |
| AI-2026-12-14-TEST01 | Test Fyrirtæki ehf | AI-Greining (Free) | 2025-12-14 11:03 | 0.00h | Industry: Retail, Pain: Too much manual data entry, Slow inventory managem... Path: products/completed/AI-2026-12-14-TEST01-Test-Fyrirtki-ehf-ai-greining.md |
| #2026-001 | KIWI | AI-Greining (Free) | 2026-01-15 10:15 | 0.25h (15min) | Industry: Ad Agency, Pain: Manual work. Path: products/completed/2026-001-KIWI-ai-greining.md |

## COMPLETED THIS WEEK

| Order ID | Customer | Product | Delivery Time | CEO Approved | Delivered | Customer Rating |
|----------|----------|---------|---------------|--------------|-----------|-----------------|
| - | - | - | - | - | - | No completed orders this week |

## COMPLETED THIS MONTH

| Order ID | Customer | Product | Delivery Time | CEO Approved | Delivered | Customer Rating |
|----------|----------|---------|---------------|--------------|-----------|-----------------|
| - | - | - | - | - | - | No completed orders this month |

---

## ORDER TEMPLATE

When a new webhook order comes in, add to ACTIVE ORDERS:

```
| #2026-001 | Company Name | 30-day Roadmap | IN_PROGRESS | 2026-01-15 10:00 | 2026-01-16 10:00 | Industry: Tech, Team: 15 |
```

When completed, move to AWAITING CEO REVIEW:

```
| #2026-001 | Company Name | 30-day Roadmap | 2026-01-15 12:00 | 2.0h | Path: /products/2026-001-roadmap.pdf |
```

When CEO approves, move to COMPLETED:

```
| #2026-001 | Company Name | 30-day Roadmap | 2.0h | 2026-01-15 12:30 | 2026-01-15 14:00 | 9/10 (if received) |
```
