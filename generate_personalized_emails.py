# -*- coding: utf-8 -*-
import pandas as pd
import re

# Read the A-tier companies
df = pd.read_csv('/Users/ingithor/Projects/lioratech/kiwi_a_tier_contacts.csv')

# Define industry mapping for personalization
industry_mapping = {
    'origo': 'tækni',
    'tölvu': 'tækni',
    'tech': 'tækni',
    'software': 'tækni',
    'framleiðsla': 'framleiðslu',
    'bakstur': 'matvælaframleiðslu',
    'fóður': 'landbúnaðar',
    'lím': 'byggingarefna',
    'lyf': 'heilbrigðis',
    'heilsu': 'heilbrigðis',
    'apótek': 'heilbrigðis',
    'lagoon': 'ferðaþjónustu',
    'hótel': 'ferðaþjónustu',
    'ferða': 'ferðaþjónustu',
    'bíla': 'bílaiðnaðar',
    'rental': 'bílaleigu',
    'cargo': 'flutninga',
    'sendibíl': 'flutninga',
    'flug': 'flutninga',
    'búð': 'smásölu',
    'verslun': 'smásölu',
    'sala': 'smásölu',
    'fasteign': 'fasteigna',
    'bygg': 'byggingarstarfsemi',
    'verkfræði': 'verkfræðiþjónustu',
    'ráðgjöf': 'ráðgjafar',
}

def get_industry(company_name):
    """Determine industry based on company name"""
    company_lower = company_name.lower()
    for keyword, industry in industry_mapping.items():
        if keyword in company_lower:
            return industry
    return 'viðskipta'  # default

def get_first_name(full_name):
    """Extract first name from full name"""
    if pd.isna(full_name) or str(full_name).strip() == '':
        return None
    # Take first name only
    names = str(full_name).strip().split()
    return names[0] if names else None

def extract_email(contact_field):
    """Extract email from contact field that may contain phone numbers too"""
    if pd.isna(contact_field):
        return None

    # Look for email pattern
    email_pattern = r'[\w\.-]+@[\w\.-]+\.\w+'
    matches = re.findall(email_pattern, str(contact_field))

    if matches:
        # Return first email found
        return matches[0]
    return None

# Email templates
template_v1 = """Efni: Ókeypis AI viðskiptagreining fyrir {company}

Góðan daginn{greeting},

Ég heiti Ingi og er stofnandi LioraTech - við sérhæfum okkur í AI-drifnum viðskiptagreiningum fyrir íslensk fyrirtæki.

Við erum að bjóða völdum fyrirtækjum ókeypis AI-greiningu á rekstri þeirra. Ég skoðaði {company} og tel að þið mynduð hagnast mikið á því að sjá:

📊 Það sem greiningin sýnir:
• Fjármálalega þróun og spár byggðar á opinberum gögnum
• Samanburð við samkeppnina í {industry}
• Mögulega vaxtartækifæri sem AI greinir út frá markaðsgögnum
• Helstu áhættuþætti og tækifæri næstu 12 mánuðina

Þetta kostar ekkert - við erum að byggja upp portfolio af íslenskum fyrirtækjum og viljum sýna fram á verðmæti AI-greininganna okkar.

Mig langar að senda ykkur sérsniðna greiningu fyrir {company} - tekur mig um 2-3 daga að útbúa.

Ef þetta hljómar áhugavert, láttu mig bara vita með svari við þessum pósti.

Bestu kveðjur,
Ingi Þór Sigurðsson
Stofnandi, LioraTech
ingi@lioratech.is | lioratech.is
"""

template_v2 = """Efni: Hvað segja gögnin um {company}?

Góðan daginn{greeting},

Ég hef verið að þróa AI-greiningartól fyrir íslensk fyrirtæki og {company} kom upp sem áhugavert case fyrir okkur.

Stutt um okkur: LioraTech notar gervigreind til að greina viðskiptagögn og spá fyrir um þróun fyrirtækja.

Það sem ég get boðið: Ég get sent þér ókeypis AI-greiningu á {company} sem sýnir:
• Hvernig þið standið í samanburði við atvinnugreinina
• Fjármálalegar spár næstu 12 mánaða
• Vaxtartækifæri sem AI-líkanið okkar finnur
• Áhættupunkta sem vert er að fylgjast með

Þetta er alveg ókeypis - ekkert strengir. Við erum að byggja upp reynslu með íslenskum fyrirtækjum og viljum sýna fram á hvað AI getur gert fyrir ykkur.

Áhugasamur/söm? Svaraðu bara já og ég sendi ykkur greiningu innan viku.

Kveðja,
Ingi Þór Sigurðsson
LioraTech | AI Business Analytics
ingi@lioratech.is
"""

template_v3 = """Efni: Ókeypis AI-greining á {company}?

Hæ{greeting},

Stuttlega: Við hjá LioraTech erum að bjóða {company} ókeypis AI-viðskiptagreiningu.

Hvað færðu:
• Fjármálaspár fyrir næstu 12 mánuði
• Samanburð við keppinauta
• Vaxtartækifæri sem AI finnur
• Áhættupunkta að fylgjast með

Hvað kostar: Ekkert. Við viljum byggja upp portfolio.

Næstu skref: Segðu já, ég sendi greiningu innan 3 daga.

Kv,
Ingi Þór Sigurðsson
LioraTech
ingi@lioratech.is
"""

# Generate personalized emails for each A-tier company
emails = []

for idx, row in df.iterrows():
    company = row['Fyrirtæki']
    contact_name = get_first_name(row['Tengiliður'])
    email = extract_email(row['Netfang'])
    industry = get_industry(company)

    # Create greeting
    if contact_name:
        greeting = f" {contact_name}"
    else:
        greeting = ""

    # Generate all three versions
    email_v1 = template_v1.format(
        company=company,
        greeting=greeting,
        industry=industry
    )

    email_v2 = template_v2.format(
        company=company,
        greeting=greeting
    )

    email_v3 = template_v3.format(
        company=company,
        greeting=greeting
    )

    emails.append({
        'Fyrirtæki': company,
        'Tengiliður': row['Tengiliður'],
        'Netfang': email,
        'Atvinnugrein': industry,
        'Email_V1': email_v1,
        'Email_V2': email_v2,
        'Email_V3': email_v3,
        'Priority_Score': row['Score'],
        'Eigið_fé': row['Eigið fé']
    })

# Create DataFrame
emails_df = pd.DataFrame(emails)

# Save to CSV
output_file = '/Users/ingithor/Projects/lioratech/kiwi_personalized_emails.csv'
emails_df.to_csv(output_file, index=False, encoding='utf-8-sig')

print(f"\n{'='*60}")
print("PERSONALIZED EMAILS GENERATED")
print(f"{'='*60}\n")
print(f"Total A-tier companies: {len(emails_df)}")
print(f"Companies with email: {len(emails_df[emails_df['Netfang'].notna()])}")
print(f"Companies missing email: {len(emails_df[emails_df['Netfang'].isna()])}")

print(f"\n{'='*60}")
print("PREVIEW: TOP 5 COMPANIES")
print(f"{'='*60}\n")

for idx, row in emails_df.head(5).iterrows():
    print(f"\n{'-'*60}")
    print(f"Fyrirtæki: {row['Fyrirtæki']}")
    print(f"Tengiliður: {row['Tengiliður']}")
    print(f"Netfang: {row['Netfang']}")
    print(f"Eigið fé: {row['Eigið_fé']/1_000_000:.0f}M ISK" if pd.notna(row['Eigið_fé']) else "N/A")
    print(f"\nEMAIL VERSION 1 (Personalized):")
    print(f"{'-'*60}")
    print(row['Email_V1'])

print(f"\n{'='*60}")
print(f"Öll tölvupóst vistuð í: {output_file}")
print(f"{'='*60}\n")

# Create a separate file with just companies missing email addresses
missing_email_df = emails_df[emails_df['Netfang'].isna()][['Fyrirtæki', 'Tengiliður', 'Netfang', 'Eigið_fé']]
if len(missing_email_df) > 0:
    missing_file = '/Users/ingithor/Projects/lioratech/kiwi_missing_emails.csv'
    missing_email_df.to_csv(missing_file, index=False, encoding='utf-8-sig')
    print(f"\nFyrirtæki sem vantar netfang vistuð í: {missing_file}")
    print("Þú þarft að finna netföng fyrir þessi fyrirtæki handvirkt.\n")
