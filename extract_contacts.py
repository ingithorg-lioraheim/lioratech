#!/usr/bin/env python3
import csv
from collections import defaultdict
import re

# Read the contacts CSV
contacts = []
with open('/Users/ingithor/Downloads/contacts.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        email = row.get('E-mail 1 - Value', '').strip()
        if email:
            first_name = row.get('First Name', '').strip()
            last_name = row.get('Last Name', '').strip()
            full_name = (first_name + ' ' + last_name).strip()
            contacts.append({
                'email': email,
                'name': full_name
            })

# Extract domain from email
def get_domain(email):
    match = re.search(r'@(.+)$', email)
    return match.group(1) if match else ''

# Organize by company/domain
by_domain = defaultdict(list)
for contact in contacts:
    domain = get_domain(contact['email'])
    by_domain[domain].append(contact)

# Sort domains by number of contacts
sorted_domains = sorted(by_domain.items(), key=lambda x: len(x[1]), reverse=True)

# Print statistics
print("📊 CONTACT STATISTICS")
print("=" * 60)
print("Total contacts: {}".format(len(contacts)))
print("Unique domains: {}".format(len(by_domain)))
print()

print("🏢 TOP COMPANIES (by number of contacts):")
print("=" * 60)
for domain, domain_contacts in sorted_domains[:20]:
    print("{:40} ({} contacts)".format(domain, len(domain_contacts)))
print()

# Write all emails to file
with open('/Users/ingithor/Projects/lioratech/all_emails.txt', 'w') as f:
    for contact in contacts:
        f.write(contact['email'] + '\n')

# Write detailed contact list by company
with open('/Users/ingithor/Projects/lioratech/contacts_by_company.txt', 'w') as f:
    f.write("CONTACTS ORGANIZED BY COMPANY\n")
    f.write("=" * 80 + "\n\n")

    for domain, domain_contacts in sorted_domains:
        f.write("\n{} ({} contacts)\n".format(domain.upper(), len(domain_contacts)))
        f.write("-" * 80 + "\n")
        for contact in domain_contacts:
            name = contact['name'] if contact['name'] else '(No name)'
            f.write("  {:30} {}\n".format(name, contact['email']))

# Write CSV for outreach
with open('/Users/ingithor/Projects/lioratech/lioratech_outreach_contacts.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Email', 'Company/Domain', 'Outreach Status', 'Notes'])

    for contact in contacts:
        domain = get_domain(contact['email'])
        writer.writerow([contact['name'], contact['email'], domain, 'Not Contacted', ''])

print("✅ FILES CREATED:")
print("  - all_emails.txt (simple email list)")
print("  - contacts_by_company.txt (organized by company)")
print("  - lioratech_outreach_contacts.csv (for tracking outreach)")
