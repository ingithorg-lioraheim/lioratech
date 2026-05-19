import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertHtmlToPng(htmlFilePath, outputPath) {
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Set viewport to match Facebook post dimensions (1080x1080)
    await page.setViewport({
        width: 1080,
        height: 1080,
        deviceScaleFactor: 2 // Higher quality
    });

    // Load the HTML file
    await page.goto(`file://${path.resolve(htmlFilePath)}`, {
        waitUntil: 'networkidle0'
    });

    // Take screenshot
    await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: {
            x: 0,
            y: 0,
            width: 1080,
            height: 1080
        }
    });

    await browser.close();
    console.log(`PNG created: ${outputPath}`);
}

// Get command line arguments
const htmlFile = process.argv[2];
const outputFile = process.argv[3];

if (!htmlFile || !outputFile) {
    console.error('Usage: node html-to-png.js <input.html> <output.png>');
    process.exit(1);
}

convertHtmlToPng(htmlFile, outputFile)
    .then(() => console.log('Done!'))
    .catch(err => console.error('Error:', err));
