#!/usr/bin/env node

/**
 * COO-AGENT: Process Approved Analyses
 *
 * This script:
 * 1. Fetches approved .md files from Google Drive "approved/" folder
 * 2. Converts them to PDF
 * 3. Uploads PDF to "completed/pdf-files/"
 * 4. Moves MD file from "approved/" to "completed/md-files/"
 */

import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '../.google-drive-config.json');
const TOKEN_FILE = path.join(__dirname, '../.google-drive-token.json');

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

// List files in a folder
async function listFiles(drive, folderId) {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id, name, mimeType, createdTime)',
    orderBy: 'createdTime desc'
  });

  return response.data.files || [];
}

// Download file content
async function downloadFile(drive, fileId) {
  const response = await drive.files.get({
    fileId: fileId,
    alt: 'media'
  }, { responseType: 'text' });

  return response.data;
}

// Upload file to Drive
async function uploadFile(drive, fileName, content, folderId, mimeType = 'text/markdown') {
  // Convert Buffer to Stream if needed
  let body = content;
  if (Buffer.isBuffer(content)) {
    body = Readable.from(content);
  }

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      mimeType: mimeType
    },
    media: {
      mimeType: mimeType,
      body: body
    }
  });

  return response.data;
}

// Move file to another folder
async function moveFile(drive, fileId, newParentId, oldParentId) {
  const response = await drive.files.update({
    fileId: fileId,
    addParents: newParentId,
    removeParents: oldParentId,
    fields: 'id, parents'
  });

  return response.data;
}

// Delete file
async function deleteFile(drive, fileId) {
  await drive.files.delete({ fileId: fileId });
}

// Generate PDF from markdown
async function generatePDF(markdownContent, mdFileName) {
  const tempMdPath = path.join(__dirname, '../temp.md');
  const tempPdfPath = path.join(__dirname, '../temp.pdf');

  // Write markdown to temp file
  await fs.writeFile(tempMdPath, markdownContent, 'utf8');

  // Call the simple PDF generator
  const pdfScriptPath = path.join(__dirname, 'generate-simple-pdf.js');
  execSync(`node "${pdfScriptPath}" "${tempMdPath}" "${tempPdfPath}"`, { stdio: 'inherit' });

  // Read generated PDF
  const pdfBuffer = await fs.readFile(tempPdfPath);

  // Clean up temp files
  await fs.unlink(tempMdPath);
  await fs.unlink(tempPdfPath);

  return pdfBuffer;
}

// Main processing function
async function processApproved() {
  console.log('⚙️  COO-Agent: Processing approved analyses...\n');

  try {
    // Load config and authorize
    const config = await loadConfig();
    const auth = await authorize(config);
    const drive = google.drive({ version: 'v3', auth });

    // Define workflows
    const workflows = [
      {
        name: 'AI Greining (frítt)',
        approvedFolderId: config.folders.approved,
        mdFilesFolderId: config.folders['md-files'],
        pdfFilesFolderId: config.folders['pdf-files']
      },
      {
        name: '30 Daga Roadmap',
        approvedFolderId: config.folders['30-day-approved'],
        mdFilesFolderId: config.folders['30-day-md-files'],
        pdfFilesFolderId: config.folders['30-day-pdf-files']
      }
    ];

    let totalProcessed = 0;
    const allErrors = [];

    // Process each workflow
    for (const workflow of workflows) {
      console.log(`\n📂 Checking: ${workflow.name}`);
      console.log(`   Approved folder: ${workflow.approvedFolderId}`);

      // Get files from approved folder
      const approvedFiles = await listFiles(drive, workflow.approvedFolderId);

      if (approvedFiles.length === 0) {
        console.log(`   ✅ No files to process\n`);
        continue;
      }

      console.log(`   📋 Found ${approvedFiles.length} file(s)\n`);

      // Process each file
      for (const file of approvedFiles) {
      try {
        console.log(`📄 Processing: ${file.name}`);

        // Validate file extension
        if (!file.name.endsWith('.md')) {
          console.error(`  ❌ SKIPPED: Not a markdown file (expected .md, got ${path.extname(file.name)})`);
          console.error(`  💡 Tip: Only move .md files from processing/ to approved/`);
          console.error(`  💡 This looks like a request file (.json), not a product file (.md)\n`);
          results.errors.push({
            file: file.name,
            error: `Invalid file type: Expected .md file, got ${path.extname(file.name) || 'no extension'}`
          });
          continue;
        }

        // Download markdown content
        console.log('  ↓ Downloading from approved/...');
        const mdContent = await downloadFile(drive, file.id);

        // Validate content (basic check)
        if (!mdContent || mdContent.length < 100) {
          throw new Error('Invalid or empty markdown content');
        }

        // Generate PDF
        console.log('  🔄 Converting to PDF...');
        const pdfBuffer = await generatePDF(mdContent, file.name);

        // Upload PDF to completed/pdf-files/
        const pdfFileName = file.name.replace('.md', '.pdf');
        console.log(`  ↑ Uploading PDF: ${pdfFileName}`);
        await uploadFile(
          drive,
          pdfFileName,
          pdfBuffer,
          workflow.pdfFilesFolderId,
          'application/pdf'
        );

        // Move MD file from approved/ to completed/md-files/
        console.log('  📦 Moving MD to completed/md-files/...');
        await moveFile(drive, file.id, workflow.mdFilesFolderId, workflow.approvedFolderId);

        console.log(`  ✅ Complete: ${file.name}\n`);
        totalProcessed++;

      } catch (error) {
        console.error(`  ❌ Error processing ${file.name}:`, error.message);
        allErrors.push({ file: file.name, error: error.message, workflow: workflow.name });
      }
    }
    }

    // Summary
    console.log('\n═══════════════════════════════════════');
    console.log(`✅ Total processed: ${totalProcessed} file(s)`);
    if (allErrors.length > 0) {
      console.log(`❌ Errors: ${allErrors.length}`);
      allErrors.forEach(e => console.log(`   - [${e.workflow}] ${e.file}: ${e.error}`));
    }
    console.log('═══════════════════════════════════════\n');

    return { processed: totalProcessed, errors: allErrors };

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

// Run if called directly
// Check if this module is being run directly (not imported)
const isMainModule = process.argv[1] && (
  import.meta.url === `file://${process.argv[1]}` ||
  import.meta.url.endsWith(process.argv[1]) ||
  import.meta.url.includes('process-approved.js')
);

if (isMainModule) {
  processApproved()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

export { processApproved };
