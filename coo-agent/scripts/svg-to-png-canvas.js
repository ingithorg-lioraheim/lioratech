#!/usr/bin/env node

import fs from 'fs/promises';
import { createCanvas, loadImage } from 'canvas';

const svgPath = process.argv[2];
const pngPath = process.argv[3];

if (!svgPath || !pngPath) {
  console.error('Usage: node svg-to-png-canvas.js <input.svg> <output.png>');
  process.exit(1);
}

async function convertSvgToPng() {
  try {
    const svgContent = await fs.readFile(svgPath, 'utf8');

    // Extract dimensions
    const widthMatch = svgContent.match(/width="(\d+)"/);
    const heightMatch = svgContent.match(/height="(\d+)"/);
    const width = widthMatch ? parseInt(widthMatch[1]) : 1640;
    const height = heightMatch ? parseInt(heightMatch[1]) : 624;

    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Convert SVG to data URL
    const svgDataUrl = 'data:image/svg+xml;base64,' + Buffer.from(svgContent).toString('base64');
    const img = await loadImage(svgDataUrl);

    ctx.drawImage(img, 0, 0, width, height);

    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(pngPath, buffer);

    console.log(`✅ PNG created: ${pngPath}`);
    console.log(`📏 Size: ${width}×${height}px`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

convertSvgToPng();
