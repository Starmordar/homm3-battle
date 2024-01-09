const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

fs.readdirSync('./unpacked').map((fileName) => {
  const filePath = path.join('./unpacked', fileName);
  sharp(filePath).toFile(`${filePath.split('.')[0]}.webp`);
});
