/**
 * Google Drive Helper Functions
 * Shared utilities for Google Drive operations
 */

import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '../.google-drive-config.json');

/**
 * Load Google Drive configuration
 */
export async function loadConfig() {
  const configData = await fs.readFile(CONFIG_FILE, 'utf8');
  return JSON.parse(configData);
}

/**
 * Authorize with Google Drive
 */
export async function authorize(config) {
  const { client_id, client_secret, redirect_uris, refresh_token } = config;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  oAuth2Client.setCredentials({ refresh_token });

  return oAuth2Client;
}

/**
 * Get authorized Drive client
 */
export async function getDriveClient() {
  const config = await loadConfig();
  const auth = await authorize(config);
  return google.drive({ version: 'v3', auth });
}

/**
 * Upload file to Google Drive
 */
export async function uploadFile(drive, fileName, content, folderId, mimeType = 'text/markdown') {
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      mimeType: mimeType
    },
    media: {
      mimeType: mimeType,
      body: content
    },
    fields: 'id, name, webViewLink'
  });

  return response.data;
}

/**
 * List files in a folder
 */
export async function listFiles(drive, folderId) {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id, name, mimeType, createdTime, webViewLink)',
    orderBy: 'createdTime desc'
  });

  return response.data.files || [];
}

/**
 * Download file content
 */
export async function downloadFile(drive, fileId) {
  const response = await drive.files.get({
    fileId: fileId,
    alt: 'media'
  }, { responseType: 'text' });

  return response.data;
}

/**
 * Move file to another folder
 */
export async function moveFile(drive, fileId, newParentId, oldParentId) {
  const response = await drive.files.update({
    fileId: fileId,
    addParents: newParentId,
    removeParents: oldParentId,
    fields: 'id, parents'
  });

  return response.data;
}

/**
 * Delete file
 */
export async function deleteFile(drive, fileId) {
  await drive.files.delete({ fileId: fileId });
}
