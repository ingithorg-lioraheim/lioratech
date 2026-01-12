# ⚠️ REVERT TO PRODUCTION PRICING

## After successful 1,000 ISK test, revert pricing back to production!

### File to edit:
`/Users/ingithor/Projects/lioratech/pages/ThirtyDayRoadmapPaymentPage.tsx`

### Change from TEST mode:
```typescript
// ⚠️⚠️⚠️ TESTING MODE - 1000 ISK TEST PAYMENT ⚠️⚠️⚠️
// TODO: REVERT TO PRODUCTION PRICING AFTER TEST!
// const PRICE_ISK = 69900; // PRODUCTION: Price in ISK (without VSK)
// const TOTAL_WITH_VSK = Math.round(PRICE_ISK * 1.24); // PRODUCTION: Total with 24% VSK
const PRICE_ISK = 806; // TEST: Price without VSK for 1000 ISK total
const TOTAL_WITH_VSK = 1000; // TEST: 1000 ISK test payment
```

### Back to PRODUCTION mode:
```typescript
const PRICE_ISK = 69900; // Price in ISK (without VSK)
const TOTAL_WITH_VSK = Math.round(PRICE_ISK * 1.24); // Total with 24% VSK = 86,676 ISK
```

### Then:
1. `npm run build`
2. `git add pages/ThirtyDayRoadmapPaymentPage.tsx`
3. `git commit -m "PRODUCTION: Revert to production pricing 69,900 ISK"`
4. `git push origin main`
5. Wait for Netlify deploy
6. **GO LIVE! 🚀**
