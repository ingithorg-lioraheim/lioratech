# 🚀 IMPORT N8N WORKFLOW - Nákvæm skref

## ✅ Skref-fyrir-skref (2 mínútur)

### 1️⃣ Opna n8n
Farðu á: https://lioratech.app.n8n.cloud

### 2️⃣ Búa til nýtt workflow
- Smelltu á `+ Add workflow` takkann (uppi hægra megin)
- Eða ef þú sérð `Workflows` lista, smelltu bara á `+ New`

### 3️⃣ Import JSON skrána
- Smelltu á `⋮` (þrír punktar) í toolbar-inu efst
- Veldu `Import from File...`
- Veldu skrána: `n8n-email-workflow.json`
- Smelltu `Open`

### 4️⃣ Activate workflow
- Workflow opnast sjálfkrafa eftir import
- Efst til hægri sérðu toggle switch (rofa)
- Smelltu á rofann til að activate
- Þú sérð "Active" með græna checkbox ✅

---

## 🎉 KLÁRAÐ!

Workflow er núna virkt og tilbúið að móttaka requests!

---

## 📋 Hvað gerir þetta workflow?

Þegar einhver fyller út form á lioratech.is/roadmap:

1. ✅ **n8n móttekur** form data frá webhook
2. ✅ **n8n býr til** Order ID (t.d. `AI-2026-12-14-X4J2K9`)
3. ✅ **n8n sendir ÞÉR email** með:
   - Öllum customer upplýsingum
   - JSON tilbúið til copy-paste
   - Nákvæmum leiðbeiningum
4. ✅ **n8n sendir CUSTOMER** staðfestingarpóst
5. 👉 **ÞÚ copy-pastar** JSON í terminal (5 sekúndur)
6. ✅ **COO-Agent vinnur** greininguna sjálfkrafa

---

## 🧪 Test það strax!

### Próf 1: Test með raunverulegu formi
1. Farðu á: https://lioratech.is/roadmap
2. Fylltu út formið með test gögnum
3. Smelltu Submit
4. Athugaðu email: ingithorg@gmail.com
5. Þú ættir að fá email frá n8n með öllum gögnunum!

### Próf 2: Test með n8n test mode
1. Í n8n workflow, smelltu á `Webhook - Form Submit` node
2. Smelltu `Listen for Test Event`
3. Í öðrum browser tab, fylltu út formið
4. Workflow á að triggera og sýna gögnin

---

## 🆘 Ef eitthvað virkar ekki

### Email berst ekki?
- ✅ Check að workflow sé `Active` (grænn rofi)
- ✅ Check að Gmail credentials séu rétt uppsett
- ✅ Check spam folder

### Workflow triggerar ekki?
- ✅ Check webhook URL í form kóðanum
- ✅ Ætti að vera: `https://lioratech.app.n8n.cloud/webhook-test/roadmap-request`

### Credentials issue?
- ✅ Opna `Send Email to CEO` node
- ✅ Check Gmail OAuth2 connection
- ✅ Re-authenticate ef þarf

---

**Til hamingju! Þú ert núna með 90% sjálfvirkt AI-greining system! 🎉**
