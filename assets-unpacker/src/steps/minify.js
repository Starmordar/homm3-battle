const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const { RESULT_DIR } = require('../path');

fs.readdirSync(RESULT_DIR).map((fileName) => {
  const filePath = path.join(RESULT_DIR, fileName);
  sharp(filePath).toFile(`${filePath.split('.')[0]}.webp`);
});
