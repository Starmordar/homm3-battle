const { unpackDEF } = require('homm3-unpacker');
const { createCanvas } = require('canvas');

const fs = require('fs');
const path = require('path');

function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => (error ? reject(error) : resolve(data.buffer)));
  });
}

function write(path, buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, Buffer.from(buffer), (error) => (error ? reject(error) : resolve()));
  });
}

async function deleteAllFilesInDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.map((file) => fs.unlinkSync(path.join(dirPath, file)));
}

function getImageRect(data) {
  const images = Object.values(data.images);

  let top = Infinity;
  let left = Infinity;
  let bottom = 0;
  let right = 0;

  const names = Object.keys(images);
  for (const name of names) {
    const image = images[name];

    if (image.y < top) top = image.y;
    if (image.y + image.height > bottom) bottom = image.y + image.height;
    if (image.x < left) left = image.x;
    if (image.x + image.width > right) right = image.x + image.width;
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}

function drawImages(box, images) {
  if (!images.length) return;
  const len = images.length;

  const imageCanvasWidth = 220;

  const scale = 1;
  const canvas = createCanvas(imageCanvasWidth * len, 150);
  const ctx = canvas.getContext('2d');

  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    const rows = ctx.canvas.height / scale;
    const cols = ctx.canvas.width / scale / len;
    const row = Math.floor(rows / 2 - box.height / 2 + (image.y || 0) - box.y);
    const col = Math.floor(cols / 2 - box.width / 2 + (image.x || 0) - box.x) + index * 220;

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

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./image.png', buffer);
}

async function unpack_frames(path, dir = './') {
  deleteAllFilesInDir(dir);

  const file = await read(path);
  const data = unpackDEF(file, { format: 'bitmap', padding: false });

  const parameters = getImageRect(data);
  const images = Object.values(data.images);

  drawImages(parameters, images);
}

unpack_frames('./CWRAIT.def', './assets/');
