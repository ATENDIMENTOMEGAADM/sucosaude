const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

Promise.all([
  download('https://storage.googleapis.com/aistudio-user-uploads-us-central1/project-678502804561/0d683693-01c3-426d-a1c2-3e2b2024b172/image.png', path.join(publicDir, 'glasses.png')),
  download('https://storage.googleapis.com/aistudio-user-uploads-us-central1/project-678502804561/c128f7d9-2d1f-4903-88a2-23c318262f22/image.png', path.join(publicDir, 'juices.png'))
]).then(() => console.log('Images downloaded successfully')).catch(err => console.error('Error downloading images:', err));
