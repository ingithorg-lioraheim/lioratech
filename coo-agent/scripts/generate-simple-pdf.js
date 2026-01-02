#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

function parseMetadata(content) {
  // Detect document type by looking for patterns
  const is30DayRoadmap = content.includes('## AI Innleiðing fyrir') || content.includes('30 DAGA FRAMKVÆMDAÁÆTLUN');

  let orderId = '';
  let companyName = '';
  let date = new Date().toISOString().split('T')[0];
  let documentType = 'ai-greining'; // default

  if (is30DayRoadmap) {
    // 30-day roadmap format
    documentType = '30-day-roadmap';

    // Extract company name from "## AI Innleiðing fyrir [Company Name]"
    const companyMatch = content.match(/## AI Innleiðing fyrir (.+?)(?:\n|$)/);
    if (companyMatch) {
      companyName = companyMatch[1].trim();
    }

    // Extract order ID from "**Pöntun:** AI-2025-12-21-HBXG5J"
    const orderMatch = content.match(/\*\*Pöntun:\*\* (AI-\d{4}-\d{2}-\d{2}-[A-Z0-9]+)/);
    if (orderMatch) {
      orderId = orderMatch[1];
      // Extract date from order ID
      const dateMatch = orderId.match(/AI-(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        date = dateMatch[1];
      }
    }
  } else {
    // AI Greining format (original)
    const orderIdMatch = content.match(/\*\*Order ID:\*\* (.*)/);
    const companyMatch = content.match(/\*\*Customer:\*\* (.*)/);
    const dateMatch = content.match(/\*\*Generated:\*\* (.*)/);

    orderId = orderIdMatch ? orderIdMatch[1] : '';
    companyName = companyMatch ? companyMatch[1] : '';
    date = dateMatch ? dateMatch[1] : date;
  }

  return {
    orderId,
    companyName,
    date,
    documentType
  };
}

function cleanMarkdown(content) {
  // Remove metadata header
  content = content.replace(/^# AI-GREINING:.*?\n\n---\n\n/s, '');
  content = content.replace(/## COVER PAGE.*?---\n\n/s, '');

  // Remove the "PAGE X:" prefixes but keep the content
  content = content.replace(/## PAGE \d+: (.+)/g, '## $1');

  // Remove code blocks (like the cover page ASCII art)
  content = content.replace(/```[\s\S]*?```/g, '');

  // Replace info@lioratech.is with ingi@lioratech.is
  content = content.replace(/info@lioratech\.is/g, 'ingi@lioratech.is');

  return content;
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath.replace('.md', '-simple.html');

if (!inputPath) {
  console.error('Usage: node generate-simple-pdf.js <input.md> [output.html]');
  process.exit(1);
}

const content = fs.readFileSync(inputPath, 'utf8');
const metadata = parseMetadata(content);
const cleanedContent = cleanMarkdown(content);

// Convert markdown to HTML using marked
const contentHTML = marked.parse(cleanedContent);

// Load template (v2 with better design)
const templatePath = path.join(BASE_DIR, 'templates', 'simple-pdf-template-v2.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Set dynamic content based on document type
const coverTitle = metadata.documentType === '30-day-roadmap'
  ? '30 Daga Framkvæmdaáætlun'
  : 'AI Greining';

const coverSubtitle = metadata.documentType === '30-day-roadmap'
  ? 'Ítarlegur vegvísir fyrir AI innleiðingu'
  : '3-5 Tækifæri til úrbóta með gervigreind';

// Replace placeholders
template = template.replace(/{{coverTitle}}/g, coverTitle);
template = template.replace(/{{coverSubtitle}}/g, coverSubtitle);
template = template.replace(/{{companyName}}/g, metadata.companyName);
template = template.replace(/{{orderId}}/g, metadata.orderId);
template = template.replace(/{{date}}/g, metadata.date);
template = template.replace(/{{content}}/g, contentHTML);

// Write HTML to temp file first
const htmlPath = outputPath.replace('.pdf', '.html');
fs.writeFileSync(htmlPath, template, 'utf8');

console.log(`✅ HTML generated: ${htmlPath}`);

// Generate PDF using Chrome headless
const pdfPath = outputPath.endsWith('.pdf') ? outputPath : outputPath.replace('.html', '.pdf');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

try {
  console.log(`🔄 Generating PDF with Chrome headless...`);

  const cmd = `"${chromePath}" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file://${path.resolve(htmlPath)}"`;

  execSync(cmd, {
    stdio: 'pipe',
    timeout: 30000
  });

  // Clean up temp HTML file
  fs.unlinkSync(htmlPath);

  console.log(`✅ PDF generated: ${pdfPath}`);

} catch (error) {
  console.error(`❌ Error generating PDF: ${error.message}`);
  console.log(`\n📄 Manual fallback - run this command:`);
  console.log(`   cd "${BASE_DIR}"`);
  console.log(`   "${chromePath}" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file://${path.resolve(htmlPath)}"`);
  process.exit(1);
}
