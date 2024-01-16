const { unpackLOD } = require('homm3-unpacker');
const { DefUnpacker } = require('../DefUnpacker');

const { clearDir, read } = require('../file');
const { monsterSpriteNames } = require('../config');
const { RESULT_DIR, SOURCE_LOD_FILE } = require('../path');

async function unpackAssetsFromLod(path) {
  clearDir(RESULT_DIR);
  const file = await read(path);

  unpackLOD(file, {
    def: (buffer, filename) => {
      if (!monsterSpriteNames.includes(filename)) return;

      const unpacker = new DefUnpacker(buffer, filename);
      unpacker.run();
    },
  });
}

unpackAssetsFromLod(SOURCE_LOD_FILE);
