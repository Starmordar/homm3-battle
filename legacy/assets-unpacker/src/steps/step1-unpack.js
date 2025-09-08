const fs = require('graceful-fs');

const { unpackLOD } = require('../../lib');
const { SpriteGenerator } = require('../SpriteGenerator');

const { MONSTER_FILE_NAMES, SOURCE_LOD_FILE } = require('../config');

function unpackAssetsFromLod(path) {
  const file = fs.readFileSync(path);

  unpackLOD(file, {
    def: (buffer, filename) => {
      if (!MONSTER_FILE_NAMES.includes(filename)) return;

      const spriteGenerator = new SpriteGenerator(buffer, filename);
      spriteGenerator.run();
    },
  });
}

unpackAssetsFromLod(SOURCE_LOD_FILE);
