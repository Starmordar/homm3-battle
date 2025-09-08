import fs from 'node:fs';
import path from 'node:path';

function unlinkPng(assetsPath: string) {
  fs.readdirSync(assetsPath).map((fileName) => {
    const isPng = fileName.endsWith('.png');
    if (!isPng) return;

    fs.unlinkSync(path.join(assetsPath, fileName));
  });
}

export { unlinkPng };
