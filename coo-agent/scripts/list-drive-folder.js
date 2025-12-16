#!/usr/bin/env node

/**
 * List files in a Google Drive folder
 */

import { getDriveClient, loadConfig, listFiles } from './drive-helper.js';

async function listFolder(folderName) {
  try {
    const config = await loadConfig();
    const drive = await getDriveClient();
    const folderId = config.folders[folderName];

    if (!folderId) {
      console.error(`❌ Folder "${folderName}" not found in config`);
      console.log('Available folders:', Object.keys(config.folders).join(', '));
      process.exit(1);
    }

    console.log(`📁 Listing files in: ${folderName}/`);
    console.log(`   Folder ID: ${folderId}\n`);

    const files = await listFiles(drive, folderId);

    if (files.length === 0) {
      console.log('✅ Folder is empty\n');
      return;
    }

    console.log(`Found ${files.length} file(s):\n`);

    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}`);
      console.log(`   Type: ${file.mimeType}`);
      console.log(`   Created: ${file.createdTime}`);
      console.log(`   ID: ${file.id}`);
      if (file.webViewLink) {
        console.log(`   Link: ${file.webViewLink}`);
      }
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get folder name from command line argument
const folderName = process.argv[2] || 'processing';
listFolder(folderName);
