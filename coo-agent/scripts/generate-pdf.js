#!/usr/bin/env node

/**
 * PDF GENERATOR FOR AI-GREINING
 *
 * Converts markdown analysis files to beautiful PDFs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

/**
 * Parse markdown content and extract metadata
 */
function parseMarkdown(content) {
  const lines = content.split('\n');
  const metadata = {};

  // Extract metadata from first few lines
  const orderIdMatch = content.match(/\*\*Order ID:\*\* (.*)/);
  const companyMatch = content.match(/\*\*Customer:\*\* (.*)/);
  const industryMatch = content.match(/\*\*Industry:\*\* (.*)/);
  const dateMatch = content.match(/\*\*Generated:\*\* (.*)/);

  metadata.orderId = orderIdMatch ? orderIdMatch[1] : '';
  metadata.companyName = companyMatch ? companyMatch[1] : '';
  metadata.industry = industryMatch ? industryMatch[1] : '';
  metadata.date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

  return metadata;
}

/**
 * Convert markdown to styled HTML
 */
function convertMarkdownToHTML(content) {
  // Remove the header metadata section (we use it in cover page)
  const contentWithoutMeta = content.replace(/^# .*\n\n\*\*Order Type:.*?\n\n---/s, '');

  // Remove cover page section
  const contentWithoutCover = contentWithoutMeta.replace(/## COVER PAGE.*?---/s, '');

  // Convert markdown to HTML
  let html = marked.parse(contentWithoutCover);

  // Wrap sections in page divs
  const sections = contentWithoutCover.split(/(?=## PAGE \d+:|## CLOSING)/g);

  let styledHTML = '';

  sections.forEach((section, index) => {
    if (!section.trim()) return;

    let sectionHTML = marked.parse(section);

    // Style opportunities
    sectionHTML = sectionHTML.replace(
      /<h3>(🥇|🥈|🥉|4️⃣|5️⃣) TÆKIFÆRI #(\d+): ([^<]+)<\/h3>/g,
      (match, emoji, num, title) => {
        const rank = { '🥇': 1, '🥈': 2, '🥉': 3 }[emoji] || parseInt(num);
        return `<div class="opportunity rank-${rank}">
          <div class="opportunity-header">
            <span class="opportunity-rank">${emoji}</span>
            <span class="opportunity-title">TÆKIFÆRI #${num}: ${title}</span>
          </div>`;
      }
    );

    // Close opportunity divs before next section
    sectionHTML = sectionHTML.replace(
      /<p><em>\(Nákvæm innleiðingaráætlun er í 30-daga roadmap\)\*<\/em><\/p>/g,
      '<p><em>(Nákvæm innleiðingaráætlun er í 30-daga roadmap)*</em></p></div>'
    );

    // Style sections within opportunities
    sectionHTML = sectionHTML.replace(
      /<p><strong>Hvað þetta er:<\/strong>/g,
      '<div class="opportunity-section"><strong>Hvað þetta er:</strong>'
    );

    sectionHTML = sectionHTML.replace(
      /<p><strong>Hvernig það hjálpar þér:<\/strong>/g,
      '</div><div class="opportunity-section"><strong>Hvernig það hjálpar þér:</strong>'
    );

    sectionHTML = sectionHTML.replace(
      /<p><strong>Áætlað gildi:<\/strong>/g,
      '</div><div class="opportunity-section"><strong>Áætlað gildi:</strong><div class="metrics">'
    );

    // Style metrics
    sectionHTML = sectionHTML.replace(
      /<li>⏰ Tímasparnaður: ([^<]+)<\/li>/g,
      '<div class="metric"><div class="metric-label">⏰ Tímasparnaður</div><div class="metric-value">$1</div></div>'
    );

    sectionHTML = sectionHTML.replace(
      /<li>💰 Kostnaðarsparnaður: ([^<]+)<\/li>/g,
      '<div class="metric"><div class="metric-label">💰 Kostnaðarsparnaður</div><div class="metric-value">$1</div></div>'
    );

    sectionHTML = sectionHTML.replace(
      /<li>📈 Gæðabót: ([^<]+)<\/li>/g,
      '<div class="metric"><div class="metric-label">📈 Gæðabót</div><div class="metric-value">$1</div></div>'
    );

    // Close metrics div
    sectionHTML = sectionHTML.replace(
      /<p><strong>Erfiðleikastig:<\/strong>/g,
      '</div></div><div class="opportunity-section"><strong>Erfiðleikastig:</strong>'
    );

    // Style difficulty
    sectionHTML = sectionHTML.replace(
      /🟢 Auðvelt/g,
      '<span class="difficulty easy">🟢 Auðvelt</span>'
    );

    sectionHTML = sectionHTML.replace(
      /🟡 Miðlungs/g,
      '<span class="difficulty medium">🟡 Miðlungs</span>'
    );

    sectionHTML = sectionHTML.replace(
      /🔴 Erfitt/g,
      '<span class="difficulty hard">🔴 Erfitt</span>'
    );

    // Style priority
    sectionHTML = sectionHTML.replace(
      /<p><strong>Forgangsröðun:<\/strong> (⭐+) \((\d)\/5\)<\/p>/g,
      '</div><div class="opportunity-section"><strong>Forgangsröðun:</strong><div class="priority">$1 ($2/5)</div></div>'
    );

    // Style next steps
    sectionHTML = sectionHTML.replace(
      /<p><strong>Næstu skref ef þú vilt innleiða:<\/strong><\/p>/g,
      '<div class="opportunity-section"><strong>Næstu skref ef þú vilt innleiða:</strong></div>'
    );

    // Wrap info boxes
    sectionHTML = sectionHTML.replace(
      /<p><strong>Hvað þú færð í þessari skýrslu:<\/strong>/g,
      '<div class="info-box"><strong>Hvað þú færð í þessari skýrslu:</strong>'
    );

    sectionHTML = sectionHTML.replace(
      /<p><strong>Hvað þú færð EKKI:<\/strong>/g,
      '</div><div class="info-box"><strong>Hvað þú færð EKKI:</strong>'
    );

    sectionHTML = sectionHTML.replace(
      /<p><em>\(Þetta er allt innifalið í 30-daga roadmap-inu\)\*<\/em><\/p>/g,
      '<p><em>(Þetta er allt innifalið í 30-daga roadmap-inu)*</em></p></div>'
    );

    // Wrap in page div with footer
    styledHTML += `
    <div class="page">
      <div class="page-header">
        <h2>${section.match(/## ([^\n]+)/)?.[1] || ''}</h2>
      </div>
      ${sectionHTML}
      <div class="page-footer">
        <div class="footer-left">
          <span>LioraTech ehf.</span>
          <span>•</span>
          <span>ingi@lioratech.is</span>
        </div>
        <div class="footer-right"></div>
      </div>
    </div>`;
  });

  return styledHTML;
}

/**
 * Generate PDF from markdown file
 */
async function generatePDF(markdownPath, outputPath) {
  console.log(`\n📄 Generating PDF...`);
  console.log(`   → Input: ${path.basename(markdownPath)}`);

  // Read markdown content
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  // Parse metadata
  const metadata = parseMarkdown(markdownContent);
  console.log(`   → Company: ${metadata.companyName}`);

  // Convert markdown to HTML
  const contentHTML = convertMarkdownToHTML(markdownContent);

  // Read template
  const templatePath = path.join(BASE_DIR, 'templates', 'pdf-template.html');
  let template = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders
  template = template.replace(/{{companyName}}/g, metadata.companyName);
  template = template.replace(/{{orderId}}/g, metadata.orderId);
  template = template.replace(/{{date}}/g, metadata.date);
  template = template.replace(/{{industry}}/g, metadata.industry);
  template = template.replace(/{{content}}/g, contentHTML);

  // Generate PDF with Puppeteer
  console.log(`   → Launching browser...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set content
  await page.setContent(template, {
    waitUntil: 'networkidle0'
  });

  console.log(`   → Rendering PDF...`);

  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

  await browser.close();

  console.log(`✅ PDF generated: ${path.basename(outputPath)}`);
  console.log(`   Location: ${outputPath}\n`);

  return outputPath;
}

// CLI usage
if (process.argv[2]) {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3] || inputPath.replace('.md', '.pdf');

  generatePDF(inputPath, outputPath)
    .then(() => {
      console.log('✓ Done!\n');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}

export { generatePDF };
