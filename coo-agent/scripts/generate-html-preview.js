#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

function parseMarkdown(content) {
  const orderIdMatch = content.match(/\*\*Order ID:\*\* (.*)/);
  const companyMatch = content.match(/\*\*Customer:\*\* (.*)/);
  const industryMatch = content.match(/\*\*Industry:\*\* (.*)/);
  const dateMatch = content.match(/\*\*Generated:\*\* (.*)/);

  return {
    orderId: orderIdMatch ? orderIdMatch[1] : '',
    companyName: companyMatch ? companyMatch[1] : '',
    industry: industryMatch ? industryMatch[1] : '',
    date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
  };
}

function convertMarkdownToHTML(content) {
  const contentWithoutMeta = content.replace(/^# .*\n\n\*\*Order Type:.*?\n\n---/s, '');
  const contentWithoutCover = contentWithoutMeta.replace(/## COVER PAGE.*?---/s, '');

  let html = marked.parse(contentWithoutCover);

  // Style opportunities with colored boxes
  html = html.replace(
    /<h3>(🥇|🥈|🥉|4️⃣|5️⃣) TÆKIFÆRI #(\d+): ([^<]+)<\/h3>/g,
    (match, emoji, num, title) => {
      const colors = { '🥇': 'gold', '🥈': 'silver', '🥉': 'bronze' };
      const color = colors[emoji] || 'blue';
      return `<div class="opportunity ${color}">
        <div class="opp-header">
          <span class="opp-emoji">${emoji}</span>
          <h3>TÆKIFÆRI #${num}: ${title}</h3>
        </div>`;
    }
  );

  // Close opportunity divs
  html = html.replace(
    /<p><em>\(Nákvæm innleiðingaráætlun er í 30-daga roadmap\)\*<\/em><\/p>/g,
    '<p class="roadmap-note"><em>(Nákvæm innleiðingaráætlun er í 30-daga roadmap)*</em></p></div>'
  );

  return html;
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath.replace('.md', '.html');

const markdownContent = fs.readFileSync(inputPath, 'utf8');
const metadata = parseMarkdown(markdownContent);
const contentHTML = convertMarkdownToHTML(markdownContent);

const templatePath = path.join(BASE_DIR, 'templates', 'pdf-template.html');
let template = fs.readFileSync(templatePath, 'utf8');

template = template.replace(/{{companyName}}/g, metadata.companyName);
template = template.replace(/{{orderId}}/g, metadata.orderId);
template = template.replace(/{{date}}/g, metadata.date);
template = template.replace(/{{industry}}/g, metadata.industry);
template = template.replace(/{{content}}/g, contentHTML);

fs.writeFileSync(outputPath, template, 'utf8');

console.log(`✅ HTML preview generated: ${outputPath}`);
console.log(`\n📖 Open in browser: open "${outputPath}"`);
console.log(`\n💡 To save as PDF: Cmd+P → Save as PDF\n`);
