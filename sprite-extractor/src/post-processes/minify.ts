import fs from 'node:fs';
import path from 'node:path';

import sharp from 'sharp';

function minify(assetsPath: string) {
  const files = fs.readdirSync(assetsPath);

  return Promise.all(
    files.map((fileName) => {
      const isPng = fileName.endsWith('.png');
      if (!isPng) return Promise.resolve();

      const filePath = path.join(assetsPath, fileName);
      return sharp(filePath)
        .webp({ lossless: true })
        .toFile(`${filePath.split('.')[0]}.webp`);
    }),
  );
}

export { minify };
