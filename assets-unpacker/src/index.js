const { unpackLOD, unpackDEF } = require('homm3-unpacker');
const { createCanvas } = require('canvas');
const fs = require('graceful-fs');

const { getImageRect } = require('./image');
const { read, write } = require('./file');
const { monsterSpriteNames, animationGroups } = require('./config');

const imageWidth = 220;
const imageHeight = 180;

async function unpackAssetsFromLod(path) {
  const file = await read(path);

  unpackLOD(file, {
    def: (buffer, filename) => {
      if (!monsterSpriteNames.includes(filename)) return;
      unpackAssets(buffer, filename);
    },
  });
}

async function unpackAssets(buffer, filename) {
  const data = unpackDEF(buffer, { format: 'bitmap', padding: false });
  console.log('data :>> ', data);

  drawByGroup(filename, data);
}

function drawByGroup(filename, defData) {
  const imageRect = getImageRect(defData);
  const groups = animationGroups.map((name) => name.toLowerCase());

  const maxCol = Math.max(...groups.map((name) => defData.groups[name]?.length ?? 0));
  const maxRow = groups.length;
  const { canvas, ctx } = imageCanvas(maxCol, maxRow);

  groups.forEach((groupName, groupIndex) => {
    const imageNames = defData.groups[groupName];
    if (!imageNames) return;

    const images = imageNames.map((name) => defData.images[name]);
    drawAndDownload(canvas, ctx, imageRect, images, maxCol, maxRow, groupIndex, filename);
  });
}

function imageCanvas(maxCol, maxRow) {
  const canvas = createCanvas(imageWidth * maxCol, imageHeight * maxRow);
  const ctx = canvas.getContext('2d');

  return { canvas, ctx };
}

function drawAndDownload(canvas, ctx, rect, images, maxCol, maxRow, groupIndex, filename) {
  if (!images.length) return;
  const scale = 1;

  for (let rowIndex = 0; rowIndex < images.length; rowIndex++) {
    const image = images[rowIndex];

    const rows = ctx.canvas.height / scale / maxRow;
    const cols = ctx.canvas.width / scale / maxCol;
    const row = Math.floor(rows / 2 - rect.height / 2 + (image.y || 0) - rect.y) + groupIndex * 180;
    const col = Math.floor(cols / 2 - rect.width / 2 + (image.x || 0) - rect.x) + rowIndex * 220;

    const view = new Uint8Array(image.data);

    let i = 0;
    while (i < view.byteLength) {
      const r = view[i++];
      const g = view[i++];
      const b = view[i++];
      const a = view[i++];
      ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;

      const at = i / 4 - 1;
      const x = col + (at % image.width);
      const y = row + Math.floor(at / image.width);
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  saveCanvasImage(canvas, filename);
}

function saveCanvasImage(canvas, filename) {
  const buffer = canvas.toBuffer('image/png');
  const name = filename.split('.')[0];

  fs.writeFileSync(`./${name}.png`, buffer);
}

unpackAssetsFromLod('./assets/H3sprite.lod');
