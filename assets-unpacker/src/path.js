const path = require('path');

const SOURCE_LOD_FILE = path.join(__dirname, '../assets/source/H3sprite.lod');

const SOURCE_DIR = path.join(__dirname, '../assets/source');
const RESULT_DIR = path.join(__dirname, '../assets/result');
const CONFIG_DIR = path.join(__dirname, '../assets/config');

module.exports = {
  SOURCE_LOD_FILE,
  SOURCE_DIR,
  RESULT_DIR,
  CONFIG_DIR,
};
