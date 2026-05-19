#!/usr/bin/env python3
import csv
from collections import defaultdict
import re

# Read both contact CSV files
all_contacts = []
seen_emails = set()

def read_contacts_file(filepath):
    contacts = []
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Get email from first column
            email = row.get('E-mail 1 - Value', '').strip()

            # Also check for second email if it exists
            email2 = row.get('E-mail 2 - Value', '').strip()

            if email:
                first_name = row.get('First Name', '').strip()
                last_name = row.get('Last Name', '').strip()
                full_name = (first_name + ' ' + last_name).strip()

                contacts.append({
                    'email': email,
                    'name': full_name if full_name else '(No name)',
                    'email2': email2
                })
    return contacts

# Read first file (myContacts)
print("Reading contacts.csv...")
contacts1 = read_contacts_file('/Users/ingithor/Downloads/contacts.csv')
print("  Found {} contacts".format(len(contacts1)))

# Read second file (Other Contacts)
print("Reading contacts (1).csv...")
contacts2 = read_contacts_file('/Users/ingithor/Downloads/contacts (1).csv')
print("  Found {} contacts".format(len(contacts2)))

# Merge and deduplicate
for contact in contacts1 + contacts2:
    email = contact['email'].lower()
    if email and email not in seen_emails:
        seen_emails.add(email)
        all_contacts.append(contact)

    # Also add second email if exists
    if contact.get('email2'):
        email2 = contact['email2'].lower()
        if email2 and email2 not in seen_emails:
            seen_emails.add(email2)
            all_contacts.append({
                'email': contact['email2'],
                'name': contact['name'],
                'email2': ''
            })

print("\nTotal unique contacts: {}".format(len(all_contacts)))

# Extract domain from email
def get_domain(email):
    match = re.search(r'@(.+)$', email)
    return match.group(1) if match else ''

# Organize by company/domain
by_domain = defaultdict(list)
for contact in all_contacts:
    domain = get_domain(contact['email'])
    by_domain[domain].append(contact)

# Sort domains by number of contacts
sorted_domains = sorted(by_domain.items(), key=lambda x: len(x[1]), reverse=True)

# Print statistics
print("\n" + "="*60)
print("📊 CONTACT STATISTICS")
print("="*60)
print("Total unique emails: {}".format(len(all_contacts)))
print("Unique domains: {}".format(len(by_domain)))
print()

print("🏢 TOP 30 COMPANIES (by number of contacts):")
print("="*60)
for domain, domain_contacts in sorted_domains[:30]:
    print("{:45} ({} contacts)".format(domain, len(domain_contacts)))
print()

# KIWI contacts specifically
kiwi_contacts = [c for c in all_contacts if 'kiwi.is' in c['email'].lower()]
print("🎯 KIWI.IS CONTACTS: {} found".format(len(kiwi_contacts)))
print()

# Write all emails to file
with open('/Users/ingithor/Projects/lioratech/all_emails_complete.txt', 'w') as f:
    for contact in all_contacts:
        f.write(contact['email'] + '\n')

# Write detailed contact list by company
with open('/Users/ingithor/Projects/lioratech/contacts_by_company_complete.txt', 'w') as f:
    f.write("COMPLETE CONTACTS ORGANIZED BY COMPANY\n")
    f.write("=" * 80 + "\n")
    f.write("Total: {} contacts across {} companies\n\n".format(len(all_contacts), len(by_domain)))

    for domain, domain_contacts in sorted_domains:
        f.write("\n{} ({} contacts)\n".format(domain.upper(), len(domain_contacts)))
        f.write("-" * 80 + "\n")
        for contact in domain_contacts:
            name = contact['name'] if contact['name'] else '(No name)'
            f.write("  {:35} {}\n".format(name, contact['email']))

# Write CSV for outreach with all contacts
with open('/Users/ingithor/Projects/lioratech/lioratech_outreach_complete.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Email', 'Company/Domain', 'Industry Type', 'Priority', 'Outreach Status', 'Notes'])

    for contact in sorted(all_contacts, key=lambda x: get_domain(x['email'])):
        domain = get_domain(contact['email'])

        # Auto-categorize industry type based on domain
        industry = ''
        if any(word in domain for word in ['gmail', 'hotmail', 'yahoo']):
            industry = 'Personal'
        elif 'kiwi.is' in domain:
            industry = 'KIWI (Former colleagues)'

        writer.writerow([contact['name'], contact['email'], domain, industry, '', 'Not Contacted', ''])

# Write KIWI contacts separately
with open('/Users/ingithor/Projects/lioratech/kiwi_contacts_only.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Email', 'Notes'])
    for contact in kiwi_contacts:
        writer.writerow([contact['name'], contact['email'], ''])

print("✅ FILES CREATED:")
print("  - all_emails_complete.txt ({} emails)".format(len(all_contacts)))
print("  - contacts_by_company_complete.txt (organized by company)")
print("  - lioratech_outreach_complete.csv (full outreach tracking)")
print("  - kiwi_contacts_only.csv ({} KIWI contacts)".format(len(kiwi_contacts)))
