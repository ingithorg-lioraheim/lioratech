# UTM Parameter Guide fyrir LioraTech Email Campaigns

## 📊 Hvað eru UTM parameters?

UTM parameters eru tags sem þú bætir við URL til að tracka hvaðan traffic kemur í Google Analytics.

**Dæmi:**
```
https://lioratech.is/30dagaplan?utm_source=free_analysis_email&utm_medium=email&utm_campaign=upsell_30day&utm_content=cta_primary
```

---

## 🎯 UTM Parameters sem við notum:

| Parameter | Hvað það þýðir | Dæmi |
|-----------|----------------|------|
| `utm_source` | Hvar kom notandinn frá? | `free_analysis_email`, `newsletter`, `linkedin` |
| `utm_medium` | Hvaða tegund af traffic? | `email`, `social`, `cpc`, `referral` |
| `utm_campaign` | Hvaða herferð/tilgangur? | `upsell_30day`, `launch_promo`, `q1_2026` |
| `utm_content` | Hvaða CTA/útgáfa? | `cta_primary`, `cta_footer`, `button_v2` |
| `utm_term` | (Optional) Leitarorð fyrir PPC | `ai automation`, `business ai` |

---

## 📧 UTM Strategy fyrir Fría Greininguna

### **Email Flow:**

```
1. Notandi fær FRÍA GREINING með 3-5 tækifærum
   └─> Email inniheldur:
       - Greiningarniðurstöður
       - CTA: "Viltu innleiða þetta? Fáðu 30 daga plan"
       - Link með UTM parameters
```

### **UTM Template fyrir Free Analysis Emails:**

#### **Primary CTA (efst í emaili):**
```
https://lioratech.is/30dagaplan?utm_source=free_analysis_email&utm_medium=email&utm_campaign=upsell_30day&utm_content=cta_primary
```

#### **Secondary CTA (neðst í emaili):**
```
https://lioratech.is/30dagaplan?utm_source=free_analysis_email&utm_medium=email&utm_campaign=upsell_30day&utm_content=cta_footer
```

#### **"Frekari upplýsingar" link:**
```
https://lioratech.is/?utm_source=free_analysis_email&utm_medium=email&utm_campaign=upsell_30day&utm_content=link_learn_more
```

---

## 📋 UTM Templates fyrir aðrar Email Campaigns:

### **Newsletter:**
```
https://lioratech.is/greining?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_tips&utm_content=cta_week12
```

### **Quote Follow-up:**
```
https://lioratech.is/30dagaplan?utm_source=quote_followup&utm_medium=email&utm_campaign=lead_nurture&utm_content=day3_email
```

### **12 Month Roadmap Upsell:**
```
https://lioratech.is/quote?utm_source=30day_completion_email&utm_medium=email&utm_campaign=upsell_12month&utm_content=cta_primary
```

---

## 🔧 Hvernig á að búa til UTM links:

### **Option 1: Google Campaign URL Builder**
https://ga-dev-tools.google/ga4/campaign-url-builder/

### **Option 2: Handvirkt**
Format:
```
{base_url}?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

Dæmi:
```
https://lioratech.is/30dagaplan?utm_source=free_analysis_email&utm_medium=email&utm_campaign=upsell_30day&utm_content=cta_primary
```

---

## 📈 Hvað er hægt að mæla með UTM?

### **Conversion Funnel frá Free Analysis:**

```
Google Analytics → Reports → Acquisition → Traffic Acquisition

Filter: utm_source = "free_analysis_email"
```

**Þú getur séð:**
1. ✅ Hversu margir smella á linkinn í emailinu
2. ✅ Hversu margir byrja questionnaire (begin_checkout event)
3. ✅ Hversu margir klára greiðslu (purchase event)
4. ✅ Conversion rate: Email click → Purchase
5. ✅ Revenue frá free analysis emails

---

## 💡 ROI Útreikningur fyrir Free Analysis:

**Dæmi:**

```
100 free analysis sent
├─> 30 smelltu á email link (30% email CTR)
    ├─> 15 byrjuðu questionnaire (50% landing page conversion)
        ├─> 5 kláruðu greiðslu (33% checkout conversion)
            └─> 5 × 86,676 ISK = 433,380 ISK revenue

ROI á 100 free analysis = 433,380 ISK
ROI per free analysis = 4,334 ISK
```

**Ef þú sendir út 85 free analysis/mánuð:**
```
85 × 4,334 ISK = 368,390 ISK/month = 4.4M ISK/year
```

**Þetta sýnir að free analysis er MJÖG arðbær lead magnet!**

---

## 🎯 Naming Convention fyrir UTM:

### **utm_source:**
- `free_analysis_email` - Email eftir fría greiningu
- `newsletter` - Vikuleg newsletter
- `quote_followup` - Follow-up eftir quote request
- `30day_completion_email` - Eftir að 30 day plan er lokið
- `linkedin_post` - Social media post
- `facebook_ad` - Paid ad á Facebook

### **utm_medium:**
- `email` - Email campaigns
- `social` - Organic social media
- `cpc` - Paid ads (cost-per-click)
- `referral` - Partner/referral links

### **utm_campaign:**
- `upsell_30day` - Upsell til 30 daga plan
- `upsell_12month` - Upsell til 12 mánaða roadmap
- `launch_promo` - Launch herferð
- `q1_2026` - Q1 campaign
- `lead_nurture` - Lead nurturing sequence

### **utm_content:**
- `cta_primary` - Aðal CTA takki
- `cta_footer` - Footer CTA
- `button_v2` - A/B test útgáfa
- `link_learn_more` - Text link
- `image_banner` - Banner mynd

---

## ✅ Best Practices:

1. **Alltaf lowercase:** `utm_source=free_analysis_email` (EKKI `Free_Analysis_Email`)
2. **Notaðu underscore í stað bila:** `free_analysis_email` (EKKI `free analysis email`)
3. **Vertu consistent:** Notaðu sömu naming convention alltaf
4. **Ekki nota UTM fyrir internal links:** Bara fyrir external traffic
5. **Haltu UTM listanum uppfærðum:** Document alla campaigns

---

## 🚀 Næstu skref:

1. ✅ Bættu UTM parameters við alla email templates
2. ✅ Settu upp custom report í GA4 fyrir email campaigns
3. ✅ Búðu til A/B test með mismunandi `utm_content` gildum
4. ✅ Trackadu conversion rate fyrir hvern email type
5. ✅ Optimize email content byggt á gögnum

---

## 📞 Spurningar?

Ef þú ert fastur eða vilt sjá dæmi um hvernig á að setja þetta upp í n8n email workflows, láttu mig vita!

---

**Búið til:** 2026-01-08
**Fyrir:** LioraTech Email Campaign Tracking
