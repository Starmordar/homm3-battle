import fs from 'node:fs';

import { unpackDEF, unpackLOD } from 'homm3-unpacker';

import { CREATURE_FILE_NAMES } from '../config';
import { SpriteBuilder } from './SpriteBuilder';
import { ConfigBuilder } from './ConfigBuilder';
import { isSourceDataValid } from './validate';

function getSourceFileContent(path: string) {
  if (!fs.existsSync(path)) {
    throw new Error(`Source file not found: ${path}`);
  }

  return fs.readFileSync(path);
}

function extractAssetsFromLod(path: string) {
  const sourceFile = getSourceFileContent(path);

  unpackLOD(sourceFile, {
    def: (buffer, filename) => {
      if (!CREATURE_FILE_NAMES.includes(filename)) return;

      console.info(`Start processing ${filename}...`);

      const sourceData = unpackDEF(buffer, { format: 'bitmap', padding: false });
      if (!isSourceDataValid(sourceData, filename)) return;

      const spriteBuilder = new SpriteBuilder(sourceData, filename);
      spriteBuilder.execute();

      const baseFilename = filename.split('.')[0];
      const configBuilder = new ConfigBuilder(sourceData, baseFilename);
      configBuilder.execute();

      console.info(`Finished processing ${filename}`);
    },
  });
}

export { extractAssetsFromLod };
