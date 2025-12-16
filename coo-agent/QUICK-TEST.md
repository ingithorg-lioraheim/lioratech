# QUICK TEST INSTRUCTIONS

**Test workflow núna strax:**

## 1. Opna nýtt Claude samtal
```
COO, hver er staðan?
```

## 2. Ef þú vilt test með raunverulegri pöntun:

### Option A: Real order (n8n)
- Fylltu út form á vefsíðunni
- Bíddu eftir n8n að búa til pöntun
- Keyra: `./coo fetch && ./coo check`

### Option B: Manual test
```bash
cd coo-agent

# Create test order (or wait for real one)
# Then:
./coo fetch         # Get from Drive
./coo check         # Process it
# → Check Drive processing/ folder
# → Move file to approved/
./coo approve       # Generate PDF
```

## 3. Verify
```bash
./coo status
node scripts/list-drive-folder.js processing  # Empty
node scripts/list-drive-folder.js pdf-files   # Has PDF
```

---

**ALLT VISTAÐ OG TILBÚIÐ!** ✅
