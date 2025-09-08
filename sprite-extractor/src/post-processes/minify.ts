import fs from 'node:fs';

import sharp from 'sharp';
import path from 'node:path';

function minify(assetsPath: string) {
  const files = fs.readdirSync(assetsPath);

  return Promise.all(
    files.map((fileName) => {
      const filePath = path.join(assetsPath, fileName);
      return sharp(filePath).toFile(`${filePath.split('.')[0]}.webp`);
    }),
  );
}

export { minify };
