import fs from 'node:fs';

import { unpackLOD } from 'homm3-unpacker';
// const { ConfigBuilder } = require('../utils/builder/ConfigBuilder');

import { CREATURE_FILE_NAMES } from '../config';
import { SpriteBuilder } from './SpriteBuilder';

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
      console.log('filename :>> ', filename);

      const spriteBuilder = new SpriteBuilder(buffer, filename);
      const status = spriteBuilder.execute();

      if (status === 'error') return;

      //   const baseFilename = filename.split('.')[0];
      //   const configBuilder = new ConfigBuilder(
      //     spriteBuilder.sourceData,
      //     spriteBuilder.animationPhases,
      //     baseFilename,
      //   );
      //   configBuilder.build();
    },
  });
}

export { extractAssetsFromLod };
