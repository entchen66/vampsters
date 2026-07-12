const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const assetsDir = path.join(__dirname, '..', 'assets', 'screenshots');
const outputJsPath = path.join(__dirname, '..', 'assets', 'hashes.js');

if (!fs.existsSync(assetsDir)) {
    console.error('Verzeichnis assets/screenshots nicht gefunden!');
    process.exit(1);
}

const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png'));
const hashes = {};

files.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    hashes[file] = hashSum.digest('hex').substring(0, 8); // 8 characters is enough for cache busting
});

const fileContent = `// Automatisch generiert durch scripts/generate_hashes.js\nconst IMAGE_HASHES = ${JSON.stringify(hashes, null, 4)};\n`;

fs.writeFileSync(outputJsPath, fileContent);
console.log(`Erfolgreich Hashes für ${files.length} Bilder generiert und in assets/hashes.js gespeichert.`);
