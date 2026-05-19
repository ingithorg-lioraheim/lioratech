#!/usr/bin/env python3
"""
Email Analysis Script for LioraTech Contact Outreach
Analyzes Gmail MBOX export to find business opportunities
"""

import mailbox
import email
import csv
import re
from collections import defaultdict
from datetime import datetime
import json
import sys

def extract_email_address(email_string):
    """Extract clean email address from 'Name <email@domain.com>' format"""
    if not email_string:
        return ''
    match = re.search(r'<(.+?)>', email_string)
    if match:
        return match.group(1).lower()
    return email_string.lower().strip()

def load_contacts(csv_path):
    """Load contacts from CSV file"""
    contacts = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email_addr = row['Email'].lower().strip()
            contacts[email_addr] = {
                'name': row['Name'],
                'email': row['Email'],
                'company': row['Company/Domain'],
                'emails_sent': 0,
                'emails_received': 0,
                'last_contact': None,
                'conversations': []
            }
    return contacts

def parse_mbox(mbox_path, contacts, max_emails=None):
    """
    Parse MBOX file and extract conversations for each contact
    """
    print("Opening MBOX file: {}".format(mbox_path))

    try:
        mbox = mailbox.mbox(mbox_path)
    except Exception as e:
        print("ERROR: Could not open MBOX file: {}".format(str(e)))
        return contacts

    total_emails = len(mbox)
    print("Total emails in MBOX: {}".format(total_emails))

    if max_emails:
        print("Processing first {} emails...".format(max_emails))
    else:
        print("Processing all emails...")

    processed = 0
    matched = 0

    for idx, message in enumerate(mbox):
        if max_emails and idx >= max_emails:
            break

        if idx % 1000 == 0:
            print("  Processed {} emails... ({} matched to contacts)".format(idx, matched))

        try:
            # Get email addresses
            from_addr = extract_email_address(message.get('From', ''))
            to_addrs = message.get('To', '')
            cc_addrs = message.get('Cc', '')

            # Extract all recipient addresses
            all_recipients = []
            for addr_string in [to_addrs, cc_addrs]:
                if addr_string:
                    for addr in addr_string.split(','):
                        extracted = extract_email_address(addr)
                        if extracted:
                            all_recipients.append(extracted)

            # Get email content
            subject = message.get('Subject', '(No subject)')
            date_str = message.get('Date', '')

            # Parse date
            try:
                date = email.utils.parsedate_to_datetime(date_str)
            except:
                date = None

            # Get body
            body = ''
            if message.is_multipart():
                for part in message.walk():
                    if part.get_content_type() == 'text/plain':
                        try:
                            body = part.get_payload(decode=True).decode('utf-8', errors='ignore')
                            break
                        except:
                            pass
            else:
                try:
                    body = message.get_payload(decode=True).decode('utf-8', errors='ignore')
                except:
                    body = ''

            # Limit body length
            body = body[:2000] if body else ''

            # Check if this email involves any of our contacts
            involved_contacts = []

            # Check sender (if from contact = we received from them)
            if from_addr in contacts:
                involved_contacts.append((from_addr, 'received'))

            # Check recipients (if to contact = we sent to them)
            for recipient in all_recipients:
                if recipient in contacts:
                    involved_contacts.append((recipient, 'sent'))

            # Store conversation for matched contacts
            for contact_email, direction in involved_contacts:
                matched += 1
                contact = contacts[contact_email]

                if direction == 'sent':
                    contact['emails_sent'] += 1
                else:
                    contact['emails_received'] += 1

                # Update last contact date
                if date:
                    if not contact['last_contact'] or date > contact['last_contact']:
                        contact['last_contact'] = date

                # Store conversation snippet (limit to last 50)
                if len(contact['conversations']) < 50:
                    contact['conversations'].append({
                        'subject': subject,
                        'date': date.isoformat() if date else '',
                        'direction': direction,
                        'body_snippet': body[:500]
                    })

            processed += 1

        except Exception as e:
            if idx < 10:  # Only print first few errors
                print("  Error processing email {}: {}".format(idx, str(e)))
            continue

    print("\n✅ Parsing complete!")
    print("  Total emails processed: {}".format(processed))
    print("  Emails matched to contacts: {}".format(matched))

    return contacts

def analyze_contact_for_opportunities(contact):
    """
    Analyze a contact's email history for LioraTech opportunities
    Returns: (priority_score, notes)
    """
    priority = 0
    notes = []

    # Email frequency score
    total_emails = contact['emails_sent'] + contact['emails_received']
    if total_emails > 50:
        priority += 3
        notes.append("Heavy email history ({} emails)".format(total_emails))
    elif total_emails > 20:
        priority += 2
        notes.append("Moderate email history ({} emails)".format(total_emails))
    elif total_emails > 5:
        priority += 1
        notes.append("Some email history ({} emails)".format(total_emails))
    else:
        notes.append("Limited email history ({} emails)".format(total_emails))

    # Recent contact score
    if contact['last_contact']:
        days_since = (datetime.now(contact['last_contact'].tzinfo) - contact['last_contact']).days
        if days_since < 90:
            priority += 2
            notes.append("Recent contact ({}d ago)".format(days_since))
        elif days_since < 365:
            priority += 1
            notes.append("Contacted in past year ({}d ago)".format(days_since))
        else:
            notes.append("Last contact {}d ago".format(days_since))

    # Analyze conversation content for keywords
    all_text = ' '.join([
        conv.get('subject', '') + ' ' + conv.get('body_snippet', '')
        for conv in contact['conversations']
    ]).lower()

    # LioraTech relevant keywords
    keywords = {
        'analytics': ['analytics', 'data analysis', 'reporting', 'dashboard', 'metrics', 'kpi'],
        'marketing': ['marketing', 'campaign', 'ads', 'facebook', 'google ads', 'social media', 'auglysing'],
        'website': ['website', 'web', 'traffic', 'conversion', 'seo', 'vefur'],
        'business': ['business', 'growth', 'strategy', 'optimization', 'revenue', 'sala'],
        'data': ['data', 'database', 'tracking', 'measurement', 'gogn']
    }

    found_topics = []
    for topic, terms in keywords.items():
        if any(term in all_text for term in terms):
            found_topics.append(topic)
            priority += 1

    if found_topics:
        notes.append("Relevant topics: {}".format(', '.join(found_topics)))

    # Company domain analysis
    company = contact['company'].lower()
    if 'kiwi.is' in company:
        priority += 2
        notes.append("Former KIWI colleague - warm contact")

    # Business indicators
    if not any(personal in company for personal in ['gmail', 'hotmail', 'yahoo']):
        priority += 1
        notes.append("Business email")

    # Cap priority at 5
    priority = min(priority, 5)

    return priority, ' | '.join(notes)

def generate_analysis_report(contacts, output_csv):
    """Generate analysis report with priorities and notes"""

    # Filter contacts with email history
    contacts_with_emails = {
        email: data for email, data in contacts.items()
        if data['emails_sent'] + data['emails_received'] > 0
    }

    print("\n📊 ANALYSIS SUMMARY")
    print("="*60)
    print("Contacts with email history: {} / {}".format(
        len(contacts_with_emails), len(contacts)
    ))

    # Analyze each contact
    analysis_results = []
    for email_addr, contact in contacts_with_emails.items():
        priority, notes = analyze_contact_for_opportunities(contact)

        analysis_results.append({
            'Name': contact['name'],
            'Email': contact['email'],
            'Company/Domain': contact['company'],
            'Total Emails': contact['emails_sent'] + contact['emails_received'],
            'Sent': contact['emails_sent'],
            'Received': contact['emails_received'],
            'Last Contact': contact['last_contact'].strftime('%Y-%m-%d') if contact['last_contact'] else 'Unknown',
            'Priority': priority,
            'Notes': notes,
            'Outreach Status': 'Not Contacted'
        })

    # Sort by priority (high to low) then by total emails
    analysis_results.sort(key=lambda x: (x['Priority'], x['Total Emails']), reverse=True)

    # Write to CSV
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        if analysis_results:
            writer = csv.DictWriter(f, fieldnames=analysis_results[0].keys())
            writer.writeheader()
            writer.writerows(analysis_results)

    # Print summary
    priority_counts = defaultdict(int)
    for result in analysis_results:
        priority_counts[result['Priority']] += 1

    print("\n🎯 PRIORITY DISTRIBUTION:")
    for priority in sorted(priority_counts.keys(), reverse=True):
        print("  Priority {}: {} contacts".format(priority, priority_counts[priority]))

    print("\n🏆 TOP 20 OPPORTUNITIES:")
    print("-"*80)
    for i, result in enumerate(analysis_results[:20], 1):
        print("{}. {} ({})".format(i, result['Name'], result['Email']))
        print("   Priority: {} | {} emails | Last: {}".format(
            result['Priority'], result['Total Emails'], result['Last Contact']
        ))
        print("   {}".format(result['Notes']))
        print()

    print("✅ Full analysis saved to: {}".format(output_csv))

    return analysis_results

if __name__ == '__main__':
    print("="*60)
    print("LioraTech Email Analysis Tool")
    print("="*60)
    print()

    # Check if MBOX path provided as argument
    if len(sys.argv) > 1:
        MBOX_PATH = sys.argv[1]
    else:
        # Default path - update this after downloading
        MBOX_PATH = '/Users/ingithor/Downloads/Takeout/Mail/All mail Including Spam and Trash.mbox'

    CONTACTS_CSV = '/Users/ingithor/Projects/lioratech/lioratech_outreach_complete.csv'
    OUTPUT_CSV = '/Users/ingithor/Projects/lioratech/lioratech_analyzed_opportunities.csv'

    # Check if files exist
    import os
    if not os.path.exists(MBOX_PATH):
        print("ERROR: MBOX file not found at: {}".format(MBOX_PATH))
        print("\nPlease:")
        print("1. Download and extract your Google Takeout")
        print("2. Find the .mbox file")
        print("3. Run: python3 analyze_emails.py /path/to/file.mbox")
        sys.exit(1)

    if not os.path.exists(CONTACTS_CSV):
        print("ERROR: Contacts CSV not found at: {}".format(CONTACTS_CSV))
        sys.exit(1)

    # Load contacts
    print("Loading contacts from CSV...")
    contacts = load_contacts(CONTACTS_CSV)
    print("  Loaded {} contacts".format(len(contacts)))
    print()

    # Parse MBOX
    contacts = parse_mbox(MBOX_PATH, contacts, max_emails=None)

    # Generate analysis
    analysis_results = generate_analysis_report(contacts, OUTPUT_CSV)

    print("\n" + "="*60)
    print("✅ ANALYSIS COMPLETE!")
    print("="*60)
    print("\nNext steps:")
    print("1. Review: {}".format(OUTPUT_CSV))
    print("2. Start with Priority 5 contacts")
    print("3. Focus on former KIWI colleagues and recent contacts")
