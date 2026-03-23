# -*- coding: utf-8 -*-
import pandas as pd
import re

# Read the CSV
df = pd.read_csv('/Users/ingithor/Downloads/Copy of The list öll fyrirtæki - Master skjal - Fyrirtækjalistinn.csv')

# Clean up column names
df.columns = df.columns.str.strip()

# Convert equity column to numeric, handling Icelandic number format
def clean_equity(value):
    if pd.isna(value) or value == 'X':
        return None
    # Remove quotes and commas, convert to float
    value_str = str(value).replace('"', '').replace(',', '')
    try:
        return float(value_str)
    except:
        return None

df['eigid_fe_clean'] = df['RSK eigð fé'].apply(clean_equity)

# Define industry keywords for different sectors that would benefit from LioraTech
high_value_industries = {
    'Framleiðsla/Manufacturing': ['framleiðsla', 'bakstur', 'gosgerð', 'steinn', 'lím', 'málning', 'tækni', 'bioeffect', 'lyf', 'fóður', 'kjöt', 'grís', 'fugl'],
    'Smásala/Retail': ['búð', 'verslun', 'market', 'sala', 'heilsa', 'sport', 'fitness'],
    'Fasteignir/Real Estate': ['fasteign', 'eigna', 'bygg', 'húsgögn'],
    'Þjónusta/Services': ['ráðgjöf', 'lögmenn', 'bókhald', 'verkfræði', 'hönnun', 'markaðs'],
    'Ferðaþjónusta/Tourism': ['ferða', 'lagoon', 'hótel', 'gisting', 'tour'],
    'Samgöngur/Transport': ['bíla', 'flug', 'cargo', 'sendibíl', 'rental'],
    'Heilbrigðis/Healthcare': ['sjúkra', 'tann', 'apótek', 'heilsu', 'lyf'],
    'Tækni/Tech': ['tölvu', 'tech', 'software', 'origo'],
    'Veitingar/Food Service': ['veitingar', 'pizz', 'bakstur', 'bröð']
}

medium_value_industries = {
    'Byggingarefni/Construction': ['bygg', 'þak', 'gólf', 'hurð', 'glugga', 'steinsteypan', 'blikk'],
    'Hreinlæti/Cleaning': ['þrif', 'hrein'],
    'Ökuskóli/Driving School': ['ökuskól'],
    'Annað/Other': []
}

def score_company(row):
    score = 0
    reasons = []

    company_name = str(row['Fyrirtæki']).lower() if pd.notna(row['Fyrirtæki']) else ''
    equity = row['eigid_fe_clean']
    has_contact = pd.notna(row['Tengiliður']) and str(row['Tengiliður']).strip() != ''
    has_email = pd.notna(row['Netfang / Símanúmer']) and '@' in str(row['Netfang / Símanúmer'])

    # Equity scoring (most important factor)
    if equity:
        if equity >= 1_000_000_000:  # 1B+
            score += 50
            reasons.append(f'Stórt fyrirtæki (>{equity/1_000_000_000:.1f}B ISK)')
        elif equity >= 500_000_000:  # 500M+
            score += 40
            reasons.append(f'Mjög stórt (>{equity/1_000_000:.0f}M ISK)')
        elif equity >= 200_000_000:  # 200M+
            score += 30
            reasons.append(f'Stórt ({equity/1_000_000:.0f}M ISK)')
        elif equity >= 100_000_000:  # 100M+
            score += 20
            reasons.append(f'Miðlungs stórt ({equity/1_000_000:.0f}M ISK)')
        elif equity >= 50_000_000:  # 50M+
            score += 10
            reasons.append(f'Smærra ({equity/1_000_000:.0f}M ISK)')
        elif equity < 0:
            score -= 30
            reasons.append('Neikvætt eigið fé - hætta!')
            return score, reasons, 'D'
    else:
        # No equity data is a concern
        score -= 10
        reasons.append('Engar upplýsingar um eigið fé')

    # Industry fit scoring
    industry_found = False
    for industry_type, keywords in high_value_industries.items():
        for keyword in keywords:
            if keyword in company_name:
                score += 20
                reasons.append(f'Góð atvinnugrein: {industry_type}')
                industry_found = True
                break
        if industry_found:
            break

    if not industry_found:
        for industry_type, keywords in medium_value_industries.items():
            for keyword in keywords:
                if keyword in company_name:
                    score += 10
                    reasons.append(f'Sæmileg atvinnugrein: {industry_type}')
                    industry_found = True
                    break
            if industry_found:
                break

    # Contact information bonus
    if has_contact and has_email:
        score += 15
        reasons.append('Hefur tengiliði og netfang')
    elif has_email:
        score += 10
        reasons.append('Hefur netfang')
    elif has_contact:
        score += 5
        reasons.append('Hefur tengiliði')
    else:
        score -= 15
        reasons.append('Enginn tengiliður eða netfang')

    # Determine priority tier
    if score >= 60:
        tier = 'A'
    elif score >= 40:
        tier = 'B'
    elif score >= 20:
        tier = 'C'
    else:
        tier = 'D'

    return score, reasons, tier

# Score all companies
results = []
for idx, row in df.iterrows():
    if pd.notna(row['Fyrirtæki']) and str(row['Fyrirtæki']).strip():
        score, reasons, tier = score_company(row)
        results.append({
            'Fyrirtæki': row['Fyrirtæki'],
            'Tengiliður': row['Tengiliður'],
            'Netfang': row['Netfang / Símanúmer'],
            'Eigið fé': row['eigid_fe_clean'],
            'Ár': row['Ár'],
            'Score': score,
            'Priority': tier,
            'Ástæður': ' | '.join(reasons)
        })

# Create results DataFrame
results_df = pd.DataFrame(results)

# Sort by score (descending)
results_df = results_df.sort_values('Score', ascending=False)

# Save to CSV
output_file = '/Users/ingithor/Projects/lioratech/kiwi_prioritized_contacts.csv'
results_df.to_csv(output_file, index=False, encoding='utf-8-sig')

# Print summary statistics
print("\n=== SAMANTEKT ===\n")
print(f"Fjöldi fyrirtækja greindra: {len(results_df)}")
print(f"\nFyrirtæki eftir Priority:")
for tier in ['A', 'B', 'C', 'D']:
    count = len(results_df[results_df['Priority'] == tier])
    print(f"  {tier}: {count} fyrirtæki")

print(f"\n=== TOP 20 FYRIRTÆKI ===\n")
for idx, row in results_df.head(20).iterrows():
    equity_str = f"{row['Eigið fé']/1_000_000:.0f}M" if pd.notna(row['Eigið fé']) else 'N/A'
    print(f"{row['Priority']} [{row['Score']:3d}] {row['Fyrirtæki']:40s} ({equity_str} ISK)")
    print(f"          {row['Tengiliður'] if pd.notna(row['Tengiliður']) else 'Enginn tengiliður'} - {row['Netfang'] if pd.notna(row['Netfang']) else 'Ekkert netfang'}")
    print(f"          {row['Ástæður']}\n")

print(f"\nNiðurstöður vistaðar í: {output_file}")

# Also create a separate file for A-tier companies only
a_tier_df = results_df[results_df['Priority'] == 'A']
a_tier_file = '/Users/ingithor/Projects/lioratech/kiwi_a_tier_contacts.csv'
a_tier_df.to_csv(a_tier_file, index=False, encoding='utf-8-sig')
print(f"A-tier fyrirtæki vistuð í: {a_tier_file}")
