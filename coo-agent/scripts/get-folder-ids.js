#!/usr/bin/env node

/**
 * Get folder IDs for 30-daga-plan structure
 */

import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '../.google-drive-config.json');

// Load configuration
async function loadConfig() {
  const configData = await fs.readFile(CONFIG_FILE, 'utf8');
  return JSON.parse(configData);
}

// Authorize with Google Drive
async function authorize(config) {
  const { client_id, client_secret, redirect_uris, refresh_token } = config;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  oAuth2Client.setCredentials({ refresh_token });

  return oAuth2Client;
}

// Find folder by name
async function findFolderByName(drive, folderName, parentId = null) {
  let query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }

  const response = await drive.files.list({
    q: query,
    fields: 'files(id, name, parents)',
    spaces: 'drive'
  });

  return response.data.files || [];
}

async function main() {
  console.log('🔍 Finding folder IDs for 30-daga-plan structure...\n');

  try {
    const config = await loadConfig();
    const auth = await authorize(config);
    const drive = google.drive({ version: 'v3', auth });

    // Find 30-daga-plan folder
    console.log('Looking for: 30-daga-plan');
    const mainFolders = await findFolderByName(drive, '30-daga-plan');

    if (mainFolders.length === 0) {
      console.error('❌ Could not find 30-daga-plan folder');
      return;
    }

    const mainFolderId = mainFolders[0].id;
    console.log(`✓ Found 30-daga-plan: ${mainFolderId}\n`);

    // Find subfolders
    const subfolderNames = ['approved', 'completed', 'in-progress', 'incoming'];
    const folderIds = { '30-day-main': mainFolderId };

    for (const folderName of subfolderNames) {
      console.log(`Looking for: 30-daga-plan/${folderName}`);
      const folders = await findFolderByName(drive, folderName, mainFolderId);

      if (folders.length > 0) {
        folderIds[`30-day-${folderName}`] = folders[0].id;
        console.log(`✓ Found: ${folders[0].id}`);
      } else {
        console.log(`⚠️  Not found: ${folderName}`);
      }
    }

    // Find md-files and pdf-files under completed
    if (folderIds['30-day-completed']) {
      console.log('\nLooking for subfolders under completed:');

      for (const subName of ['md-files', 'pdf-files']) {
        console.log(`Looking for: 30-daga-plan/completed/${subName}`);
        const folders = await findFolderByName(drive, subName, folderIds['30-day-completed']);

        if (folders.length > 0) {
          folderIds[`30-day-${subName}`] = folders[0].id;
          console.log(`✓ Found: ${folders[0].id}`);
        } else {
          console.log(`⚠️  Not found: ${subName}`);
        }
      }
    }

    console.log('\n═══════════════════════════════════════');
    console.log('FOLDER IDS FOR CONFIG:');
    console.log('═══════════════════════════════════════');
    console.log(JSON.stringify(folderIds, null, 2));
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
