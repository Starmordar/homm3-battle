const { unpackLOD } = require('homm3-unpacker');
const fs = require('graceful-fs');
const { DefUnpacker } = require('../DefUnpacker');

const { MONSTER_FILE_NAMES, SOURCE_LOD_FILE } = require('../config');

async function unpackAssetsFromLod(path) {
  const file = fs.readFileSync(path);

  unpackLOD(file, {
    def: (buffer, filename) => {
      if (!MONSTER_FILE_NAMES.includes(filename)) return;

      const unpacker = new DefUnpacker(buffer, filename);
      unpacker.run();
    },
  });
}

unpackAssetsFromLod(SOURCE_LOD_FILE);
