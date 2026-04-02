const https = require('https');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'models');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_tiny_model-weights_manifest.json',
  'face_landmark_68_tiny_model-shard1'
];

const base = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

function download(file) {
  return new Promise((resolve, reject) => {
    const url = base + file;
    const outPath = path.join(outDir, file);
    // skip if exists
    if (fs.existsSync(outPath)) return resolve(outPath);
    console.log('Downloading', url);
    const req = https.get(url, res => {
      if (res.statusCode >= 400) return reject(new Error('Failed to download ' + url + ' status ' + res.statusCode));
      const writeStream = fs.createWriteStream(outPath);
      res.pipe(writeStream);
      writeStream.on('finish', () => writeStream.close(() => resolve(outPath)));
      writeStream.on('error', reject);
    });
    req.on('error', reject);
  });
}

(async () => {
  try {
    for (const f of files) {
      await download(f);
    }
    console.log('Models downloaded to', outDir);
    process.exit(0);
  } catch (e) {
    console.error('Failed to fetch models:', e);
    process.exit(1);
  }
})();
