#!/usr/bin/env node

import fs from 'fs/promises';
import puppeteer from 'puppeteer';

const svgPath = process.argv[2];
const pngPath = process.argv[3];

if (!svgPath || !pngPath) {
  console.error('Usage: node svg-to-png-puppeteer.js <input.svg> <output.png>');
  process.exit(1);
}

async function convertSvgToPng() {
  try {
    // Read SVG content
    const svgContent = await fs.readFile(svgPath, 'utf8');

    // Extract dimensions
    const widthMatch = svgContent.match(/width="(\d+)"/);
    const heightMatch = svgContent.match(/height="(\d+)"/);
    const width = widthMatch ? parseInt(widthMatch[1]) : 800;
    const height = heightMatch ? parseInt(heightMatch[1]) : 600;

    // Create HTML with SVG
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 0; background: transparent; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.setContent(html);

    // Take screenshot
    await page.screenshot({
      path: pngPath,
      omitBackground: false,
      clip: { x: 0, y: 0, width, height }
    });

    await browser.close();

    console.log(`✅ PNG created: ${pngPath}`);
    console.log(`📏 Size: ${width}×${height}px`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

convertSvgToPng();
