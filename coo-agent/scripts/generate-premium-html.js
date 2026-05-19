#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

function parseMarkdown(content) {
  const orderIdMatch = content.match(/\*\*Order ID:\*\* (.*)/);
  const companyMatch = content.match(/\*\*Customer:\*\* (.*)/);
  const dateMatch = content.match(/\*\*Generated:\*\* (.*)/);

  return {
    orderId: orderIdMatch ? orderIdMatch[1] : '',
    companyName: companyMatch ? companyMatch[1] : '',
    date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
  };
}

function convertToHTML(content) {
  // Remove metadata header
  content = content.replace(/^# AI-GREINING:.*?\n\n---/s, '');
  content = content.replace(/## COVER PAGE.*?---/s, '');

  // Split into sections
  const sections = content.split(/(?=## PAGE)/);

  let html = '';
  let pageNum = 1;

  sections.forEach(section => {
    if (!section.trim()) return;

    // Extract section title
    const titleMatch = section.match(/## PAGE \d+: (.+)/);
    const sectionTitle = titleMatch ? titleMatch[1] : '';

    // Remove the PAGE header line
    section = section.replace(/## PAGE \d+: .+\n/, '');

    // Process opportunities
    const oppMatches = [...section.matchAll(/### (🥇|🥈|🥉) TÆKIFÆRI #(\d+): (.+?)\n\n\*\*Hvað þetta er:\*\*\n(.+?)\n\n\*\*Hvernig það hjálpar þér:\*\*\n([\s\S]+?)\n\n\*\*Áætlað gildi:\*\*\n([\s\S]+?)\n\n\*\*Erfiðleikastig:\*\* (.+?)\n\n\*\*Forgangsröðun:\*\* (⭐+) \((\d)\/5\)\n\n\*\*Næstu skref ef þú vilt innleiða:\*\*\n([\s\S]+?)\n\n\*\(Nákvæm innleiðingaráætlun/g)];

    let sectionHTML = section;

    oppMatches.forEach(match => {
      const [fullMatch, emoji, num, title, description, benefits, metrics, difficulty, stars, priority, steps] = match;

      const rankClass = {
        '🥇': 'gold',
        '🥈': 'silver',
        '🥉': 'bronze'
      }[emoji] || '';

      // Parse metrics
      const metricsLines = metrics.split('\n').filter(l => l.trim());
      const timeMatch = metricsLines.find(l => l.includes('⏰'));
      const costMatch = metricsLines.find(l => l.includes('💰'));
      const qualityMatch = metricsLines.find(l => l.includes('📈'));

      const timeValue = timeMatch ? timeMatch.replace(/- ⏰ Tímasparnaður: /, '').trim() : '';
      const costValue = costMatch ? costMatch.replace(/- 💰 Kostnaðarsparnaður: /, '').trim() : '';
      const qualityValue = qualityMatch ? qualityMatch.replace(/- 📈 Gæðabót: /, '').trim() : '';

      // Parse benefits
      const benefitsList = benefits.split('\n').filter(l => l.trim() && l.startsWith('-'))
        .map(l => l.replace(/^-\s*/, '').trim());

      // Parse steps
      const stepsList = steps.split('\n').filter(l => l.trim() && /^\d+\./.test(l))
        .map(l => l.replace(/^\d+\.\s*/, '').trim());

      // Get difficulty class
      const diffClass = difficulty.includes('Auðvelt') ? 'easy' : difficulty.includes('Miðlungs') ? 'medium' : 'hard';

      const oppHTML = `
<div class="opportunity-page">
  <div class="opportunity rank-${rankClass}">
    <div class="opp-header">
      <div class="opp-rank-badge">${emoji}</div>
      <div class="opp-title-wrapper">
        <div class="opp-number">Tækifæri #${num}</div>
        <h3 class="opp-title">${title}</h3>
      </div>
    </div>

  <div class="opp-section">
    <div class="opp-section-title">Hvað þetta er</div>
    <p class="opp-description">${description}</p>
  </div>

  <div class="opp-section">
    <div class="opp-section-title">Hvernig það hjálpar þér</div>
    <ul>
      ${benefitsList.map(b => `<li>${b}</li>`).join('\n      ')}
    </ul>
  </div>

  <div class="opp-section">
    <div class="opp-section-title">Áætlað gildi</div>
    <div class="metrics-grid">
      <div class="metric-card">
        <span class="metric-icon">⏰</span>
        <div class="metric-label">Tímasparnaður</div>
        <div class="metric-value">${timeValue}</div>
      </div>
      <div class="metric-card">
        <span class="metric-icon">💰</span>
        <div class="metric-label">Kostnaðarsparnaður</div>
        <div class="metric-value">${costValue}</div>
      </div>
      <div class="metric-card">
        <span class="metric-icon">📈</span>
        <div class="metric-label">Gæðabót</div>
        <div class="metric-value">${qualityValue}</div>
      </div>
    </div>
  </div>

  <div class="opp-section">
    <div class="opp-section-title">Erfiðleikastig</div>
    <span class="difficulty-badge ${diffClass}">${difficulty}</span>
  </div>

  <div class="opp-section">
    <div class="opp-section-title">Forgangsröðun</div>
    <div>
      <span class="priority-stars">${stars}</span>
      <span class="priority-text">(${priority}/5)</span>
    </div>
  </div>

  <div class="opp-section">
    <div class="opp-section-title">Næstu skref ef þú vilt innleiða</div>
    <ul>
      ${stepsList.map(s => `<li>${s}</li>`).join('\n      ')}
    </ul>
  </div>

    <p style="font-style: italic; font-size: 14px; color: #64748b; margin-top: 20px;">
      (Nákvæm innleiðingaráætlun er í 30-daga roadmap)
    </p>
  </div>
  <div class="page-footer">
    <div>LioraTech ehf. • ingi@lioratech.is</div>
    <div>Síða ${num + 2}</div>
  </div>
</div>`;

      sectionHTML = sectionHTML.replace(fullMatch, oppHTML);
    });

    // Clean up remaining content (don't wrap in <p> tags to avoid invalid HTML nesting)
    sectionHTML = sectionHTML.replace(/### (.+)/g, '<h2>$1</h2>');
    sectionHTML = sectionHTML.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    sectionHTML = sectionHTML.replace(/^- (.+)/gm, '<li>$1</li>');

    html += `
<div class="content-page">
  <div class="page-header">
    <div class="page-number">${sectionTitle}</div>
  </div>
  <div class="content-wrapper">
    ${sectionHTML}
  </div>
  <div class="page-footer">
    <div>LioraTech ehf. • ingi@lioratech.is</div>
    <div>Síða ${pageNum}</div>
  </div>
</div>`;

    pageNum++;
  });

  return html;
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath.replace('.md', '-premium.html');

const content = fs.readFileSync(inputPath, 'utf8');
const metadata = parseMarkdown(content);
const contentHTML = convertToHTML(content);

const templatePath = path.join(BASE_DIR, 'templates', 'premium-pdf-template.html');
let template = fs.readFileSync(templatePath, 'utf8');

template = template.replace(/{{companyName}}/g, metadata.companyName);
template = template.replace(/{{orderId}}/g, metadata.orderId);
template = template.replace(/{{date}}/g, metadata.date);
template = template.replace(/{{content}}/g, contentHTML);

fs.writeFileSync(outputPath, template, 'utf8');

console.log(`✅ Premium HTML generated!`);
console.log(`   → ${outputPath}`);
console.log(`\n📖 Opening in browser...`);
console.log(`\n💡 To save as PDF:`);
console.log(`   1. Cmd+P (Print)`);
console.log(`   2. Save as PDF`);
console.log(`   3. Make sure "Background graphics" is enabled!\n`);
