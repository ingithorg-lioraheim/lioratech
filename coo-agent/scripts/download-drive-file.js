#!/usr/bin/env node

import { getDriveClient, downloadFile } from './drive-helper.js';

const fileId = process.argv[2];

if (!fileId) {
  console.error('Usage: node download-drive-file.js <fileId>');
  process.exit(1);
}

try {
  const drive = await getDriveClient();
  const content = await downloadFile(drive, fileId);
  console.log(content);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
