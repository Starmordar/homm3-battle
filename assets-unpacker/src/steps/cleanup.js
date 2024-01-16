const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const { RESULT_DIR } = require('../path');

fs.readdirSync(RESULT_DIR).map((fileName) => {
  const isPng = fileName.endsWith('.png');
  if (!isPng) return;

  fs.unlinkSync(path.join(RESULT_DIR, fileName));
});
