#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const svgPath = process.argv[2];
const outputPath = process.argv[3] || svgPath.replace('.svg', '.png');

if (!svgPath) {
  console.error('Usage: node svg-to-png.js <input.svg> [output.png]');
  process.exit(1);
}

// Read SVG content
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Extract width and height from SVG
let width = 3000;
let height = 800;

const widthMatch = svgContent.match(/width="(\d+)"/);
const heightMatch = svgContent.match(/height="(\d+)"/);

if (widthMatch && heightMatch) {
  width = parseInt(widthMatch[1]);
  height = parseInt(heightMatch[1]);
}

// Create HTML wrapper
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>
`;

// Write temporary HTML file
const tempHtmlPath = path.join(BASE_DIR, 'temp-svg.html');
fs.writeFileSync(tempHtmlPath, html, 'utf8');

console.log('🔄 Converting SVG to PNG...');

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

try {
  const cmd = `"${chromePath}" --headless --disable-gpu --screenshot="${path.resolve(outputPath)}" --window-size=${width},${height} --default-background-color=0 "file://${path.resolve(tempHtmlPath)}"`;

  execSync(cmd, {
    stdio: 'pipe',
    timeout: 10000
  });

  // Clean up temp HTML file
  fs.unlinkSync(tempHtmlPath);

  console.log(`✅ PNG created: ${outputPath}`);
  console.log(`📏 Size: ${width}x${height}px (transparent background)`);

} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  fs.unlinkSync(tempHtmlPath);
  process.exit(1);
}
