# ⚡ Quick Start Guide - 5 Mínútur

Þessi leiðbeiningar láta þig koma demo gangandi á **5 mínútum**.

---

## 🚀 Hraðuppsetning

### 1️⃣ Keyra setup script (2 mín)

```bash
cd customs-demo
./setup.sh
```

Þetta setur upp allt sjálfkrafa!

### 2️⃣ Bæta við OpenAI API key (1 mín)

```bash
# Opna .env skrána
nano .env

# Eða í VS Code:
code .env
```

Bæta við þínum OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

💡 **Átt ekki API key?** → [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 3️⃣ Keyra demo (1 mín)

```bash
# Activate virtual environment (ef ekki þegar virkt)
source venv/bin/activate

# Keyra appið
streamlit run app.py
```

Demo opnast í browser á `http://localhost:8501` 🎉

---

## 📝 Prófa með sample skjali

Í appinu:

1. **Búa til sample PDF** eða nota textann í `sample_documents/sample_invoice.txt`
2. **Hlaða upp** skjalinu
3. **Ýta á "Vinna úr skjali"**
4. **Bíða 10-30 sek** á meðan AI vinnur
5. **Sjá niðurstöður!** ✨

---

## 🛑 Algeng vandamál

### "Tesseract not found"
```bash
# MacOS:
brew install tesseract tesseract-lang

# Ubuntu:
sudo apt-get install tesseract-ocr tesseract-ocr-isl
```

### "OpenAI API error"
- Athuga að API key sé rétt í `.env`
- Athuga að þú sért með credit hjá OpenAI
- Athuga internet tengingu

### "Module not found"
```bash
# Re-install dependencies:
pip install -r requirements.txt
```

---

## 💡 Tips fyrir kynningu

### Fyrir Icetransport fundinn:

1. **Keyra locally á þínum Mac:**
   - Öruggara (engin gögn fara í cloud nema í gegnum OpenAI)
   - Hraðara
   - Sýnir live demo

2. **Hafa sample invoice tilbúið:**
   - Custom sample með nafni þeirra þegar átt er við
   - Sýnir að þetta virkar á íslensku líka

3. **Tala um limitations:**
   - Þetta er POC, ekki production ready
   - Þarf mannlega yfirferð (95-98% nákvæmni)
   - Þarf integration við núverandi kerfi

4. **Focus á value:**
   - Sýna tímasparnaðinn
   - Sýna hversu auðvelt þetta er
   - Útskýra hvernig þetta passar inn í núverandi workflow

---

## 📞 Þarftu hjálp?

**Ingi Þór Gunnarsson**
📧 ingi@lioratech.is
📱 [þitt númer]

---

Gangi vel! 🚀
