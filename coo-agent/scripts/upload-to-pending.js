#!/usr/bin/env node

/**
 * Upload Analysis to Google Drive "Pending" Folder
 *
 * Usage:
 *   node upload-to-pending.js <markdown-file-path>
 */

import fs from 'fs/promises';
import path from 'path';
import { getDriveClient, uploadFile } from './drive-helper.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  if (process.argv.length < 3) {
    console.error('❌ Error: No file path provided');
    console.log('\nUsage: node upload-to-pending.js <markdown-file-path>');
    process.exit(1);
  }

  const filePath = process.argv[2];
  const fileName = path.basename(filePath);

  console.log('\n⚙️ COO-Agent: Uploading to Google Drive');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`File: ${fileName}`);

  try {
    // Read file content
    console.log('\n[1/3] Reading file...');
    const content = await fs.readFile(filePath, 'utf8');
    console.log(`✅ Read ${content.length} characters`);

    // Get Drive client
    console.log('\n[2/3] Connecting to Google Drive...');
    const drive = await getDriveClient();
    console.log('✅ Connected');

    // Upload to "pending" folder
    console.log('\n[3/3] Uploading to "Frí-greining/pending"...');
    const PENDING_FOLDER_ID = '1LAL8vJz3PCiTDCL1igTqNtqsO0pI4ap-';

    const result = await uploadFile(
      drive,
      fileName,
      content,
      PENDING_FOLDER_ID,
      'text/markdown'
    );

    console.log('✅ Uploaded successfully!');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📁 File Details:');
    console.log(`   Name: ${result.name}`);
    console.log(`   ID: ${result.id}`);
    console.log(`   Link: ${result.webViewLink}`);
    console.log('\n📋 Status: PENDING REVIEW');
    console.log('   Move to "approved" folder when ready to send');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
