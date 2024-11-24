// CHAT GPT GENERATED THIS CODE
// this code generates a favicon with a gradient star using svg2img and sharp

const fs = require('fs');
const sharp = require('sharp');
const svg2img = require('svg2img');
const pngToIco = require('png-to-ico');

// Define the gradient
const gradient = `
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 48 47">
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#9bdceb;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#cdd8e3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e7f6a0;stop-opacity:1" />
        </linearGradient>
    </defs>
    <path fill="url(#gradient)" d="M41.8151 3.50619L34.3001 20.0422L47.7045 32.2993L29.6556 30.262L22.1406 46.798L18.5007 29.0029L0.451758 26.9656L16.2511 18.0049L12.6113 0.209807L26.0157 12.4669L41.8151 3.50619Z" />
</svg>
`;

// Convert SVG to PNG
function generatePng(outputPath, size = 128) {
    return new Promise((resolve, reject) => {
        svg2img(gradient, { width: size, height: size }, (error, buffer) => {
            if (error) reject(error);
            fs.writeFileSync(outputPath, buffer);
            resolve(`PNG saved at ${outputPath}`);
        });
    });
}

// Generate multiple favicon sizes
async function generateFavicons() {
    try {
        const sizes = [16, 32, 48, 64, 128];
        const pngFiles = [];

        for (const size of sizes) {
            const outputPath = `favicon-${size}x${size}.png`;
            await generatePng(outputPath, size);
            pngFiles.push(outputPath);
            console.log(`Generated: ${outputPath}`);
        }

        // Generate favicon.ico from PNG files
        const icoBuffer = await pngToIco(pngFiles.slice(0, 3)); // Use 16x16, 32x32, and 48x48 for the ICO
        fs.writeFileSync('favicon.ico', icoBuffer);
        console.log('Favicon.ico created successfully!');
    } catch (err) {
        console.error('Error generating favicons:', err);
    }
}

generateFavicons();
