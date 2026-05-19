#!/usr/bin/env node

/**
 * FETCH FROM GOOGLE DRIVE
 * Downloads pending order files from Google Drive to local processing queue
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

// Configuration
const CONFIG_FILE = path.join(BASE_DIR, '.google-drive-config.json');
const PENDING_DIR = path.join(BASE_DIR, 'requests', 'pending');

/**
 * Load Google Drive configuration
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('❌ Configuration file not found!');
    console.error(`   Expected: ${CONFIG_FILE}`);
    console.error('');
    console.error('📋 Setup instructions:');
    console.error('   1. Go to: https://console.cloud.google.com/apis/credentials');
    console.error('   2. Create OAuth 2.0 credentials');
    console.error('   3. Download JSON and save as .google-drive-config.json');
    console.error('   4. Run this script again');
    console.error('');
    console.error('   See GOOGLE-DRIVE-SETUP.md for detailed instructions');
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

/**
 * Authenticate with Google Drive
 */
async function authenticate(config) {
  const { client_id, client_secret, redirect_uris, refresh_token } = config;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  if (refresh_token) {
    oauth2Client.setCredentials({ refresh_token });
  } else {
    console.error('❌ No refresh token found!');
    console.error('   Run: node scripts/setup-google-drive-auth.js');
    process.exit(1);
  }

  return oauth2Client;
}

/**
 * List files in Google Drive folder
 */
async function listFiles(drive, folderId) {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id, name, createdTime)',
    orderBy: 'createdTime'
  });

  return response.data.files || [];
}

/**
 * Download file from Google Drive
 */
async function downloadFile(drive, fileId, fileName, destPath) {
  const dest = fs.createWriteStream(destPath);

  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    response.data
      .on('end', () => {
        console.log(`   ✅ Downloaded: ${fileName}`);
        resolve();
      })
      .on('error', err => {
        console.error(`   ❌ Error downloading ${fileName}:`, err);
        reject(err);
      })
      .pipe(dest);
  });
}

/**
 * Move file in Google Drive (to processing folder)
 */
async function moveFile(drive, fileId, newParentId) {
  // Get current parents
  const file = await drive.files.get({
    fileId,
    fields: 'parents'
  });

  const previousParents = file.data.parents.join(',');

  // Move to new parent
  await drive.files.update({
    fileId,
    addParents: newParentId,
    removeParents: previousParents,
    fields: 'id, parents'
  });
}

/**
 * Fetch files from Google Drive
 * Can be called directly or imported by other scripts
 */
async function fetchFromDrive() {
  console.log('⚙️  COO-Agent: Fetching from Google Drive...\n');

  // Load configuration
  const config = loadConfig();

  // Authenticate
  const auth = await authenticate(config);
  const drive = google.drive({ version: 'v3', auth });

  // Get folder IDs from config
  const pendingFolderId = config.folders.pending;
  const processingFolderId = config.folders.processing;

  if (!pendingFolderId) {
    console.error('❌ Pending folder ID not configured!');
    console.error('   Edit .google-drive-config.json and add folder IDs');
    process.exit(1);
  }

  // Ensure local pending directory exists
  if (!fs.existsSync(PENDING_DIR)) {
    fs.mkdirSync(PENDING_DIR, { recursive: true });
  }

  // List files in Google Drive pending folder
  console.log('📂 Checking Google Drive pending folder...');
  const files = await listFiles(drive, pendingFolderId);

  if (files.length === 0) {
    console.log('   ℹ️  No pending files found');
    console.log('');
    return 0;
  }

  console.log(`   Found ${files.length} file(s) to process\n`);

  // Download each file
  for (const file of files) {
    const destPath = path.join(PENDING_DIR, file.name);

    console.log(`📥 Downloading: ${file.name}`);
    await downloadFile(drive, file.id, file.name, destPath);

    // Move file to processing folder in Drive (if configured)
    if (processingFolderId) {
      console.log(`   → Moving to processing in Drive...`);
      await moveFile(drive, file.id, processingFolderId);
    }
  }

  console.log('');
  console.log(`✅ Downloaded ${files.length} file(s) to local pending/`);
  console.log('');

  return files.length;
}

/**
 * Main execution (when run directly)
 */
async function main() {
  const fileCount = await fetchFromDrive();

  if (fileCount > 0) {
    console.log('📋 Next step:');
    console.log('   Run: ./coo check');
    console.log('');
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
}

// Export for use in other scripts
export { fetchFromDrive };
