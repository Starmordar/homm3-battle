const { unpackLOD } = require('homm3-unpacker');

const { read } = require('./file');
const { monsterSpriteNames } = require('./config');
const { DefUnpacker } = require('./DefUnpacker');

async function unpackAssetsFromLod(path) {
  const file = await read(path);

  unpackLOD(file, {
    def: (buffer, filename) => {
      if (!monsterSpriteNames.includes(filename)) return;

      const unpacker = new DefUnpacker(buffer, filename);
      unpacker.run();
    },
  });
}

unpackAssetsFromLod('./assets/source/H3sprite.lod');
