#!/usr/bin/env node

/**
 * KIWI CONTACT AI ANALYSIS GENERATOR
 *
 * Usage:
 *   node generate-kiwi-analysis.js "LímtréVírnet|Andri|andri@limtrevirnet.is|1125927076|2022|85|A|Framleiðsla|https://limtrevirnet.is/"
 *
 * This script:
 * 1. Parses company data from KIWI contact list
 * 2. Fetches company website data
 * 3. Generates AI analysis using LioraTech template
 * 4. Saves markdown to Google Drive "pending" folder
 * 5. Logs to tracking system
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const input = process.argv[2];

if (!input) {
  console.error('❌ Error: No company data provided');
  console.log('\nUsage:');
  console.log('  node generate-kiwi-analysis.js "Company|Contact|Email|Equity|Year|Score|Priority|Industry|Website"');
  console.log('\nExample:');
  console.log('  node generate-kiwi-analysis.js "LímtréVírnet|Andri|andri@limtrevirnet.is|1125927076|2022|85|A|Framleiðsla|https://limtrevirnet.is/"');
  process.exit(1);
}

// Parse input data
const parts = input.split('|').map(p => p.trim());
const [
  companyName,
  contactName,
  email,
  equity,
  year,
  score,
  priority,
  industry,
  website
] = parts;

// Validate required fields
if (!companyName || !website) {
  console.error('❌ Error: Missing required fields (company name and website)');
  process.exit(1);
}

console.log('⚙️ COO-Agent: Starting AI analysis generation');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Company: ${companyName}`);
console.log(`Contact: ${contactName || 'N/A'}`);
console.log(`Email: ${email || 'N/A'}`);
console.log(`Equity: ${equity ? `${parseInt(equity)/1000000}M ISK` : 'N/A'}`);
console.log(`Industry: ${industry || 'N/A'}`);
console.log(`Website: ${website || 'N/A'}`);
console.log(`Priority: ${priority || 'N/A'} (Score: ${score || 'N/A'})`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Generate Order ID
const orderId = `KIWI-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
console.log(`Order ID: ${orderId}`);

// Create company data object
const companyData = {
  orderId,
  companyName,
  contactName: contactName || '',
  email: email || '',
  equity: equity ? parseInt(equity) : null,
  year: year || '',
  score: score || '',
  priority: priority || '',
  industry: industry || 'Almenn viðskipti',
  website: website || '',
  timestamp: new Date().toISOString()
};

// Save company data to temp file for Claude to process
const tempDataFile = path.join(__dirname, `../triggers/pending/${orderId}.json`);
fs.mkdirSync(path.dirname(tempDataFile), { recursive: true });
fs.writeFileSync(tempDataFile, JSON.stringify(companyData, null, 2));

console.log(`\n✅ Company data saved: ${tempDataFile}`);
console.log('\n⏳ Ready for COO-Agent to process...');
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 NEXT STEPS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`1. COO-Agent will fetch website: ${website}`);
console.log(`2. COO-Agent will generate AI analysis`);
console.log(`3. COO-Agent will save to Google Drive "pending" folder`);
console.log(`4. CEO review and send to customer`);
console.log('\n🤖 Waiting for COO-Agent to pick up this order...\n');

// Output the order ID for tracking
console.log(`\n📦 Order ID: ${orderId}`);
console.log(`📁 Data file: triggers/pending/${orderId}.json`);
